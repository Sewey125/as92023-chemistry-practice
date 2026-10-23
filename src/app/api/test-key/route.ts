import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const CANDIDATE_MODELS = [
  "gemini-3.8-flash",
  "gemini-flash-latest",
  "gemini-2.5-flash",
  "gemini-3-flash",
  "gemini-3.8-pro",
  "gemini-2.5-pro",
];

export async function POST(req: NextRequest) {
  try {
    const { apiKey } = await req.json();
    const cleanKey = apiKey ? String(apiKey).trim().replace(/['"`]/g, "") : "";

    if (!cleanKey) {
      return NextResponse.json({ ok: false, error: "Please enter an API key to test." }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey: cleanKey });
    
    let lastError: any = null;
    let success = false;
    let connectedModel = "";
    const modelsToTry = [...CANDIDATE_MODELS];
    const triedModels = new Set<string>();

    while (modelsToTry.length > 0) {
      const modelName = modelsToTry.shift()!;
      if (triedModels.has(modelName)) continue;
      triedModels.add(modelName);

      try {
        const testPromise = ai.models.generateContent({
          model: modelName,
          contents: "Respond with the single word: OK",
        });

        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Connection to Google AI timed out after 8 seconds.")), 8000)
        );

        await Promise.race([testPromise, timeoutPromise]);
        success = true;
        connectedModel = modelName;
        break;
      } catch (err: any) {
        lastError = err;
        const msg = err?.message || String(err);

        // Immediate stop for invalid credentials or quota issues
        if (msg.includes("API_KEY_INVALID") || msg.includes("not valid") || msg.includes("INVALID_ARGUMENT")) {
          return NextResponse.json(
            { ok: false, error: "API key is invalid. Please copy a fresh key from aistudio.google.com." },
            { status: 400 }
          );
        }
        if (msg.includes("quota") || msg.includes("RESOURCE_EXHAUSTED") || msg.includes("429")) {
          return NextResponse.json(
            { ok: false, error: "Quota limit reached on this free key. Please wait 15–30 seconds before testing again, or generate a fresh key." },
            { status: 400 }
          );
        }

        // Self-healing: if Google suggests a new replacement model in the error message, queue it
        const suggestedMatch = msg.match(/(?:models\/|use )([a-zA-Z0-9.-]+(?:flash|pro|gemini)[a-zA-Z0-9.-]*)/i);
        if (suggestedMatch && suggestedMatch[1] && !triedModels.has(suggestedMatch[1])) {
          modelsToTry.unshift(suggestedMatch[1]);
        }
      }
    }

    if (success) {
      return NextResponse.json({ ok: true, message: `Connected successfully to Gemini (${connectedModel})!` });
    }

    // Dynamic model discovery fallback via ai.models.list()
    try {
      const modelPager: any = await ai.models.list();
      const availableModels: string[] = [];
      for await (const m of modelPager) {
        if (m.name) {
          const cleanName = m.name.replace(/^models\//, "");
          availableModels.push(cleanName);
        }
      }

      const flashModel = availableModels.find((m) => m.includes("flash") && !triedModels.has(m)) ||
                          availableModels.find((m) => m.includes("gemini") && !triedModels.has(m));
      if (flashModel) {
        await ai.models.generateContent({
          model: flashModel,
          contents: "Respond with the single word: OK",
        });
        return NextResponse.json({ ok: true, message: `Connected successfully to Gemini (${flashModel})!` });
      }
    } catch {
      // Dynamic listing fallback failed, fall through to lastError
    }

    const errorMsg = lastError?.message || "Failed to connect to Google Gemini API.";
    return NextResponse.json({ ok: false, error: errorMsg }, { status: 400 });
  } catch (err: any) {
    const msg = err?.message || String(err);
    return NextResponse.json({ ok: false, error: msg }, { status: 400 });
  }
}
