import { getDB } from '../config/database.js';

export const getAllPosts = async (req, res) => {
  try {
    const db = await getDB();
    const posts = await db.all(`
      SELECT p.*, u.username as author
      FROM posts p
      LEFT JOIN users u ON p.authorId = u.id
      ORDER BY p.createdAt DESC
    `);
    res.json({ data: posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const db = await getDB();
    const post = await db.get(`
      SELECT p.*, u.username as author
      FROM posts p
      LEFT JOIN users u ON p.authorId = u.id
      WHERE p.id = ?
    `, [id]);

    if (!post) {
      const err = new Error('Post not found');
      err.status = 404;
      throw err;
    }
    res.json({ data: post });
  } catch (err) {
    next(err);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body || {};
    if (!title || !content) {
      const err = new Error('title and content are required');
      err.status = 400;
      throw err;
    }

    const db = await getDB();
    const result = await db.run(
      'INSERT INTO posts (title, content, authorId) VALUES (?, ?, ?)',
      [title, content, req.user?.id || null]
    );

    const newPost = await db.get(`
      SELECT p.*, u.username as author
      FROM posts p
      LEFT JOIN users u ON p.authorId = u.id
      WHERE p.id = ?
    `, [result.lastID]);

    res.status(201).json({ data: newPost });
  } catch (err) {
    next(err);
  }
};