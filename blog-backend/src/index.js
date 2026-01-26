/**
 * Server entrypoint
 * - Loads configuration
 * - Creates app and starts HTTP server
 */

import app from './app.js';
import config from './config/index.js';
import logger from './utils/logger.js';

const PORT = config.port;

const server = app.listen(PORT, () => {
    logger.info(`${config.appName} listening on port ${PORT} (env: ${config.nodeEnv})`);
});

process.on('SIGTERM', () => {
    logger.info('SIGTERM received, shutting down gracefully');
    server.close(() => {
        logger.info('Server closed');
        process.exit(0);
    });
});