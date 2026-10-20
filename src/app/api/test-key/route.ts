import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const { apiKey } = await req.json();
    const cleanKey = apiKey ? String(apiKey).trim().replace(/['"`]/g, "") : "";

    if (!cleanKey) {
      return NextResponse.json({ ok: false, error: "Please enter an API key to test." }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey: cleanKey });
    
    // Quick probe with fast model
    const testPromise = ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Respond with the single word: OK",
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Connection to Google AI timed out after 6 seconds.")), 6000)
    );

    await Promise.race([testPromise, timeoutPromise]);

    return NextResponse.json({ ok: true, message: "Connected successfully to Gemini!" });
  } catch (err: any) {
    const msg = err?.message || String(err);
    if (msg.includes("API_KEY_INVALID") || msg.includes("not valid")) {
      return NextResponse.json({ ok: false, error: "API key is invalid. Please copy a fresh key from aistudio.google.com" }, { status: 400 });
    }
    if (msg.includes("quota") || msg.includes("RESOURCE_EXHAUSTED")) {
      return NextResponse.json({ ok: false, error: "Quota limit reached on this free key. Create a new key or use Offline Mode." }, { status: 400 });
    }
    return NextResponse.json({ ok: false, error: msg }, { status: 400 });
  }
}
