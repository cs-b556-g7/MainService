import supabase from "../config/supabaseConfig.js";

const createVenueSport = async (req, res) => {
  const item = req.body;
  const { data, error } = await supabase.from("venue_sports").insert([item]);
  if (error) return res.status(400).json({ error });
  res.status(201).json(data);
};

const getAllVenueSports = async (req, res) => {
  const { data, error } = await supabase.from("venue_sports").select("*");
  if (error) return res.status(400).json({ error });
  res.json(data);
};

const getVenueSportById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("venue_sports").select("*").eq("id", id).single();
  if (error) return res.status(404).json({ error });
  res.json(data);
};

const updateVenueSport = async (req, res) => {
  const { id } = req.params;
  const updated = req.body;
  const { data, error } = await supabase.from("venue_sports").update(updated).eq("id", id);
  if (error) return res.status(400).json({ error });
  res.json(data);
};

const deleteVenueSport = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("venue_sports").delete().eq("id", id);
  if (error) return res.status(400).json({ error });
  res.json({ message: "Sport deleted" });
};

export default {
  createVenueSport,
  getAllVenueSports,
  getVenueSportById,
  updateVenueSport,
  deleteVenueSport,
};
