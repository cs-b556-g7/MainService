import supabase from "../config/supabaseConfig.js";

const getAllConversations = async (req, res) => {
  const { data, error } = await supabase
    .from("conversations")
    .select("id, participants:conversation_participants(user_id), messages(content, created_at)");

  if (error) return res.status(400).json({ error });

  res.json(data);
}

// http://localhost:3000/api/conversations GET


// id is serial primary key
const createConversation = async (req, res) => {
  const { userIds } = req.body;

  try {
    // Get all conversation IDs
    const { data: potentialConversations, error: potentialError } = await supabase
      .from("conversation_participants")
      .select("conversation_id")
      .in("user_id", userIds);

    if (potentialError) return res.status(400).json({ error: potentialError });

    // Group conversation IDs and check for exact matches
    const conversationIds = potentialConversations.map((item) => item.conversation_id);
    const uniqueConversationIds = [...new Set(conversationIds)];

    // for all conversation IDs, check if the participants match
    for (const conversationId of uniqueConversationIds) {
      const { data: participants, error: participantsError } = await supabase
        .from("conversation_participants")
        .select("user_id")
        .eq("conversation_id", conversationId);

      if (participantsError) return res.status(400).json({ error: participantsError });

      const participantIds = participants.map((p) => p.user_id);

      if (
        // Number of participants must match
        participantIds.length === userIds.length &&
        // All userIds must be in participantIds
        userIds.every((id) => participantIds.includes(id))
      ) {
        return res.status(200).json({
          message: "Conversation already exists",
          conversationId,
        });
      }
    }

    // Create a new conversation if no match is found
    const { data: conversation, error: conversationError } = await supabase
      .from("conversations")
      .insert({})
      .select()
      .single();

    if (conversationError) return res.status(400).json({ error: conversationError });

    const participants = userIds.map((userId) => ({
      conversation_id: conversation.id,
      user_id: userId,
    }));

    const { error: participantsError } = await supabase
      .from("conversation_participants")
      .insert(participants);

    if (participantsError) return res.status(400).json({ error: participantsError });

    res.status(201).json({ message: "Conversation created", conversation });
  } catch (err) {
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};
// http://localhost:3000/api/conversations POST
// {
//   "userIds": [1,3]
// }


const addParticipants = async (req, res) => {
  const { conversationId } = req.params;
  const { userIds } = req.body;

  try {
    // Get all existing participants in the conversation
    const { data: existingParticipants, error: fetchError } = await supabase
      .from("conversation_participants")
      .select("user_id")
      .eq("conversation_id", conversationId)
      .in("user_id", userIds);

    if (fetchError) return res.status(400).json({ error: fetchError });

    const existingUserIds = existingParticipants.map((p) => p.user_id);

    
    const newUserIds = userIds.filter((id) => !existingUserIds.includes(id));

    // check whether the participants already exist
    if (newUserIds.length === 0) {
      return res.status(200).json({ message: "Participants already exist in the conversation" });
    }

    // Add only the new participants
    const participants = newUserIds.map((userId) => ({
      conversation_id: conversationId,
      user_id: userId,
    }));

    const { error: insertError } = await supabase
      .from("conversation_participants")
      .insert(participants);

    if (insertError) return res.status(400).json({ error: insertError });

    res.status(201).json({ message: "New participants added", newParticipants: newUserIds });
  } catch (err) {
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};
// http://localhost:3000/api/conversations/2/participants POST

// {
//   "userIds": [1]
// }

// Send a message
const sendMessage = async (req, res) => {
  const { conversationId } = req.params;
  const { senderId, content } = req.body;

  const { data, error } = await supabase
    .from("messages")
    .insert({ conversation_id: conversationId, sender_id: senderId, content });

  if (error) return res.status(400).json({ error });

  res.status(201).json({ message: "Message sent", data });
};

// http://localhost:3000/api/conversations/2/messages POST

// {
//   "senderId": 1,
//   "content": "Hello, this is a test message!"
// }

// Get all conversations for a user
const getUserConversations = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch all conversation IDs and participants where the user is a participant
    const { data, error } = await supabase
      .from("conversation_participants")
      .select(`
        conversation_id,
        participants:user_id
      `)
      .eq("user_id", userId);

    if (error) return res.status(400).json({ error });

    // Fetch all participants for each conversation
    const conversationIds = data.map((item) => item.conversation_id);

    const { data: allParticipants, error: participantsError } = await supabase
      .from("conversation_participants")
      .select("conversation_id, user_id")
      .in("conversation_id", conversationIds);

    if (participantsError) return res.status(400).json({ error: participantsError });

    // Group participants by conversation_id and exclude the requesting user
    const groupedConversations = allParticipants.reduce((acc, item) => {
      if (!acc[item.conversation_id]) {
        acc[item.conversation_id] = [];
      }
      if (item.user_id !== parseInt(userId)) {
        acc[item.conversation_id].push(item.user_id);
      }
      return acc;
    }, {});

    res.json(groupedConversations);
  } catch (err) {
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};

// http://localhost:3000/api/conversations/user/2 GET

// Get messages for a conversation
const getConversationMessages = async (req, res) => {
  const { conversationId } = req.params;

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error) return res.status(400).json({ error });

  res.json(data);
};

// http://localhost:3000/api/conversations/2/messages GET

const getLastMessage = async (req, res) => {
  const { conversationId } = req.params;

  const { data, error } = await supabase
    .from('messages')
    .select('content')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) return res.status(400).json({ error });

  res.json(data);
};

//  http://localhost:3000/api/conversations/:conversationId/messages/last GET

const findConversationId = async (req, res) => {
  const { userId1, userId2 } = req.query;

  try {
    // Find all conversation IDs for userId1
    const { data: user1Conversations, error: user1Error } = await supabase
      .from('conversation_participants')
      .select('conversation_id')
      .eq('user_id', userId1);

    if (user1Error) {
      console.error('Error fetching conversations for userId1:', user1Error);
      return res.status(400).json({ error: 'Error fetching conversations for userId1' });
    }

    // Find all conversation IDs for userId2
    const { data: user2Conversations, error: user2Error } = await supabase
      .from('conversation_participants')
      .select('conversation_id')
      .eq('user_id', userId2);

    if (user2Error) {
      console.error('Error fetching conversations for userId2:', user2Error);
      return res.status(400).json({ error: 'Error fetching conversations for userId2' });
    }

    // Find the common conversation ID between the two users
    const user1ConversationIds = user1Conversations.map((c) => c.conversation_id);
    const user2ConversationIds = user2Conversations.map((c) => c.conversation_id);
    const commonConversationId = user1ConversationIds.find((id) =>
      user2ConversationIds.includes(id)
    );

    if (!commonConversationId) {
      return res.status(404).json({ error: 'No conversation found for these participants' });
    }

    res.status(200).json({ conversationId: commonConversationId });
  } catch (err) {
    console.error('Error finding conversation ID:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// http://localhost:3000/api/conversations/find?userId1=1&userId2=2 GET

// Mark messages as read
const markMessagesAsRead = async (req, res) => {
  const { conversationId } = req.params;
  const { userId } = req.body;

  const { error } = await supabase
    .from("messages")
    .update({ read: true })
    .eq("conversation_id", conversationId)
    .eq("sender_id", userId);

  if (error) return res.status(400).json({ error });

  res.json({ message: "Messages marked as read" });
};

// http://localhost:3000/api/conversations/2/messages/read PUT

export default {
  getAllConversations,
  createConversation,
  addParticipants,
  sendMessage,
  getUserConversations,
  getConversationMessages,
  getLastMessage,
  findConversationId,
  markMessagesAsRead,
};