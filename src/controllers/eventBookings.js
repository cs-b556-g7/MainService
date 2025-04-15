import supabase from "../config/supabaseConfig.js";


export const createEventBooking = async (req, res) => {
  const booking = req.body;
  const { data, error } = await supabase.from("event_bookings").insert([booking]);
  if (error) return res.status(400).json({ error });
  res.status(201).json({ message: "Event booking created", data });
};

export const updateEventBooking = async (req, res) => {
  const { id } = req.params;
  const updated = req.body;
  const { data, error } = await supabase.from("event_bookings").update(updated).eq("event_id", id);
  if (error) return res.status(400).json({ error });
  res.json({ message: "Event booking updated", data });
};

export const getAllEventBookings = async (req, res) => {
  const { data, error } = await supabase.from("event_bookings").select("*");
  if (error) return res.status(400).json({ error });
  res.json(data);
};

export const getEventBookingById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("event_bookings").select("*").eq("id", id).single();
  if (error) return res.status(404).json({ error });
  res.json(data);
};

export const deleteEventBooking = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("event_bookings").delete().eq("id", id);
  if (error) return res.status(400).json({ error });
  res.json({ message: "Event booking deleted" });
};
