import db from "../data/database.js";

export const getJobs = (req, res) => {
  const rows = db.prepare("SELECT id, title, company, description, createdBy FROM jobs").all();
  res.json(rows);
};

export const getJobById = (req, res) => {
  const { id } = req.params;
  const row = db.prepare("SELECT id, title, company, description, createdBy FROM jobs WHERE id = ?").get(id);
  if (!row) return res.status(404).json({ message: "Job not found" });
  res.json(row);
};

export const createJob = (req, res) => {
  const { title, company, description } = req.body;

  if (!title || !company || !description) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const stmt = db.prepare(
    "INSERT INTO jobs (title, company, description, createdBy) VALUES (?, ?, ?, ?)"
  );

  const result = stmt.run(title, company, description, null);

  res.status(201).json({
    id: result.lastInsertRowid,
    title,
    company,
    description,
    createdBy: null,
  });
};


export const deleteJob = (req, res) => {
  const { id } = req.params;
  const job = db.prepare("SELECT * FROM jobs WHERE id = ?").get(id);
  if (!job) return res.status(404).json({ message: "Job not found" });
  const userId = req.user.id;
  const role = req.user.role;
  if (role !== "admin" && !(role === "recruiter" && job.createdBy === userId)) {
    return res.status(403).json({ message: "Forbidden" });
  }
  db.prepare("DELETE FROM jobs WHERE id = ?").run(id);
  res.json({ message: "Deleted" });
};
