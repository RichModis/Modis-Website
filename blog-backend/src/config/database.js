import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

// Initialize database
let db = null;

export const initDB = async () => {
  const adapter = new JSONFile('./blog-db.json');
  db = new Low(adapter, { users: [], posts: [], nextUserId: 1, nextPostId: 1 });
  
  await db.read();
  
  // Initialize default data structure if not exists
  db.data = db.data || { users: [], posts: [], nextUserId: 1, nextPostId: 1 };
  
  // Add sample post if empty
  if (!db.data.posts || db.data.posts.length === 0) {
    db.data.posts = db.data.posts || [];
    db.data.posts.push({
      id: 1,
      title: 'Welcome',
      content: 'This is a sample post. Replace with a real database.',
      authorId: null,
      createdAt: new Date().toISOString()
    });
    db.data.nextPostId = 2;
  }
  
  await db.write();
  return db;
};

// Get database instance
export const getDB = async () => {
  if (!db) {
    await initDB();
  }
  return db;
};