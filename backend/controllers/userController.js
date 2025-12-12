import db from "../data/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET || "dev_secret";

export const register = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });
  const hashed = bcrypt.hashSync(password, 10);
  const stmt = db.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
  const result = stmt.run(name, email, hashed);
  const id = result.lastInsertRowid;
  res.status(201).json({ id, name, email, role: "user" });
};

export const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Missing fields" });
  const row = db.prepare("SELECT id, name, email, password, role FROM users WHERE email = ?").get(email);
  if (!row) return res.status(400).json({ message: "Invalid credentials" });
  const ok = bcrypt.compareSync(password, row.password);
  if (!ok) return res.status(400).json({ message: "Invalid credentials" });
  const token = jwt.sign({ id: row.id, role: row.role }, secret, { expiresIn: "7d" });
  res.json({ token, user: { id: row.id, name: row.name, email: row.email, role: row.role } });
};

export const getMe = (req, res) => {
  const row = db.prepare("SELECT id, name, email, role FROM users WHERE id = ?").get(req.user.id);
  if (!row) return res.status(404).json({ message: "Not found" });
  res.json(row);
};

export const getUsers = (req, res) => {
  const rows = db.prepare("SELECT id, name, email, role FROM users").all();
  res.json(rows);
};

export const getUserById = (req, res) => {
  const { id } = req.params;
  const row = db.prepare("SELECT id, name, email, role FROM users WHERE id = ?").get(id);
  if (!row) return res.status(404).json({ message: "User not found" });
  res.json(row);
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  const result = db.prepare("DELETE FROM users WHERE id = ?").run(id);
  if (result.changes === 0) return res.status(404).json({ message: "User not found" });
  res.json({ message: "Deleted" });
};
