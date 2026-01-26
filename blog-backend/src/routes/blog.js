/**
 * Blog routes
 * - GET /api/posts    -> list posts (in-memory for now)
 * - GET /api/posts/:id -> get single post
 * - POST /api/posts   -> create a new post (no DB yet)
 *
 * Route/controller separation is demonstrated below; controllers can later talk to a DB service.
 */

import express from 'express';
import * as blogController from '../controllers/blogController.js';

const router = express.Router();

router.get('/', blogController.getAllPosts);
router.get('/:id', blogController.getPostById);
router.post('/', blogController.createPost);

export default router;