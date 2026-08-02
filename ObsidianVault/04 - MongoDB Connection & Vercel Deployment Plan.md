# 🌐 04 - MongoDB Connection & Vercel Deployment Plan

## 🎯 Goal
Connect MongoDB to the ERP codebase to persist all hotel operations (rooms, guests, orders, tasks, banquets, inventory, invoices) and ensure seamless operation when deployed on **Vercel**.

---

## ❓ Common Question: "Do we need to deploy the app to connect MongoDB?"

### Short Answer:
* **For the Database**: You use **MongoDB Atlas** (a managed cloud database service with a generous free tier). It lives in the cloud and gives you a connection URL (`MONGODB_URI`).
* **For testing & development**: **No, you do NOT need to deploy your app immediately.** You can connect to MongoDB Atlas directly from your local machine (`http://localhost:3000`) while developing.
* **For live production**: When you are ready to deploy to Vercel, Vercel will connect to that same MongoDB Atlas database using your environment variable.

```
[ Local Machine (localhost) ] ──┐
                                ├───> [ MongoDB Atlas Cloud Database ]
[ Vercel Live Deployment ] ────┘
```

---

## ❓ Common Question: "Do we need to deploy the server separately on Vercel?"

### Short Answer: **NO, absolutely NOT.**
Both your React Frontend and your Express/API Server are configured to deploy together inside **1 Single Vercel Project**.

Thanks to the [`vercel.json`](file:///home/keval-tank/Desktop/code/four-s_way_hotel/vercel.json) file we created:
* Vercel compiles your React frontend into static assets.
* Vercel turns [`server.ts`](file:///home/keval-tank/Desktop/code/four-s_way_hotel/server.ts) into a **Vercel Serverless Function** using `@vercel/node`.
* All `/api/*` HTTP calls from the browser are routed directly to the serverless function, while all page routes serve the React frontend.

---

## 🌐 External Deployed Backend URL (`BACKEND_URL`)
If you deploy your backend to an external service (such as Render, Railway, Heroku, or Fly.io):
* Define `BACKEND_URL="https://four-s-way-hotel-dzxu.onrender.com"` in `.env`.
* Both `server.ts` and `vite.config.ts` will proxy all `/api/*` requests directly to your deployed backend URL.
* If `BACKEND_URL` is omitted, the app defaults to local Express & MongoDB routes.

---

## 🔑 MongoDB Atlas Network Access Requirement
To ensure your local machine can connect to Atlas without getting blocked by a database firewall:
1. In MongoDB Atlas dashboard -> **Security -> Network Access**.
2. Click **Add IP Address** -> Select **Allow Access from Anywhere** (`0.0.0.0/0`).
3. This allows both your local machine (`localhost`) and Vercel serverless functions to connect smoothly!

---

## ⚡ Architectural Problem with Express on Vercel
On traditional servers (e.g. EC2, VPS), Node runs continuously with `app.listen(3000)`. 
On **Vercel**, applications are executed serverlessly:
- Vercel does not run `app.listen()`.
- Routes inside `/api` or wrapped Express applications run as **Serverless Functions** that wake up per request and shut down when idle.
- Opening new MongoDB connections on every serverless function invocation will exhaust database connection pools.

---

## 🏗️ Step-by-Step Implementation Strategy

### Step 1: Install MongoDB & Mongoose Dependencies
Add `mongoose` or `mongodb` driver to `package.json`:
```bash
npm install mongoose
npm install -D @types/mongoose
```

### Step 2: Serverless MongoDB Connection Singleton (`lib/dbConnect.ts`)
Create a connection caching utility to reuse database connections across serverless warm executions:

```typescript
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env or Vercel Environment Variables.');
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
```

---

### Step 3: Deployment Options on Vercel

#### Option A: Vercel Serverless Function Directory (`api/` folder) - RECOMMENDED
Structure API endpoints as discrete serverless handlers in an `/api` folder at root level:
- `api/rooms/index.ts` (GET all rooms, POST create room)
- `api/rooms/[id].ts` (PATCH status, DELETE room)
- `api/guests/index.ts` (GET guests, POST check-in guest)
- `api/ai/royal-concierge.ts` (Gemini Concierge handler)
- `api/ai/rate-optimizer.ts` (Gemini Yield Optimizer handler)
- `api/ai/guest-sentiment.ts` (Gemini Sentiment handler)

Vercel automatically detects files in `/api` as Serverless Functions!

#### Option B: Express App as Vercel Handler with `vercel.json`
If keeping `server.ts` as a unified Express application:
1. Export `app` without calling `app.listen()` when `process.env.VERCEL` is active.
2. Create `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.ts",
      "use": "@vercel/node"
    },
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "server.ts" },
    { "src": "/(.*)", "dest": "/$1" }
  ]
}
```

---

### Step 4: Vercel Environment Variables Configuration
In Vercel Dashboard -> **Project Settings** -> **Environment Variables**:

1. `MONGODB_URI` = `mongodb+srv://<username>:<password>@cluster0.mongodb.net/khirasara_palace_erp?retryWrites=true&w=all`
2. `GEMINI_API_KEY` = `<your-google-gemini-api-key>`

---

## 🔗 Related Notes
- [[01 - Current Project State & Architecture]]
- [[03 - Server File & AI Routes Wiring Audit]]
- [[05 - Database Schemas & API Endpoints Specification]]
