import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

try {
  const models = await ai.models.list();

  console.log(JSON.stringify(models, null, 2));
} catch (err) {
  console.error(err);
}