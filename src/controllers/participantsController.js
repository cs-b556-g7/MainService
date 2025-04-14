import supabase from "../config/supabaseConfig.js";

export const addParticipant = async (req, res) => {
  const { conversation_id, user_id } = req.body;
  const { data, error } = await supabase
    .from("conversation_participants")
    .insert([{ conversation_id, user_id }])
    .select()
    .single();

  if (error) return res.status(400).json({ error });
  res.status(201).json(data);
};

export const getParticipantsByConversation = async (req, res) => {
  const { conversation_id } = req.params;
  const { data, error } = await supabase
    .from("conversation_participants")
    .select("*")
    .eq("conversation_id", conversation_id);

  if (error) return res.status(400).json({ error });
  res.json(data);
};

export const updateParticipant = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const { data, error } = await supabase.from("conversation_participants").update(updates).eq("id", id).select().single();
  if (error) return res.status(400).json({ error });
  res.json(data);
};

export const deleteParticipant = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("conversation_participants").delete().eq("id", id);
  if (error) return res.status(400).json({ error });
  res.json({ message: `Participant ${id} removed` });
};
