import supabase from "../config/supabaseConfig.js";

export const sendMessage = async (req, res) => {
  const { conversation_id, sender_id, content, read = false } = req.body;
  const { data, error } = await supabase
    .from("messages")
    .insert([{ conversation_id, sender_id, content, read }])
    .select()
    .single();

  if (error) return res.status(400).json({ error });
  res.status(201).json(data);
};

export const getMessagesByConversation = async (req, res) => {
  const { conversation_id } = req.params;
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversation_id)
    .order("created_at", { ascending: true });

  if (error) return res.status(400).json({ error });
  res.json(data);
};

export const updateMessage = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const { data, error } = await supabase.from("messages").update(updates).eq("id", id).select().single();
  if (error) return res.status(400).json({ error });
  res.json(data);
};

export const deleteMessage = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("messages").delete().eq("id", id);
  if (error) return res.status(400).json({ error });
  res.json({ message: `Message ${id} deleted` });
};
