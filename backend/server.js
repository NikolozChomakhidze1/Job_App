import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

import { users, jobs, applications } from "./data/database.js";

app.get("/api/debug", (req, res) => {
  res.json({ users, jobs, applications });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
