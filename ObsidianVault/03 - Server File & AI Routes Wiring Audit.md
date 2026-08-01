# 🤖 03 - Server File & AI Routes Wiring Audit

## ❓ Question: Is the server file with AI reply generation routes currently wired with the frontend?

### ❌ Answer: NO, IT IS NOT EFFECTIVELY WIRED TO THE ACTIVE UI.

While the backend endpoints and frontend component code exist, **they are disconnected in two critical ways**:

---

## 🔎 Detailed Technical Audit

### 1. Backend Server (`server.ts`)
The server file defines an Express server with 4 HTTP endpoints:

1. `GET /api/health` -> System health check.
2. `POST /api/ai/royal-concierge` -> Uses `@google/genai` (Gemini 3.6 Flash) to generate formal 24-hour Royal Guest Itinerary & Welcome Protocol.
3. `POST /api/ai/rate-optimizer` -> Uses Gemini 3.6 Flash to optimize suite rates and yield strategy based on occupancy and local events.
4. `POST /api/ai/guest-sentiment` -> Uses Gemini 3.6 Flash to analyze guest feedback for positive highlights, defects, and staff action items.

### 2. Frontend Component (`src/components/AIAssistantModal.tsx`)
`AIAssistantModal.tsx` contains complete UI forms and explicit `fetch('/api/ai/...')` calls to trigger each of the 3 backend routes above.

### 3. Why It Is Disconnected (The 2 Breakdown Points):

#### Breakdown Point A: `AIAssistantModal` is NOT mounted in the UI
- Searching the codebase reveals that `AIAssistantModal` is **never imported or rendered** in `App.tsx`, `Navbar.tsx`, or `ManagementModal.tsx`.
- There is no button, menu item, or trigger anywhere in the user interface to open this modal.

#### Breakdown Point B: Vite Dev Server vs. Express Server
- When running `npm run dev` (standard development command), Vite runs directly on port 5173.
- `vite.config.ts` does **NOT** contain a proxy configuration for `/api`. Therefore, any request to `/api/ai/*` made by the frontend during `npm run dev` returns a 404 from Vite instead of reaching Express.
- Express is only started when explicitly running `npm run server` (which executes `tsx server.ts`).

---

## 🛠️ Required Fixes to Wire AI Routes

1. **Mount the AI Modal in the Frontend**:
   - Import `AIAssistantModal` into `App.tsx` or `Navbar.tsx` / `ManagementModal.tsx`.
   - Add a "Royal AI Concierge / Yield Optimizer" button with a sparkle/crown icon in the navigation bar.

2. **Configure Vite Proxy in `vite.config.ts`**:
   ```typescript
   // Add proxy configuration to vite.config.ts so dev mode forwards /api requests to Express:
   server: {
     proxy: {
       '/api': {
         target: 'http://localhost:3000',
         changeOrigin: true,
       }
     }
   }
   ```

3. **Provide `GEMINI_API_KEY`**:
   - Ensure `GEMINI_API_KEY` is present in `.env` locally and in Vercel Environment Variables.

---

## 🔗 Related Notes
- [[01 - Current Project State & Architecture]]
- [[04 - MongoDB Connection & Vercel Deployment Plan]]
