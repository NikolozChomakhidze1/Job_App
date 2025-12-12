import db from "../data/database.js";

export const applyToJob = (req, res) => {
  const userId = req.user.id;
  const { coverLetter } = req.body;
  const { jobId } = req.params;

  if (!jobId) return res.status(400).json({ message: "Missing jobId" });

  const job = db.prepare("SELECT id FROM jobs WHERE id = ?").get(jobId);
  if (!job) return res.status(404).json({ message: "Job not found" });

  const stmt = db.prepare("INSERT INTO applications (userId, jobId, coverLetter) VALUES (?, ?, ?)");
  const result = stmt.run(userId, jobId, coverLetter || null);

  res.status(201).json({
    id: result.lastInsertRowid,
    userId,
    jobId: Number(jobId),
    coverLetter: coverLetter || null
  });
};

export const getApplications = (req, res) => {
  const role = req.user.role;
  const userId = req.user.id;

  if (role === "admin") {
    const rows = db.prepare(`
      SELECT a.id, a.userId, u.name as userName, a.jobId, j.title as jobTitle,
             a.coverLetter, a.createdAt
      FROM applications a
      LEFT JOIN users u ON a.userId = u.id
      LEFT JOIN jobs j ON a.jobId = j.id
      ORDER BY a.createdAt DESC
    `).all();
    return res.json(rows);
  }

  if (role === "recruiter") {
    const rows = db.prepare(`
      SELECT a.id, a.userId, u.name as userName, a.jobId, j.title as jobTitle,
             a.coverLetter, a.createdAt
      FROM applications a
      LEFT JOIN users u ON a.userId = u.id
      LEFT JOIN jobs j ON a.jobId = j.id
      WHERE j.createdBy = ?
      ORDER BY a.createdAt DESC
    `).all(userId);
    return res.json(rows);
  }

  const rows = db.prepare(`
    SELECT a.id, a.userId, j.title as jobTitle, a.jobId, a.coverLetter, a.createdAt
    FROM applications a
    LEFT JOIN jobs j ON a.jobId = j.id
    WHERE a.userId = ?
    ORDER BY a.createdAt DESC
  `).all(userId);

  res.json(rows);
};
