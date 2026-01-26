/**
 * Centralized error handler
 * - Hides stack traces in production
 * - Consistent JSON responses
 */
export default function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const response = {
        error: err.message || 'Internal Server Error',
    };

    if (process.env.NODE_ENV !== 'production') {
        response.stack = err.stack;
    }

    res.status(status).json(response);
}