import db from "../data/database.js";

export const getJobs = (req, res) => {
  const jobs = db.prepare("SELECT * FROM jobs").all();
  res.json(jobs);
};

export const getJobById = (req, res) => {
  const { id } = req.params;

  const job = db.prepare("SELECT * FROM jobs WHERE id = ?").get(id);

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  res.json(job);
};

export const createJob = (req, res) => {
  const { title, description, company } = req.body;

  if (!title || !description || !company) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const stmt = db.prepare(`
    INSERT INTO jobs (title, description, company)
    VALUES (?, ?, ?)
  `);

  const result = stmt.run(title, description, company);

  res.status(201).json({
    id: result.lastInsertRowid,
    title,
    description,
    company,
  });
};

export const deleteJob = (req, res) => {
  const { id } = req.params;

  const stmt = db.prepare("DELETE FROM jobs WHERE id = ?");
  const result = stmt.run(id);

  if (result.changes === 0) {
    return res.status(404).json({ message: "Job not found" });
  }

  res.json({ message: "Job deleted" });
};
