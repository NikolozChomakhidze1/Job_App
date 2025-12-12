import express from "express";
import { auth, requireRole } from "../auth.js";
import { applyToJob, getApplications } from "../controllers/applicationController.js";

const r = express.Router();

r.post("/", auth, requireRole("user"), applyToJob);
r.get("/", auth, getApplications);

export default r;
