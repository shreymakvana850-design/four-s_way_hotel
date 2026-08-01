# 🏢 01 - Current Project State & Architecture

## 📋 Overview
The project is a high-end web application and Enterprise Resource Planning (ERP) suite for **Heritage Khirasara Palace Hotel** located in Rajkot, Gujarat.

It combines a **guest-facing booking/marketing website** with a **back-office hotel management portal**.

---

## 🛠️ Core Technology Stack

| Layer | Technology Used | Version / Details |
| :--- | :--- | :--- |
| **Frontend Framework** | React + TypeScript | React `^19.0.1`, TS `~5.8.2` |
| **Build System** | Vite | Vite `^6.2.3` |
| **Styling** | TailwindCSS | `@tailwindcss/vite` `^4.1.14` |
| **Icons & Animations** | Lucide React, Motion | `lucide-react`, `motion` |
| **Backend Server** | Node.js + Express | `express` `^4.21.2`, `tsx` `^4.21.0` |
| **AI Integration** | Google GenAI SDK | `@google/genai` `^2.4.0` (Gemini 3.6 Flash) |
| **Deployment Target** | Vercel | Production web hosting |

---

## 📁 Repository Structure

```
four-s_way_hotel/
├── package.json          # Dependencies & npm scripts (dev, server, build, start)
├── server.ts             # Express server with Vite middleware & Gemini AI endpoints
├── vite.config.ts        # Vite configuration (React + Tailwind plugins)
├── index.html            # Application entry HTML point
├── src/
│   ├── main.tsx          # React root mount
│   ├── App.tsx           # Main application shell, state, navigation, modal routing
│   ├── types.ts          # TypeScript interfaces for ERP & Web data models
│   ├── components/       # 27 UI components & ERP views
│   └── data/
│       ├── websiteData.ts # Initial static room & customer data for web UI
│       └── mockData.ts    # Extended mock data for full ERP modules
└── ObsidianVault/        # Project documentation & analysis vault
```

---

## 🔑 Key Scripts in `package.json`

- `npm run dev`: Launches Vite dev server on local port (default 5173). **Note:** Does NOT execute `server.ts`.
- `npm run server`: Runs `tsx server.ts`. Express listens on port 3000 and mounts Vite as middleware.
- `npm run build`: Builds client static files with Vite and bundles `server.ts` using `esbuild` into `dist/server.cjs`.
- `npm run start`: Runs `node dist/server.cjs` for production Node execution.

---

## 🔗 Related Notes
- [[00 - Project Index & Sitemap]]
- [[02 - ERP Modules & Mock Data Audit]]
- [[03 - Server File & AI Routes Wiring Audit]]
