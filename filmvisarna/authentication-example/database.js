import Database from 'better-sqlite3';

export const db = new Database('./test.db');

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL
  )
`
).run();


db.prepare(
  `
  CREATE TABLE IF NOT EXISTS credentials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users(id)
  )
`
).run();

// Notes

// - In the users table, you are more than welcome to add more columns that you think you need in your application.
// - If you use this setup and want to access the email of the user, you must do a simple join between the two tables.

