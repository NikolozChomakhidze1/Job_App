import express from "express";
import { applyToJob, getApplications } from "../controllers/applicationController.js";
import { auth } from "../auth.js";

const r = express.Router();

r.post("/:jobId/applications", auth, applyToJob);
r.get("/applications", auth, getApplications);

export default r;
