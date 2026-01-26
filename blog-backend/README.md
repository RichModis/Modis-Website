Minimal Express (ESM) backend scaffold

Quick start:
1. Copy .env.example to .env and edit values.
     cp .env.example .env
2. Install dependencies:
     npm install
3. Start in development (requires Node 18+ for --watch):
     npm run dev
     or production:
     npm start

What this scaffold provides:
- ES module-based Express server
- dotenv configuration with sensible defaults
- JSON parsing, CORS, simple request logging
- Centralized error handling + 404 handler
- Health-check route: GET /api/health
- Blog routes (in-memory) as example: GET /api/posts, POST /api/posts
- Clear folders for routes, controllers, middleware, and config

Notes:
- This intentionally avoids a DB and auth for now; places to integrate them are in src/config and src/controllers.
- Keep code minimal and expand as the project grows.