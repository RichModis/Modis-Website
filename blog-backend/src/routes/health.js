/**
 * Health-check route
 * GET /api/health
 */

import express from 'express';
import config from '../config/index.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        status: 'ok',
        app: config.appName,
        env: config.nodeEnv,
        time: new Date().toISOString(),
    });
});

export default router;