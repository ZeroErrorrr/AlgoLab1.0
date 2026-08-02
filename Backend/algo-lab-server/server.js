import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { buildPrompt } from "./prompts.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
console.log("API Key exists:", !!apiKey);
console.log("API Key prefix:", apiKey?.substring(0, 8));
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Model name changes over time — if this starts failing, check
// https://ai.google.dev/gemini-api/docs/models for the current flash model name.
const MODEL = "gemini-3.6-flash";

// Tiny in-memory cache so repeated identical requests during a demo/rehearsal
// don't burn extra API calls. Clears on server restart — fine for a hackathon.
const cache = new Map();

app.get("/api/health", (req, res) => {
  res.json({ ok: true, geminiConfigured: Boolean(apiKey) });
});

app.post("/api/explain", async (req, res) => {
  const { algorithm, context } = req.body || {};

  if (!algorithm) {
    return res.status(400).json({ error: 'Missing "algorithm" in request body.' });
  }
  if (!ai) {
    return res.status(503).json({
      error: "GEMINI_API_KEY is not set on the server. Add it to .env and restart the server.",
    });
  }

  const cacheKey = JSON.stringify({ algorithm, context });
  if (cache.has(cacheKey)) {
    return res.json({ explanation: cache.get(cacheKey), cached: true });
  }

  try {
    const prompt = buildPrompt(algorithm, context || {});
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
    });
    const text = response.text?.trim() || "I couldn't generate an explanation for that just now.";
    cache.set(cacheKey, text);
    res.json({ explanation: text });
  } catch (err) {
    console.error("Gemini call failed:", err.message);
    res.status(502).json({ error: "Gemini API call failed.", detail: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`AlgoLab backend running on http://localhost:${PORT}`);
  console.log("API KEY EXISTS:", !!apiKey);
console.log("API KEY PREFIX:", apiKey?.substring(0, 10));
});
