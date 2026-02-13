# Blog Application Setup Guide

## For Collaborators

This guide will help you set up and run the blog application on your machine.

## Prerequisites

- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

That's it! No build tools or compilers needed.

## Installation Steps

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd javascript
```

### 2. Install Backend Dependencies

```bash
cd blog-backend
npm install
```

**Important:** The installation should complete in under 1 minute. If it takes longer or appears stuck, press `Ctrl+C` and try again.

### 3. Install Frontend Dependencies

```bash
cd ../blog-frontend
npm install
```

## Running the Application

You need to run **both** the backend and frontend servers:

### Terminal 1 - Backend Server

```bash
cd blog-backend
npm run dev
```

You should see:
```
[info] blog-backend listening on port 4000
[info] Database initialized successfully
```

### Terminal 2 - Frontend Server

```bash
cd blog-frontend
npm run dev
```

You should see:
```
▲ Next.js 16.1.3 (Turbopack)
- Local: http://localhost:3000
```

### 3. Open the Application

Open your browser and go to: **http://localhost:3000**

## Troubleshooting

### Issue: Dependencies fail to install with errors about "node-gyp" or "Visual Studio"

**Solution:** This shouldn't happen anymore! We removed the problematic SQLite dependency that required compilation. If you still see this:
1. Make sure you're on the latest version from Git
2. Delete `node_modules` and `package-lock.json`
3. Run `npm install` again

### Issue: "Failed to fetch" error in browser

**Cause:** The backend server isn't running.

**Solution:** Make sure the backend is running on port 4000. Check Terminal 1.

### Issue: Port already in use

**Solution:** 
- For backend (port 4000): Stop any other processes using that port
- For frontend (port 3000): Stop any other processes using that port

On Windows PowerShell:
```powershell
# Check what's using port 4000
Get-NetTCPConnection -LocalPort 4000

# Stop the process
Stop-Process -Id <PID>
```

## Database

The application uses a **JSON file database** (`blog-db.json`) which is created automatically. This means:
- ✅ No compilation required
- ✅ Works on all platforms (Windows, Mac, Linux)
- ✅ Easy to inspect and backup
- ✅ Perfect for development and small projects

## What Changed?

Previously, the app used SQLite which required:
- ❌ Python
- ❌ Visual Studio Build Tools
- ❌ Windows SDK
- ❌ Long compilation times

Now it uses **lowdb** (JSON storage):
- ✅ Pure JavaScript (no compilation)
- ✅ Installs in seconds
- ✅ Works on any machine with Node.js

## Questions?

If you encounter any issues not covered here, please create an issue in the repository.
