/**
 * Minimal logger abstraction
 * Replace with pino/winston in production.
 */
const isDev = process.env.NODE_ENV !== 'production';

function info(...args) {
    console.info('[info]', ...args);
}

function debug(...args) {
    if (isDev) {
        console.debug('[debug]', ...args);
    }
}

function error(...args) {
    console.error('[error]', ...args);
}

export default { info, debug, error };