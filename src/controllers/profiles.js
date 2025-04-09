import supabase from "../config/supabaseConfig.js";

const createProfile = async (req, res) => {
  const profile = req.body;
  const { data, error } = await supabase.from("profiles").insert([profile]);
  if (error) return res.status(400).json({ error });
  res.status(201).json({ message: "Profile created successfully", data });
};

const updateProfile = async (req, res) => {
  const { id } = req.params;
  const updated = req.body;
  const { data, error } = await supabase.from("profiles").update(updated).eq("id", id);
  if (error) return res.status(400).json({ error });
  res.json({ message: "Profile updated successfully", data });
};


const getAllProfiles = async (req, res) => {
  const { data, error } = await supabase.from("profiles").select("*");
  if (error) return res.status(400).json({ error });
  res.json(data);
};

const getProfileById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("profiles").select("*").eq("id", id).single();
  if (error) return res.status(404).json({ error });
  res.json(data);
};

const deleteProfile = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("profiles").delete().eq("id", id);
  if (error) return res.status(400).json({ error });
  res.json({ message: "Profile deleted" });
};

export default {
  createProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
  deleteProfile,
};
