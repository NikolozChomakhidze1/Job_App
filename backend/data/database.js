import Database from "better-sqlite3";

const db = new Database("database.db");


db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    company TEXT
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    jobId INTEGER,
    coverLetter TEXT,
    FOREIGN KEY(userId) REFERENCES users(id),
    FOREIGN KEY(jobId) REFERENCES jobs(id)
  );
`);

export default db;
