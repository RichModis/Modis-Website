/**
 * Configuration loader
 * - Loads .env via dotenv
 * - Exposes sensible defaults for port, env, app name, etc.
 * - Add DB / auth config here when integrating
 */

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const config = {
    port: Number(process.env.PORT) || 4000,
    nodeEnv: process.env.NODE_ENV || 'development',
    appName: process.env.APP_NAME || 'express-app',
    corsOrigin: process.env.CORS_ORIGIN || '*', // tighten for production
    // dbUrl: process.env.DB_URL || null, // placeholder for DB integration
    // authSecret: process.env.AUTH_SECRET || null, // placeholder for auth
};

export default config;