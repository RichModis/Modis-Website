import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Create database connection
export const initDB = async () => {
  const db = await open({
    filename: './blog.db',
    driver: sqlite3.Database,
  });

  // Create users table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create posts table (migrating from in-memory)
  await db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      authorId INTEGER,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (authorId) REFERENCES users (id)
    )
  `);

  // Insert sample post if posts table is empty
  const postCount = await db.get('SELECT COUNT(*) as count FROM posts');
  if (postCount.count === 0) {
    await db.run(
      'INSERT INTO posts (title, content) VALUES (?, ?)',
      ['Welcome', 'This is a sample post. Replace with a real database.']
    );
  }

  return db;
};

// Get database instance
let dbInstance = null;
export const getDB = async () => {
  if (!dbInstance) {
    dbInstance = await initDB();
  }
  return dbInstance;
};