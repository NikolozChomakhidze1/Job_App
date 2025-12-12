import Database from "better-sqlite3";
import fs from "fs";

if (fs.existsSync("./data/database.sqlite")) {
  fs.unlinkSync("./data/database.sqlite");
}

const db = new Database("./data/database.sqlite");

db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user'
  )
`);

db.exec(`
  CREATE TABLE jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    description TEXT NOT NULL,
    createdBy INTEGER NOT NULL,
    FOREIGN KEY(createdBy) REFERENCES users(id) ON DELETE SET NULL
  )
`);

db.exec(`
  CREATE TABLE applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    jobId INTEGER NOT NULL,
    coverLetter TEXT,
    createdAt TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (jobId) REFERENCES jobs(id) ON DELETE CASCADE
  )
`);

export default db;
