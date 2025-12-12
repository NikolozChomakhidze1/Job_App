import express from "express";
import {
  getApplications,
  getApplicationsByJob,
  applyToJob,
} from "../controllers/applicationController.js";

const router = express.Router();

router.get("/", getApplications);             
router.get("/job/:jobId", getApplicationsByJob);  
router.post("/", applyToJob);                

export default router;
