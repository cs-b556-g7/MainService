import supabase from "../config/supabaseConfig.js";

const createUser = async (req, res) => {
  const { username, email, password, role_id } = req.body;
  const { data, error } = await supabase
    .from("users")
    .insert([{ username, email, password, role_id }]);
  if (error) return res.status(400).json({ error });
  res.status(201).json({ message: "User created successfully", data });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, role_id } = req.body;
  const { data, error } = await supabase
    .from("users")
    .update({ username, email, password, role_id })
    .eq("id", id);
  if (error) return res.status(400).json({ error });
  res.json({ message: "User updated successfully", data });
};


const getAllUsers = async (req, res) => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) return res.status(400).json({ error });
  res.json(data);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("users").select("*").eq("id", id).single();
  if (error) return res.status(404).json({ error });
  res.json(data);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("users").delete().eq("id", id);
  if (error) return res.status(400).json({ error });
  res.json({ message: "User deleted" });
};

export default {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
