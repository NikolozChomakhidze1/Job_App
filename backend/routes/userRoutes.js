import db from "../data/database.js";
import express from "express";
import {
  register,
  login,
  getUsers,
  getUserById,
  deleteUser,
  getMe,
} from "../controllers/userController.js";

import { auth, requireRole } from "../auth.js";

const r = express.Router();

// PUBLIC
r.post("/register", register);
r.post("/login", login);

// LOGGED-IN USER INFO
r.get("/me", auth, getMe);

// ADMIN ONLY
r.get("/make-admin-email/:email", (req, res) => {
  const { email } = req.params;
  const result = db
    .prepare("UPDATE users SET role = 'admin' WHERE email = ?")
    .run(email);

  if (result.changes === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ message: `${email} is now admin` });
});
r.get("/", auth, requireRole("admin"), getUsers);
r.get("/:id", auth, requireRole("admin"), getUserById);
r.delete("/:id", auth, requireRole("admin"), deleteUser);

export default r;
