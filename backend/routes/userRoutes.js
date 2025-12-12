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
r.get("/", auth, requireRole("admin"), getUsers);
r.get("/:id", auth, requireRole("admin"), getUserById);
r.delete("/:id", auth, requireRole("admin"), deleteUser);

export default r;
