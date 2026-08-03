import express from "express";
import cors from "cors";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { dbConnect } from "./src/lib/dbConnect";
import { seedDatabaseIfEmpty } from "./src/lib/seedDb";

import { RoomModel } from "./src/models/Room";
import { GuestModel } from "./src/models/Guest";
import { HousekeepingTaskModel } from "./src/models/HousekeepingTask";
import { DiningOrderModel } from "./src/models/DiningOrder";
import { BanquetBookingModel } from "./src/models/BanquetBooking";
import { StaffMemberModel } from "./src/models/StaffMember";
import { InventoryItemModel } from "./src/models/InventoryItem";
import { InvoiceModel } from "./src/models/Invoice";

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const NODE_ENV = process.env.NODE_ENV || "development";

  // Validate & Parse Allowed Origins
  const envOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim()).filter(Boolean)
    : [];

  const DEFAULT_ORIGINS = [
    "https://four-s-way-hotel.vercel.app",
    "https://four-s-way-hotel-git-main-shreymakvana850-9129s-projects.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:4173",
  ];

  const allowedOrigins = Array.from(new Set([...envOrigins, ...DEFAULT_ORIGINS]));

  // Startup Environment Warnings
  if (!process.env.MONGODB_URI) {
    console.warn("⚠️ Notice: MONGODB_URI environment variable is not defined.");
  }
  if (!process.env.GEMINI_API_KEY) {
    console.warn("⚠️ Notice: GEMINI_API_KEY environment variable is not defined.");
  }

  // Configure CORS Middleware BEFORE any routes
  const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, Postman, health checks)
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app") ||
        NODE_ENV !== "production"
      ) {
        return callback(null, true);
      }
      callback(new Error(`CORS policy blocked request from origin: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
    optionsSuccessStatus: 200,
  };

  app.use(cors(corsOptions));
  app.options("*", cors(corsOptions));
  app.use(express.json());

  // External Backend Proxy Configuration (if act as gateway)
  const BACKEND_URL = process.env.VITE_BACKEND_URL?.replace(/\/$/, "");

  if (BACKEND_URL && BACKEND_URL !== `http://localhost:${PORT}`) {
    console.log(`🌐 External Backend Proxy active -> Forwarding /api to: ${BACKEND_URL}`);
    app.use("/api", async (req, res, next) => {
      try {
        const targetUrl = `${BACKEND_URL}${req.originalUrl}`;
        const fetchOptions: RequestInit = {
          method: req.method,
          headers: {
            "Content-Type": req.headers["content-type"] || "application/json",
            ...(req.headers.authorization ? { Authorization: req.headers.authorization as string } : {}),
          },
          body: ["POST", "PUT", "PATCH"].includes(req.method) ? JSON.stringify(req.body) : undefined,
        };

        const response = await fetch(targetUrl, fetchOptions);
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          return res.status(response.status).json(data);
        } else {
          const text = await response.text();
          return res.status(response.status).send(text);
        }
      } catch (err: any) {
        console.error(`❌ Proxy error forwarding ${req.originalUrl} to ${BACKEND_URL}:`, err.message);
        next();
      }
    });
  }

  // Connect to MongoDB Database & Auto-Seed initial data
  let isDbConnected = false;
  try {
    await dbConnect();
    await seedDatabaseIfEmpty();
    isDbConnected = true;
  } catch (_err) {
    console.warn("⚠️ Continuing server startup. Database connection will be retried on API calls.");
  }

  // Helper for DB Connection Assurance
  const ensureDb = async () => {
    try {
      await dbConnect();
      isDbConnected = true;
    } catch (_e) {
      // Ignored
    }
  };

  // Initialize Gemini AI Client
  const getAiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    return new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  };

  // ==========================================
  // API HEALTH & DB STATUS ENDPOINT
  // ==========================================
  app.get("/api/health", async (req, res) => {
    let dbStatus = "disconnected";
    try {
      await dbConnect();
      dbStatus = "connected";
      isDbConnected = true;
    } catch (err: any) {
      dbStatus = `disconnected (${err.message})`;
      isDbConnected = false;
    }
    res.json({
      status: "ok",
      app: "Four's Way Hotel ERP",
      database: dbStatus,
      environment: NODE_ENV,
      cors: true,
      timestamp: new Date().toISOString()
    });
  });

  // ==========================================
  // ROOM MANAGEMENT ENDPOINTS
  // ==========================================
  app.get("/api/rooms", async (req, res) => {
    try {
      await ensureDb();
      const rooms = await (RoomModel as any).find({}).sort({ number: 1 });
      res.json(rooms);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/rooms", async (req, res) => {
    try {
      await ensureDb();
      const newRoom = new RoomModel(req.body);
      await newRoom.save();
      res.status(201).json(newRoom);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.patch("/api/rooms/:id/status", async (req, res) => {
    try {
      await ensureDb();
      const { status } = req.body;
      const room = await (RoomModel as any).findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );
      if (!room) return res.status(404).json({ error: "Room not found" });
      res.json(room);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  // ==========================================
  // GUEST & RESERVATIONS ENDPOINTS
  // ==========================================
  app.get("/api/guests", async (req, res) => {
    try {
      await ensureDb();
      const guests = await (GuestModel as any).find({}).sort({ createdAt: -1 });
      res.json(guests);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/guests", async (req, res) => {
    try {
      await ensureDb();
      const newGuest = new GuestModel(req.body);
      await newGuest.save();

      // If check-in guest, update room status to Occupied
      if (req.body.roomNumber && req.body.status === 'CheckedIn') {
        await (RoomModel as any).findOneAndUpdate(
          { number: req.body.roomNumber },
          { status: 'Occupied', currentGuestName: req.body.name, checkInDate: req.body.checkIn, checkOutDate: req.body.checkOut }
        );
      }

      res.status(201).json(newGuest);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.patch("/api/guests/:id", async (req, res) => {
    try {
      await ensureDb();
      const updatedGuest = await (GuestModel as any).findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedGuest) return res.status(404).json({ error: "Guest record not found" });
      res.json(updatedGuest);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  // ==========================================
  // HOUSEKEEPING & BUTLER TASKS ENDPOINTS
  // ==========================================
  app.get("/api/tasks", async (req, res) => {
    try {
      await ensureDb();
      const tasks = await (HousekeepingTaskModel as any).find({}).sort({ createdAt: -1 });
      res.json(tasks);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/tasks", async (req, res) => {
    try {
      await ensureDb();
      const newTask = new HousekeepingTaskModel(req.body);
      await newTask.save();
      res.status(201).json(newTask);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.patch("/api/tasks/:id/status", async (req, res) => {
    try {
      await ensureDb();
      const { status } = req.body;
      const task = await (HousekeepingTaskModel as any).findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );
      if (!task) return res.status(404).json({ error: "Task not found" });
      res.json(task);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  // ==========================================
  // DINING & F&B POS ENDPOINTS
  // ==========================================
  app.get("/api/orders", async (req, res) => {
    try {
      await ensureDb();
      const orders = await (DiningOrderModel as any).find({}).sort({ createdAt: -1 });
      res.json(orders);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      await ensureDb();
      const newOrder = new DiningOrderModel(req.body);
      await newOrder.save();
      res.status(201).json(newOrder);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.patch("/api/orders/:id/status", async (req, res) => {
    try {
      await ensureDb();
      const { status } = req.body;
      const order = await (DiningOrderModel as any).findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );
      if (!order) return res.status(404).json({ error: "Order not found" });
      res.json(order);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  // ==========================================
  // BANQUET & WEDDING EVENTS ENDPOINTS
  // ==========================================
  app.get("/api/banquets", async (req, res) => {
    try {
      await ensureDb();
      const banquets = await (BanquetBookingModel as any).find({}).sort({ date: 1 });
      res.json(banquets);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/banquets", async (req, res) => {
    try {
      await ensureDb();
      const newBanquet = new BanquetBookingModel(req.body);
      await newBanquet.save();
      res.status(201).json(newBanquet);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  // ==========================================
  // STAFF & ROSTER ENDPOINTS
  // ==========================================
  app.get("/api/staff", async (req, res) => {
    try {
      await ensureDb();
      const staff = await (StaffMemberModel as any).find({}).sort({ name: 1 });
      res.json(staff);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/staff", async (req, res) => {
    try {
      await ensureDb();
      const newStaff = new StaffMemberModel(req.body);
      await newStaff.save();
      res.status(201).json(newStaff);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  // ==========================================
  // INVENTORY & SUPPLIES ENDPOINTS
  // ==========================================
  app.get("/api/inventory", async (req, res) => {
    try {
      await ensureDb();
      const inventory = await (InventoryItemModel as any).find({}).sort({ category: 1, name: 1 });
      res.json(inventory);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.patch("/api/inventory/:id/stock", async (req, res) => {
    try {
      await ensureDb();
      const { stockLevel } = req.body;
      const item = await (InventoryItemModel as any).findByIdAndUpdate(
        req.params.id,
        { stockLevel },
        { new: true }
      );
      if (!item) return res.status(404).json({ error: "Inventory item not found" });
      res.json(item);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  // ==========================================
  // INVOICE & GST BILLING ENDPOINTS
  // ==========================================
  app.get("/api/invoices", async (req, res) => {
    try {
      await ensureDb();
      const invoices = await (InvoiceModel as any).find({}).sort({ createdAt: -1 });
      res.json(invoices);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/invoices", async (req, res) => {
    try {
      await ensureDb();
      const newInvoice = new InvoiceModel(req.body);
      await newInvoice.save();
      res.status(201).json(newInvoice);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  // ==========================================
  // GEMINI AI INTEGRATION ENDPOINTS
  // ==========================================

  // AI Endpoint 1: Royal Concierge & Custom Itinerary Generator
  app.post("/api/ai/royal-concierge", async (req, res) => {
    try {
      const ai = getAiClient();
      if (!ai) {
        return res.status(503).json({ 
          error: "GEMINI_API_KEY environment variable is missing. Please configure it in Settings > Secrets." 
        });
      }

      const { guestName, roomCategory, preferences, stayDuration, occasion } = req.body;

      const prompt = `
You are the Chief Royal Concierge at the 50-year-old Four's Way Hotel in Dubai.
Generate a tailored 24-hour Royal Guest Itinerary and Protocol for our guest.

Guest Details:
- Name: ${guestName || 'Valued Royal Guest'}
- Staying in: ${roomCategory || 'Maharaja Suite'}
- Occasion: ${occasion || 'Heritage Luxury Vacation'}
- Special Preferences / Dietary: ${preferences || 'Authentic Kathiyawadi royal dining, vintage car ride, sunset views'}
- Duration: ${stayDuration || '2 Days'}

Provide a structured, regal response in JSON format with:
1. welcomeProtocol: A 2-sentence formal Royal Welcome procedure for the Front Desk and Assigned Butler.
2. morningSchedule: Detailed morning royal experience (e.g., terrace breakfast at Jal Mahal, morning raga music).
3. afternoonSchedule: Afternoon royal heritage tour (e.g., Palace Museum, Vintage Car drive around Rajkot, Sheesh Mahal lunch).
4. eveningSchedule: Evening royal courtyard dining, Kathiyawadi folk dance, star-gazing at Suryavanshi terrace.
5. bespokeTouches: 3 specific personalized royal touches (e.g., custom damask rose bath oils, Jain royal thali pairing, silver-embossed welcome scroll).
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          systemInstruction: "You are an elite hospitality AI for Four's Way Hotel in Dubai. Always respond with regal, gracious, and culturally authentic hospitality tone in clean JSON."
        }
      });

      const resultText = response.text || "{}";
      res.json(JSON.parse(resultText));
    } catch (err: any) {
      console.error("Error in royal-concierge AI API:", err);
      res.status(500).json({ error: err.message || "Failed to generate royal concierge itinerary." });
    }
  });

  // AI Endpoint 2: Dynamic Pricing & Revenue Rate Optimizer
  app.post("/api/ai/rate-optimizer", async (req, res) => {
    try {
      const ai = getAiClient();
      if (!ai) {
        return res.status(503).json({ 
          error: "GEMINI_API_KEY environment variable is missing. Please configure it in Settings > Secrets." 
        });
      }

      const { occupancyPercentage, currentSeason, upcomingEvents, competitorRate } = req.body;

      const prompt = `
You are the Chief Revenue Manager and Yield Optimization AI for Four's Way Hotel in Dubai.
Analyze the following operational data and generate dynamic rate recommendations:

Current Hotel Metrics:
- Current Occupancy: ${occupancyPercentage || 75}%
- Season: ${currentSeason || 'Peak Wedding & Festive Season (Oct - Mar)'}
- Upcoming High-Demand Events: ${upcomingEvents || 'Royal Wedding at Suryavanshi Lawns + Gujarat Industrial Summit'}
- Regional Luxury Competitor Rates: ₹${competitorRate || 22000}/night

Generate a JSON object with:
1. occupancyAnalysis: A concise summary of current demand dynamics.
2. recommendedSuiteRates: Object with suggested rates in ₹ INR for:
   - Maharaja Suite
   - Maharani Suite
   - Suryavanshi Suite
   - Royal Heritage Room
3. banquetYieldStrategy: 2 strategic suggestions for maximizing banquet & venue revenue for Suryavanshi Lawns & Darbar Hall.
4. promotionalOffer: 1 exclusive package proposal to increase weekday occupancy without diluting luxury heritage brand value.
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const resultText = response.text || "{}";
      res.json(JSON.parse(resultText));
    } catch (err: any) {
      console.error("Error in rate-optimizer AI API:", err);
      res.status(500).json({ error: err.message || "Failed to run rate optimization." });
    }
  });

  // AI Endpoint 3: Guest Review & Sentiment Analyzer
  app.post("/api/ai/guest-sentiment", async (req, res) => {
    try {
      const ai = getAiClient();
      if (!ai) {
        return res.status(503).json({ 
          error: "GEMINI_API_KEY environment variable is missing." 
        });
      }

      const { reviews } = req.body;

      const prompt = `
Analyze these guest feedback comments from Four's Way Hotel guests:
"${reviews || 'The Maharaja Suite was breathtaking! The vintage car arrival made us feel like royalty. However, breakfast service at Deep Mahal took 20 minutes longer than expected. Housekeeping butler Manish was exceptional.'}"

Generate a JSON response with:
1. sentimentScore: Overall rating out of 10.
2. positiveHighlights: List of top praised features (e.g., Royal Butler, Vintage Car, Heritage Architecture).
3. operationalDefects: List of areas needing immediate staff action.
4. recommendedActions: 3 actionable operational tasks for Front Desk, Kitchen, or Housekeeping.
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const resultText = response.text || "{}";
      res.json(JSON.parse(resultText));
    } catch (err: any) {
      console.error("Error in guest-sentiment AI API:", err);
      res.status(500).json({ error: err.message || "Failed to analyze sentiment." });
    }
  });

  // Centralized Express Error Handler Middleware
  app.use((err: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const statusCode = err.status || err.statusCode || 500;
    console.error(`❌ [Error ${statusCode}] ${req.method} ${req.originalUrl}:`, err.message);
    if (NODE_ENV !== "production" && err.stack) {
      console.error(err.stack);
    }
    res.status(statusCode).json({
      error: err.message || "Internal Server Error",
      status: statusCode,
      path: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  });

  // Vite middleware for development vs static serve for production
  if (NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log("\n==========================================");
    console.log(`🏰 Four's Way Hotel ERP Server`);
    console.log(`🌍 Environment: ${NODE_ENV}`);
    console.log(`🔌 Port: ${PORT}`);
    console.log(`🔒 Allowed CORS Origins:`);
    allowedOrigins.forEach((o) => console.log(`   - ${o}`));
    console.log(`🛢️ MongoDB Status: ${isDbConnected ? "Connected" : "Disconnected"}`);
    console.log(`✨ Server listening at http://0.0.0.0:${PORT}`);
    console.log("==========================================\n");
  });
}

startServer();
