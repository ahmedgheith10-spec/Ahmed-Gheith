import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  // API endpoints
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // AI Cookie Matchmaker / Baker Recommendation API
  app.post("/api/ai-recommend", async (req, res) => {
    try {
      const { prompt, cookies } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(400).json({ 
          recommendation: "Our baker Clara suggests trying 'The Hearth Classic' or 'Sea Salt Toffee'! (To unlock custom AI recommendations, please set your GEMINI_API_KEY in the secrets panel)." 
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are Clara, master artisan baker at Hearth & Crumb Cookie Co. in Vermont.
A customer asks for cookie recommendations with the request: "${prompt}".
Available cookies menu: ${JSON.stringify(cookies)}.

Respond in a warm, cozy, enthusiastic baker voice. Highlight 1 to 3 specific cookies that match their request and explain why in 2-3 short sentences. Finish with a cheerful baking tip!`
      });

      res.json({ recommendation: response.text });
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      res.status(500).json({ error: err.message || "Failed to generate recommendation" });
    }
  });

  // Vite middleware for development vs static build for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Hearth & Crumb server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
