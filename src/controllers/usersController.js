const { ObjectId } = require("mongodb");
const { client } = require("../config/db");

const userCollection = client.db("snapdeal").collection("users");

const getAllUsers = async (req, res) => {
  const result = await userCollection.find().toArray();
  return res.status(200).json(result);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const query = { _id: new ObjectId(id) };

  const user = await userCollection.findOne(query);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.status(200).json(user);
};

const createUser = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await userCollection.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = { email, password: passwordHash, role: "user" };

  await userCollection.insertOne(user);
  return res.status(201).json({ message: "User created successfully" });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, oldPassword, newPassword } = req.body;
  const query = { _id: new ObjectId(id) };

  const user = await userCollection.findOne(query);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const passwordMatch = await bcrypt.compare(oldPassword, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: "Invalid password" });
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  const update = { $set: { email: email, password: passwordHash } };
  await userCollection.updateOne(query, update);
  return res.status(200).json({ message: "User updated successfully" });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  if (role !== "admin") {
    return res
      .status(403)
      .json({ error: "Forbidden: Only admin can delete users" });
  }
  const query = { _id: new ObjectId(id) };
  await userCollection.deleteOne(query);
  return res.status(200).json({ message: "User deleted successfully" });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
