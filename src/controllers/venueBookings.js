import supabase from "../config/supabaseConfig.js";


export const createVenueBooking = async (req, res) => {
  const booking = req.body;
  const { data, error } = await supabase.from("venue_bookings").insert([booking]);
  if (error) return res.status(400).json({ error });
  res.status(201).json({ message: "Venue booking created", data });
};

export const updateVenueBooking = async (req, res) => {
  const { id } = req.params;
  const updated = req.body;
  const { data, error } = await supabase.from("venue_bookings").update(updated).eq("id", id);
  if (error) return res.status(400).json({ error });
  res.json({ message: "Venue booking updated", data });
};

export const getAllVenueBookings = async (req, res) => {
  const { data, error } = await supabase.from("venue_bookings").select("*");
  if (error) return res.status(400).json({ error });
  res.json(data);
};

export const getVenueBookingById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("venue_bookings").select("*").eq("id", id).single();
  if (error) return res.status(404).json({ error });
  res.json(data);
};

export const deleteVenueBooking = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("venue_bookings").delete().eq("id", id);
  if (error) return res.status(400).json({ error });
  res.json({ message: "Venue booking deleted" });
};
