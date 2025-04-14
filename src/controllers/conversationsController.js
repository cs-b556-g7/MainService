import supabase from "../config/supabaseConfig.js";

export const createConversation = async (req, res) => {
  const { is_group, event_id, venue_id } = req.body;
  const { data, error } = await supabase
    .from("conversations")
    .insert([{ is_group, event_id, venue_id }])
    .select()
    .single();

  if (error) return res.status(400).json({ error });
  res.status(201).json(data);
};

export const getAllConversations = async (req, res) => {
  const { data, error } = await supabase.from("conversations").select("*");
  if (error) return res.status(400).json({ error });
  res.json(data);
};

export const getConversationById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("conversations").select("*").eq("id", id).single();
  if (error) return res.status(404).json({ error });
  res.json(data);
};

export const updateConversation = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const { data, error } = await supabase.from("conversations").update(updates).eq("id", id).select().single();
  if (error) return res.status(400).json({ error });
  res.json(data);
};

export const deleteConversation = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("conversations").delete().eq("id", id);
  if (error) return res.status(400).json({ error });
  res.json({ message: `Conversation ${id} deleted` });
};
