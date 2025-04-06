import supabase from "../config/supabaseConfig.js";

const createEvent = async (req, res) => {
  const event = req.body;
  const { data, error } = await supabase.from("events").insert([event]);
  if (error) return res.status(400).json({ error });
  res.status(201).json(data);
};

const getAllEvents = async (req, res) => {
  const { data, error } = await supabase.from("events").select("*");
  if (error) return res.status(400).json({ error });
  res.json(data);
};

const getEventById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("events").select("*").eq("id", id).single();
  if (error) return res.status(404).json({ error });
  res.json(data);
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const updated = req.body;
  const { data, error } = await supabase.from("events").update(updated).eq("id", id);
  if (error) return res.status(400).json({ error });
  res.json(data);
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) return res.status(400).json({ error });
  res.json({ message: "Event deleted" });
};

export default {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
