import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

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

  // API Health Endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "Heritage Khirasara Palace ERP", timestamp: new Date().toISOString() });
  });

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
You are the Chief Royal Concierge at the 450-year-old Heritage Khirasara Palace Hotel in Rajkot, Gujarat, India.
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
          systemInstruction: "You are an elite hospitality AI for Heritage Khirasara Palace Rajkot. Always respond with regal, gracious, and culturally authentic Gujarati heritage hospitality tone in clean JSON."
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
You are the Chief Revenue Manager and Yield Optimization AI for Heritage Khirasara Palace, Rajkot.
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
Analyze these guest feedback comments from Heritage Khirasara Palace guests:
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

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
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
    console.log(`Heritage Khirasara Palace ERP Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
