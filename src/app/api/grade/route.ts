import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { PRACTICE_QUESTIONS } from "@/data/questions";

export interface CriterionEvaluation {
  criterion: string;
  tier: "Achieved" | "Merit" | "Excellence";
  status: "met" | "partial" | "not_met";
  feedback: string;
}

export interface EvaluationResult {
  grade: "Not Achieved" | "Achieved" | "Merit" | "Excellence";
  scoreSummary: string;
  detailedCritique: string;
  criteriaBreakdown: CriterionEvaluation[];
  keyStrengths: string[];
  areasForImprovement: string[];
  vagueLanguageWarnings: string[];
  particleAndBondingFeedback: string;
  mechanismFeedback: string;
  useJustificationFeedback: string;
  howToLevelUp: string;
  exemplarImprovements: string;
}

export async function POST(req: NextRequest) {
  let questionId = "";
  let studentAnswer = "";

  try {
    const body = await req.json();
    questionId = body.questionId;
    studentAnswer = body.studentAnswer;
    const apiKey = body.apiKey;

    if (!questionId || !studentAnswer || typeof studentAnswer !== "string") {
      return NextResponse.json(
        { error: "Invalid request: questionId and studentAnswer are required." },
        { status: 400 }
      );
    }

    const question = PRACTICE_QUESTIONS.find((q) => q.id === questionId);
    if (!question) {
      return NextResponse.json(
        { error: "Question not found." },
        { status: 404 }
      );
    }

    // Determine API Key: Client BYOK key takes precedence, fallback to server ENV key
    const rawKey = apiKey?.trim() || process.env.GEMINI_API_KEY?.trim() || "";
    const activeApiKey = rawKey.replace(/['"`\s]/g, "");

    if (!activeApiKey) {
      return NextResponse.json(
        {
          error: "No Gemini API key found. Please click 'Connect API Key' in the navigation or practice header to enter your free key from Google AI Studio.",
        },
        { status: 400 }
      );
    }

    if (studentAnswer.trim().length < 25) {
      const emptyBreakdown: CriterionEvaluation[] = [
        ...question.criteria.achieved.map((c) => ({
          criterion: c,
          tier: "Achieved" as const,
          status: "not_met" as const,
          feedback: "No evidence provided in student response.",
        })),
        ...question.criteria.merit.map((c) => ({
          criterion: c,
          tier: "Merit" as const,
          status: "not_met" as const,
          feedback: "No evidence provided in student response.",
        })),
        ...question.criteria.excellence.map((c) => ({
          criterion: c,
          tier: "Excellence" as const,
          status: "not_met" as const,
          feedback: "No evidence provided in student response.",
        })),
      ];

      return NextResponse.json(
        {
          grade: "Not Achieved",
          scoreSummary: "Response is too brief to demonstrate understanding under NZQA AS92023 criteria.",
          detailedCritique: "The response contains fewer than 25 characters. NZQA Level 1 Chemistry & Biology requires candidates to explain the relationship between a material's particle structure, the attractive forces acting within it, its physical properties, and its real-world performance.",
          criteriaBreakdown: emptyBreakdown,
          keyStrengths: [],
          areasForImprovement: [
            "Write a full paragraph addressing each material specified in the scenario.",
            "Use the SPAC framework: Substance type, Particles, Attractive forces, Consequence to use.",
          ],
          vagueLanguageWarnings: [
            "Your answer is too short. NZQA examiners require thorough descriptions linking constituent particles to observable properties and practical use.",
          ],
          particleAndBondingFeedback: "No specific constituent particles (atoms, ions, molecules, or delocalised electrons) or bonding types were identified.",
          mechanismFeedback: "No microscopic mechanism connecting particle arrangement to physical properties was provided.",
          useJustificationFeedback: "No practical application, operational condition, or material comparison was evaluated.",
          howToLevelUp: "Begin by identifying the material classification (metallic solid, ionic compound, covalent network, molecular substance, or polymer) and naming the constituent particles held together by attractive forces.",
          exemplarImprovements: "Review the official model answer below to examine how each sub-question should be addressed with full scientific depth.",
        } satisfies EvaluationResult
      );
    }

    // Call Google Gemini API
    const ai = new GoogleGenAI({ apiKey: activeApiKey });

    const systemInstruction = `
You are a senior New Zealand NZQA Chemistry Examiner assessing student answers for NCEA Level 1 Chemistry and Biology Standard AS92023 Version 3:
"Demonstrate understanding of how the physical properties of materials inform their use" (4 Credits, External).

STRICT RULE 1: ABSOLUTELY NO EMOJIS UNDER ANY CIRCUMSTANCES. DO NOT INCLUDE ANY EMOJI CHARACTERS (e.g., ✨, 🚀, 💡, 📝, ✅, ❌, etc.) IN ANY FIELD OF YOUR RESPONSE.

STRICT RULE 2: PROVIDE DEEP, DETAILED, AND RIGOROUS FEEDBACK. Do not give shallow 1-sentence summaries. Write comprehensive, multi-paragraph explanations that quote the student's exact phrasing, diagnose their scientific reasoning, and explain exactly how to upgrade their answer.

STRICT RULE 3: APPLY THE OFFICIAL NZQA MARKING SCHEDULE RIGOROUSLY.
Follow this 4-step grading decision rubric:

1. NOT ACHIEVED (N):
   - Identifies properties without linking them to practical use.
   - Purely informal or everyday explanations with little or no reference to particles or bonding.
   - Confuses material classifications (e.g., calling ionic compounds metallic, calling ions "atoms", or stating that covalent bonds break when molecular substances or polymers melt/dissolve).
   - Merely repeats facts from the scenario or data tables without particle explanation.

2. ACHIEVED (A):
   - Correctly identifies constituent particles (atoms, cations, anions, molecules, delocalised electrons) and bonding types.
   - Describes the physical properties with reference to particle arrangement and relative strength of attractive forces.
   - Describes the use of materials with reference to their physical properties.

3. MERIT (M):
   - Explains physical properties and use in relation to the arrangement of particles and relative strength of attractive forces.
   - Detailed microscopic mechanisms required:
     * In metals: non-directional metallic bonding; layers of cations slide past one another under shear stress while maintaining electrostatic attraction to mobile delocalised electrons.
     * In alloys: solute atoms of differing atomic radius disrupt the regular rows of cations in the 3D network, preventing layers from sliding easily and increasing hardness/yield strength.
     * In ionic solids: rigid 3D network of alternating cations and anions; shear force shifts rows and aligns like charges (+ next to +, - next to -), causing repulsive cleavage and shattering (brittleness).
     * In dissolution: polar water molecules (partial negative Oδ⁻ and partial positive Hδ⁺) form hydration shells that overcome the ionic bonds in the 3D network, freeing mobile ions.
     * In polymers (LDPE): extensive side-chain branching prevents close packing of chains, resulting in lower density (mass per volume < 1.0 g/cm³, floats on water) and weak intermolecular forces allowing flexibility.
     * In covalent networks: diamond 3D tetrahedral network with 4 localized covalent bonds per carbon vs graphite 2D planar hexagonal network with delocalised 4th valence electrons.

4. EXCELLENCE (E):
   - Comprehensively evaluates how materials behave when used by linking physical properties to particle arrangement and relative strength of attractive forces.
   - Evaluates the material's specific suitability in context, analyzes trade-offs, and explains why alternative materials would fail (e.g. why steel paddles would cause user fatigue and sink, why pure aluminium would bend, why graphite is needed for heat/current in motors/batteries, why CO2 is safe on electrical fires while water conducts electricity).
   - Accurately integrates numerical data from provided tables (e.g., comparing densities, melting points, or Young's modulus).

VAGUE LANGUAGE AUDIT (Official NZQA Examiner Penalty):
- The NZQA examiner commentary strictly penalizes candidates who rely on vague words: "strong", "hard", "light", "strong bonds", or general "intermolecular forces" without naming the specific particles and mechanisms.
- If the student used any of these without explaining the microscopic cause, record it in vagueLanguageWarnings with specific guidance on how to rephrase using proper chemistry terminology.

OUTPUT FORMAT:
Output ONLY a valid JSON object matching this schema:
{
  "grade": "Not Achieved" | "Achieved" | "Merit" | "Excellence",
  "scoreSummary": "A comprehensive 2-3 sentence examiner summary evaluating the overall quality and stating the final grade according to NZQA AS92023 conventions.",
  "detailedCritique": "A thorough 2-3 paragraph examiner critique analyzing the student's answer line-by-line, addressing each material in the scenario and each sub-question.",
  "criteriaBreakdown": [
    {
      "criterion": "Exact text of the criterion from the official marking schedule",
      "tier": "Achieved" | "Merit" | "Excellence",
      "status": "met" | "partial" | "not_met",
      "feedback": "Specific examiner justification explaining whether the student fulfilled this criterion and quoting student evidence."
    }
  ],
  "keyStrengths": [
    "Specific scientific strength with quotes from student's answer",
    "Another specific scientific strength with quotes"
  ],
  "areasForImprovement": [
    "Specific scientific concept or link that was omitted or inaccurate",
    "Another missing concept or link"
  ],
  "vagueLanguageWarnings": [
    "Warning about vague terms used by student ('light', 'strong', 'hard') with the exact scientific phrasing to replace it."
  ],
  "particleAndBondingFeedback": "Detailed multi-paragraph analysis examining the constituent particles (atoms, ions, molecules, delocalised electrons) and bonding types (metallic, ionic, covalent, IMF) for every material in the question.",
  "mechanismFeedback": "Detailed step-by-step causal mechanism explaining how the particle arrangement produces the observable property at a microscopic scale (e.g. layer sliding, like-charge repulsion, branching preventing packing, dipole-ion hydration).",
  "useJustificationFeedback": "Detailed evaluation explaining why the material is fit for the given use, evaluating operational trade-offs, and explaining why alternative materials would fail.",
  "howToLevelUp": "Clear, direct coaching with exact scientific terminology and connections needed to reach the next grade tier.",
  "exemplarImprovements": "A specific paragraph showing how the student's own answer can be rewritten to achieve full Excellence."
}
`;

    let dataTablesContext = "";
    if (question.dataTables && question.dataTables.length > 0) {
      dataTablesContext = question.dataTables
        .map(
          (t) => `
TABLE: ${t.title}
Headers: ${t.headers.join(" | ")}
Rows:
${t.rows.map((r) => r.join(" | ")).join("\n")}
${t.notes ? `Note: ${t.notes}` : ""}
`
        )
        .join("\n");
    }

    const allCriteriaList = [
      ...question.criteria.achieved.map((c) => ({ text: c, tier: "Achieved" })),
      ...question.criteria.merit.map((c) => ({ text: c, tier: "Merit" })),
      ...question.criteria.excellence.map((c) => ({ text: c, tier: "Excellence" })),
    ];

    const promptText = `
NZQA EXAMINATION QUESTION DETAILS:
Title: ${question.title}
Examination Paper: ${question.year} External Assessment (Question ${question.questionNumber})
Materials Involved: ${question.materials.join(", ")}
Material Classifications: ${question.materialTypes.join(", ")}

CONTEXT SCENARIO:
${question.contextSummary}

${dataTablesContext}

SUB-QUESTIONS TO BE ANSWERED:
${question.subQuestions.map((sq) => `${sq.label}: ${sq.prompt}`).join("\n\n")}

FULL PROMPT:
${question.fullPrompt}

OFFICIAL NZQA MARKING SCHEDULE EVIDENCE REQUIREMENTS:
Achieved Criteria:
${question.criteria.achieved.map((c) => `- ${c}`).join("\n")}

Merit Criteria:
${question.criteria.merit.map((c) => `- ${c}`).join("\n")}

Excellence Criteria:
${question.criteria.excellence.map((c) => `- ${c}`).join("\n")}

CRITERIA BREAKDOWN INSTRUCTION:
In your JSON output, your "criteriaBreakdown" array MUST include an entry for EVERY single one of the above Achieved, Merit, and Excellence criteria (total ${allCriteriaList.length} criteria). Evaluate each with status "met", "partial", or "not_met" and provide specific examiner feedback.

EXCELLENCE MODEL EXEMPLAR FOR REFERENCE:
"""
${question.sampleExcellenceAnswer}
"""

STUDENT'S WRITTEN ANSWER TO GRADE:
"""
${studentAnswer}
"""

Evaluate the student's answer now against the official NZQA criteria. Output ONLY valid JSON. Strictly NO emojis.
`;

    // Adaptive candidate models list prioritizing fast, modern Gemini models
    const CANDIDATE_MODELS = [
      "gemini-3.8-flash",
      "gemini-flash-latest",
      "gemini-2.5-flash",
      "gemini-3-flash",
      "gemini-3.8-pro",
      "gemini-2.5-pro",
    ];

    let lastError: any = null;
    let responseText = "";
    const modelsToTry = [...CANDIDATE_MODELS];
    const triedModels = new Set<string>();

    while (modelsToTry.length > 0) {
      const modelName = modelsToTry.shift()!;
      if (triedModels.has(modelName)) continue;
      triedModels.add(modelName);

      try {
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out after 25 seconds.")), 25000)
        );

        const generatePromise = ai.models.generateContent({
          model: modelName,
          contents: promptText,
          config: {
            systemInstruction,
            responseMimeType: "application/json",
            temperature: 0.2,
          },
        });

        const response: any = await Promise.race([generatePromise, timeoutPromise]);
        responseText =
          response.text?.trim() ||
          response.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join("") ||
          "";

        if (responseText) {
          break; // successfully generated
        }
      } catch (err: any) {
        lastError = err;
        const errMsg = err?.message || String(err);
        console.warn(`Model ${modelName} encountered error:`, errMsg);

        // Immediate stop for invalid credentials - do not burn quota or retry
        if (errMsg.includes("API_KEY_INVALID") || errMsg.includes("not valid") || errMsg.includes("INVALID_ARGUMENT")) {
          return NextResponse.json(
            { error: "Your Gemini API key is invalid. Please copy a fresh API key from Google AI Studio (aistudio.google.com)." },
            { status: 400 }
          );
        }

        // Immediate stop for rate limits / quota exhaustion on free tier
        if (errMsg.includes("quota") || errMsg.includes("RESOURCE_EXHAUSTED") || errMsg.includes("429")) {
          return NextResponse.json(
            {
              error: "Google AI Studio Free Tier rate limit reached (requests per minute or token limit). Please wait 20–30 seconds before clicking 'Grade Answer' again, or create a fresh API key at aistudio.google.com.",
            },
            { status: 429 }
          );
        }

        // Automatic self-healing: If Google returns 404 with a recommendation like
        // "Please update your code to use models/gemini-3.8-flash" or similar, dynamically queue the recommended model
        const suggestedMatch = errMsg.match(/(?:models\/|use )([a-zA-Z0-9.-]+(?:flash|pro|gemini)[a-zA-Z0-9.-]*)/i);
        if (suggestedMatch && suggestedMatch[1] && !triedModels.has(suggestedMatch[1])) {
          modelsToTry.unshift(suggestedMatch[1]);
        }
      }
    }

    // Dynamic model catalog discovery fallback if hardcoded models were not found
    if (!responseText && lastError) {
      const errMsg = lastError?.message || "";
      if (errMsg.includes("404") || errMsg.includes("NOT_FOUND") || errMsg.includes("no longer available")) {
        try {
          console.log("Attempting dynamic model discovery via ai.models.list()...");
          const modelPager: any = await ai.models.list();
          const availableModels: string[] = [];
          for await (const m of modelPager) {
            if (m.name) {
              const cleanName = m.name.replace(/^models\//, "");
              availableModels.push(cleanName);
            }
          }

          const dynamicTarget =
            availableModels.find((m) => m.includes("flash") && !triedModels.has(m)) ||
            availableModels.find((m) => m.includes("gemini") && !triedModels.has(m));

          if (dynamicTarget) {
            console.log(`Discovered available model: ${dynamicTarget}, attempting generation...`);
            const timeoutPromise = new Promise<never>((_, reject) =>
              setTimeout(() => reject(new Error("Request timed out after 25 seconds.")), 25000)
            );

            const generatePromise = ai.models.generateContent({
              model: dynamicTarget,
              contents: promptText,
              config: {
                systemInstruction,
                responseMimeType: "application/json",
                temperature: 0.2,
              },
            });

            const response: any = await Promise.race([generatePromise, timeoutPromise]);
            responseText =
              response.text?.trim() ||
              response.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join("") ||
              "";
          }
        } catch (discoveryErr: any) {
          console.warn("Dynamic model discovery failed:", discoveryErr?.message || discoveryErr);
        }
      }
    }

    if (!responseText) {
      const errMsg = lastError?.message || "Google Gemini API did not return a response.";
      console.error("Gemini API call failed for provided key:", errMsg);
      return NextResponse.json(
        {
          error: `Google Gemini AI Error: ${errMsg}. Please verify that your API key from Google AI Studio is active and has available quota.`,
        },
        { status: 400 }
      );
    }

    try {
      let cleanedText = responseText.trim();
      // Remove any markdown code fence wrapping if present
      if (cleanedText.startsWith("```")) {
        cleanedText = cleanedText.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
      }
      const firstBrace = cleanedText.indexOf("{");
      const lastBrace = cleanedText.lastIndexOf("}");
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        cleanedText = cleanedText.slice(firstBrace, lastBrace + 1);
      }

      const parsedData = JSON.parse(cleanedText);
      return NextResponse.json(parsedData);
    } catch (parseError) {
      console.error("Failed to parse Gemini response as JSON:", parseError, "\nRaw text:", responseText);
      return NextResponse.json(
        {
          error: "Gemini AI returned a response, but it could not be parsed as structured JSON. Please try submitting again.",
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Evaluation route fatal error:", error);
    return NextResponse.json(
      {
        error: error?.message || "Failed to evaluate answer with Gemini AI.",
      },
      { status: 500 }
    );
  }
}
