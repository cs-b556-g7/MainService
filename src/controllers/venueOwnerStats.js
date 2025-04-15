import supabase from "../config/supabaseConfig.js";

export const createOwnerStats = async (req, res) => {
  const stats = req.body;
  const { data, error } = await supabase.from("venue_owner_stats").insert([stats]);
  if (error) return res.status(400).json({ error });
  res.status(201).json({ message: "Owner stats created", data });
};

export const updateOwnerStats = async (req, res) => {
  const { id } = req.params;
  const updated = req.body;
  const { data, error } = await supabase.from("venue_owner_stats").update(updated).eq("user_id", id);
  if (error) return res.status(400).json({ error });
  res.json({ message: "Owner stats updated", data });
};

export const getAllOwnerStats = async (req, res) => {
  const { data, error } = await supabase.from("venue_owner_stats").select("*");
  if (error) return res.status(400).json({ error });
  res.json(data);
};

export const getOwnerStatsById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("venue_owner_stats").select("*").eq("user_id", id).single();
  if (error) return res.status(404).json({ error });
  res.json(data);
};

export const deleteOwnerStats = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("venue_owner_stats").delete().eq("id", id);
  if (error) return res.status(400).json({ error });
  res.json({ message: "Owner stats deleted" });
};
