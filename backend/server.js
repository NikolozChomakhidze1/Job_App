import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

// AUTH ROUTES
app.use("/api/auth", userRoutes);

// JOB ROUTES
app.use("/api/jobs", jobRoutes);

// APPLICATION ROUTES
app.use("/api/applications", applicationRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
