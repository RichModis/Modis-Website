/**
 * Express application setup
 * - Middleware (JSON, CORS, logging)
 * - Route mounting
 * - 404 + error handling
 */

import express from 'express';
import cors from 'cors';
import config from './config/index.js';
import logger from './utils/logger.js';
import { initDB } from './config/database.js';
import healthRouter from './routes/health.js';
import blogRouter from './routes/blog.js';
import authRouter from './routes/auth.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// Initialize database
initDB().then(() => {
    logger.info('Database initialized successfully');
}).catch((error) => {
    logger.error('Failed to initialize database:', error);
    process.exit(1);
});

// Basic security / CORS
app.use(cors({
    origin: config.corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

// Parse JSON bodies
app.use(express.json());

// Simple request logger (expandable)
app.use((req, res, next) => {
    logger.debug(`${req.method} ${req.originalUrl}`);
    next();
});

// API routes
app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', blogRouter);

// 404 for unknown API endpoints
app.use(notFound);

// Centralized error handler
app.use(errorHandler);

export default app;