import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = "You are FARM AI, an elite agricultural decision intelligence engine for Indian farmers. Advise practically in 2-3 sentences on Mandi rates, weather/rainfall windows, soil moisture, and schemes like PM-KUSUM and PMFBY. Reply in Hinglish or English based on user query.";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const message = body?.message || "";

    if (!message.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: message,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    const reply = response.text || "FARM AI active.";
    return NextResponse.json({ reply, status: "connected" });
  } catch (error: any) {
    console.error("Gemini Error:", error);
    return NextResponse.json({
      reply: "Mandi telemetry active. Please ask specifically about crops, rainfall, or subsidies.",
      status: "fallback",
    });
  }
}
