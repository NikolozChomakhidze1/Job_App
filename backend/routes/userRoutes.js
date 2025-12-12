import express from "express";
import db from "../data/database.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { name, email } = req.body;

  const stmt = db.prepare(
    "INSERT INTO users (name, email) VALUES (?, ?)"
  );

  const result = stmt.run(name, email);

  res.json({
    id: result.lastInsertRowid,
    name,
    email,
  });
});

export default router;
