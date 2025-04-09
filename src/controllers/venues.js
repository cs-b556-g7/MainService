import supabase from "../config/supabaseConfig.js";

const createVenue = async (req, res) => {
  const venue = req.body;
  const { data, error } = await supabase.from("venues").insert([venue]);
  if (error) return res.status(400).json({ error });
  res.status(201).json({ message: "Venue created successfully", data });
};

const updateVenue = async (req, res) => {
  const { id } = req.params;
  const updated = req.body;
  const { data, error } = await supabase.from("venues").update(updated).eq("id", id);
  if (error) return res.status(400).json({ error });
  res.json({ message: "Venue updated successfully", data });
};

const getAllVenues = async (req, res) => {
  const { data, error } = await supabase.from("venues").select("*");
  if (error) return res.status(400).json({ error });
  res.json(data);
};

const getVenueById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("venues").select("*").eq("id", id).single();
  if (error) return res.status(404).json({ error });
  res.json(data);
};

const deleteVenue = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("venues").delete().eq("id", id);
  if (error) return res.status(400).json({ error });
  res.json({ message: "Venue deleted" });
};

export default {
  createVenue,
  getAllVenues,
  getVenueById,
  updateVenue,
  deleteVenue,
};
