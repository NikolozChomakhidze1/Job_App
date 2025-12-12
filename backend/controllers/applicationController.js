import db from "../data/database.js";

export const getApplications = (req, res) => {
  const apps = db.prepare(`
    SELECT applications.id, users.name, users.email, jobs.title, jobs.company, applications.coverLetter
    FROM applications
    LEFT JOIN users ON applications.userId = users.id
    LEFT JOIN jobs ON applications.jobId = jobs.id
  `).all();

  res.json(apps);
};

export const getApplicationsByJob = (req, res) => {
  const { jobId } = req.params;

  const apps = db.prepare(`
    SELECT applications.id, users.name, users.email, applications.coverLetter
    FROM applications
    LEFT JOIN users ON applications.userId = users.id
    WHERE applications.jobId = ?
  `).all(jobId);

  res.json(apps);
};

export const applyToJob = (req, res) => {
  const { userId, jobId, coverLetter } = req.body;

  if (!userId || !jobId || !coverLetter) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const stmt = db.prepare(`
    INSERT INTO applications (userId, jobId, coverLetter)
    VALUES (?, ?, ?)
  `);

  const result = stmt.run(userId, jobId, coverLetter);

  res.status(201).json({
    id: result.lastInsertRowid,
    userId,
    jobId,
    coverLetter,
  });
};
