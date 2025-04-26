import supabase from "../config/supabaseConfig.js";

// Create a new sport for a venue
export const createVenueSport = async (req, res) => {
  const { venue_id } = req.params;
  const item = { ...req.body, venue_id: parseInt(venue_id) };
  const { data, error } = await supabase.from("venue_sports").insert([item]);

  if (error) return res.status(400).json({ error });
  res.status(201).json({ message: "Sport added to venue successfully", data });
};

// Update a specific sport for a venue
export const updateVenueSport = async (req, res) => {
  const { venue_id, id } = req.params;
  const updated = { ...req.body, venue_id: parseInt(venue_id) };
  const { data, error } = await supabase
    .from("venue_sports")
    .update(updated)
    .eq("id", id)
    .eq("venue_id", venue_id);

  if (error) return res.status(400).json({ error });
  res.json({ message: "Venue sport updated successfully", data });
};

// Get all sports for a venue
export const getVenueSportsByVenueId = async (req, res) => {
  const { venue_id } = req.params;
  const { data, error } = await supabase
    .from("venue_sports")
    .select("*")
    .eq("venue_id", venue_id);

  if (error) return res.status(400).json({ error });
  res.json(data);
};

// Delete all sports for a venue
export const deleteVenueSportsByVenueId = async (req, res) => {
  const { venue_id } = req.params;
  const { error } = await supabase
    .from("venue_sports")
    .delete()
    .eq("venue_id", venue_id);

  if (error) return res.status(400).json({ error });
  res.json({ message: `All sports deleted for venue ${venue_id}` });
};
