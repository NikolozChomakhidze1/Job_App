import express from "express";
import {
  register,
  login,
  getUsers,
  getUserById,
  deleteUser,
} from "../controllers/userController.js";
import { auth, requireRole } from "../auth.js";

const r = express.Router();

r.post("/register", register);
r.post("/login", login);
r.get("/", auth, requireRole("admin"), getUsers);
r.get("/:id", auth, requireRole("admin"), getUserById);
r.delete("/:id", auth, requireRole("admin"), deleteUser);

export default r;
