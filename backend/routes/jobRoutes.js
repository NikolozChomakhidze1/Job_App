import express from "express";
import {
  getJobs,
  getJobById,
  createJob,
  deleteJob,
} from "../controllers/jobController.js";

const r = express.Router();

// PUBLIC — ANYONE CAN DO EVERYTHING
r.get("/", getJobs);
r.get("/:id", getJobById);
r.post("/", createJob);
r.delete("/:id", deleteJob);

export default r;
