import express from "express";
import {
  getJobs,
  getJobById,
  createJob,
  deleteJob,
} from "../controllers/jobController.js";
import { auth, requireRole } from "../auth.js";

const r = express.Router();

r.get("/", getJobs);
r.get("/:id", getJobById);
r.post("/", auth, requireRole("admin", "recruiter"), createJob);
r.delete("/:id", auth, deleteJob);

export default r;
