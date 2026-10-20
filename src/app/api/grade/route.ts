import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { PRACTICE_QUESTIONS } from "@/data/questions";

export interface EvaluationResult {
  grade: "Not Achieved" | "Achieved" | "Merit" | "Excellence";
  scoreSummary: string;
  keyStrengths: string[];
  vagueLanguageWarnings: string[];
  particleAndBondingFeedback: string;
  mechanismFeedback: string;
  useJustificationFeedback: string;
  howToLevelUp: string;
  exemplarImprovements: string;
  isSimulated?: boolean;
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

    if (studentAnswer.trim().length < 20) {
      return NextResponse.json(
        {
          grade: "Not Achieved",
          scoreSummary: "Response is too brief to demonstrate understanding under NZQA criteria.",
          keyStrengths: [],
          vagueLanguageWarnings: [
            "Your answer is too short. NZQA requires descriptive and explanatory links between particles, properties, and practical applications.",
          ],
          particleAndBondingFeedback: "No specific constituent particles or bonding types were identified.",
          mechanismFeedback: "No particle-level mechanism was provided.",
          useJustificationFeedback: "No practical application was evaluated.",
          howToLevelUp: "Begin by identifying the particles (atoms, ions, molecules, or electrons) and the attractive forces holding them together.",
          exemplarImprovements: "Review the model answer to see how a complete response is structured.",
          isSimulated: false,
        } satisfies EvaluationResult
      );
    }

    // Determine API Key: Client BYOK key takes precedence, fallback to server ENV key
    const rawKey = apiKey?.trim() || process.env.GEMINI_API_KEY?.trim() || "";
    const activeApiKey = rawKey.replace(/['"`\s]/g, "");

    if (!activeApiKey) {
      // If no key is present, provide instant simulated evaluation based on NZQA rubric
      const simulatedResult = generateSimulatedEvaluation(studentAnswer, question);
      return NextResponse.json({
        ...simulatedResult,
        isSimulated: true,
      });
    }

    // Call Google Gemini API
    const ai = new GoogleGenAI({ apiKey: activeApiKey });

    const systemInstruction = `
You are an expert New Zealand NZQA Chemistry Examiner assessing student answers for NCEA Level 1 Chemistry and Biology Standard AS92023 Version 3:
"Demonstrate understanding of how the physical properties of materials inform their use" (4 Credits, External).

STRICT RULE 1: ABSOLUTELY NO EMOJIS UNDER ANY CIRCUMSTANCES. DO NOT INCLUDE ANY EMOJI CHARACTERS (e.g., ✨, 🚀, 💡, 📝, ✅, ❌, etc.) IN ANY FIELD OF YOUR RESPONSE.

STRICT RULE 2: APPLY THE OFFICIAL NZQA MARKING SCHEDULE CONVENTIONS AND EXAMINER REPORT RIGOROUSLY.
Follow this 4-step grading decision rubric:

1. NOT ACHIEVED (N):
   - Identifies properties without linking them to practical use.
   - Gives informal or purely everyday explanations with little or no reference to particles or bonding.
   - Uses incorrect material classifications (e.g., calling ionic compounds metallic, calling ions "atoms", or stating that covalent bonds break when molecular substances/polymers melt or dissolve).
   - Merely repeats facts from the scenario or data tables without explanation.

2. ACHIEVED (A):
   - Correctly identifies constituent particles (atoms, ions, molecules, or delocalised electrons) and bonding types.
   - Describes the physical properties with reference to particle arrangement and relative strength of attractive forces.
   - Describes the use of materials with reference to their physical properties.

3. MERIT (M):
   - Explains physical properties and use in relation to the arrangement of particles and relative strength of attractive forces.
   - Detailed mechanistic explanations required:
     * In metals: delocalised valence electrons free to move and carry charge; layers of cations sliding under force.
     * In alloys: different-sized solute atoms distort and disrupt regular rows of cations, preventing layers from sliding easily, increasing hardness.
     * In ionic solids: rigid 3D network of alternating positive and negative ions; shift of layers aligns like charges, causing repulsive fracture (brittleness).
     * In dissolution: polar water molecules (partially negative O and partially positive H) attract ions, overcoming 3D network electrostatic attractions.
     * In polymers (LDPE): side-chain branching prevents close packing of chains, giving low density and allowing chains to flex past each other.
     * In covalent networks: diamond 3D tetrahedral network vs graphite 2D sheets with delocalised electrons.

4. EXCELLENCE (E):
   - Comprehensively evaluates how materials behave when used by linking physical properties to the arrangement of particles and relative strength of attractive forces.
   - Must evaluate the material's specific suitability in context, analyze trade-offs, and explain why alternative materials would fail (e.g., why steel paddles would cause user fatigue and sink, why pure aluminium would bend, why graphite is needed for heat/current in motors/batteries, why CO2 is safe on electrical fires while water causes electrocution).
   - Accurately integrates numerical data from provided tables (e.g., comparing densities, melting points, or Young's modulus).

VAGUE LANGUAGE AUDIT (Official Examiner Penalty):
- The NZQA examiner commentary strictly penalizes candidates who rely on vague words: "strong", "hard", "light", "strong bonds", or general "intermolecular forces" without naming the specific particles and mechanisms.
- If the student used any of these without explaining the microscopic cause, record it in vagueLanguageWarnings with specific guidance on how to rephrase using proper chemistry terminology.

Output ONLY a valid JSON object matching this schema:
{
  "grade": "Not Achieved" | "Achieved" | "Merit" | "Excellence",
  "scoreSummary": "A concise 1-2 sentence examiner summary of the grade awarded according to NZQA criteria.",
  "keyStrengths": ["Detailed strength 1 referencing student's scientific points", "Detailed strength 2"],
  "vagueLanguageWarnings": ["Warning about vague terms used by student, if any"],
  "particleAndBondingFeedback": "Precise examiner feedback on whether particles (atoms, ions, molecules, electrons) and bonding were accurately identified.",
  "mechanismFeedback": "Precise examiner feedback on whether the microscopic mechanism connecting structure to property was clearly explained.",
  "useJustificationFeedback": "Precise examiner feedback on whether the practical use was justified and whether alternative materials / failure modes were evaluated.",
  "howToLevelUp": "One clear, actionable sentence instructing the student on the exact missing concept or evidence needed to upgrade to the next grade tier.",
  "exemplarImprovements": "Specific phrasing or scientific connection that would elevate this answer to full Excellence."
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

    // Try models in order of speed and stability
    const candidateModels = ["gemini-2.0-flash-lite", "gemini-2.0-flash", "gemini-1.5-flash"];
    let lastError: any = null;
    let responseText = "";

    for (const modelName of candidateModels) {
      try {
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Request timeout")), 12000)
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
        responseText = response.text?.trim() || "";
        if (responseText) {
          break; // successfully generated
        }
      } catch (err: any) {
        lastError = err;
        const errMsg = err?.message || String(err);
        console.warn(`Model ${modelName} encountered error:`, errMsg);
        // Continue to fallback model on any error/timeout
        continue;
      }
    }

    if (!responseText) {
      console.warn("All Gemini API models failed or timed out. Gracefully falling back to simulated evaluation:", lastError?.message);
      const fallbackResult = generateSimulatedEvaluation(studentAnswer, question);
      return NextResponse.json({
        ...fallbackResult,
        isSimulated: true,
      });
    }

    try {
      const parsedData = JSON.parse(responseText);
      return NextResponse.json({
        ...parsedData,
        isSimulated: false,
      });
    } catch (parseError) {
      console.warn("Failed to parse Gemini response as JSON. Falling back to heuristic evaluator:", parseError);
      const fallbackResult = generateSimulatedEvaluation(studentAnswer, question);
      return NextResponse.json({
        ...fallbackResult,
        isSimulated: true,
      });
    }
  } catch (error: any) {
    console.error("Evaluation error:", error);
    try {
      const question = PRACTICE_QUESTIONS.find((q) => q.id === questionId);
      if (question) {
        const fallbackResult = generateSimulatedEvaluation(studentAnswer, question);
        return NextResponse.json({
          ...fallbackResult,
          isSimulated: true,
        });
      }
    } catch {
      // ignore
    }
    return NextResponse.json(
      {
        error: error?.message || "Failed to evaluate answer. Please try again.",
      },
      { status: 500 }
    );
  }
}

// Fallback intelligent heuristic evaluator when no API key is set yet
function generateSimulatedEvaluation(studentAnswer: string, question: any): EvaluationResult {
  const text = studentAnswer.toLowerCase();

  const mentionsParticles =
    text.includes("particle") ||
    text.includes("atom") ||
    text.includes("ion") ||
    text.includes("cation") ||
    text.includes("electron") ||
    text.includes("molecule");

  const mentionsForces =
    text.includes("bonding") ||
    text.includes("metallic bond") ||
    text.includes("ionic bond") ||
    text.includes("covalent bond") ||
    text.includes("intermolecular") ||
    text.includes("electrostatic") ||
    text.includes("attractive force");

  const mentionsMechanism =
    text.includes("delocalised") ||
    text.includes("slide") ||
    text.includes("disrupt") ||
    text.includes("3D network") ||
    text.includes("hydrate") ||
    text.includes("polar") ||
    text.includes("branch") ||
    text.includes("layer");

  const mentionsUseComparison =
    text.includes("because") &&
    (text.includes("instead") || text.includes("fail") || text.includes("unsuitable") || text.includes("would"));

  const vagueWords: string[] = [];
  if (text.includes("strong bond")) {
    vagueWords.push("You used 'strong bond' without specifying the exact nature (e.g. electrostatic attraction between cations and delocalised electrons).");
  }
  if (text.match(/\bstrong\b/) && !mentionsForces) {
    vagueWords.push("You described the material as 'strong' without explaining the particle arrangement that produces this property.");
  }
  if (text.match(/\blight\b/) && !text.includes("density")) {
    vagueWords.push("You mentioned the material is 'light'. NZQA examiners look for the property of low density (mass per unit volume).");
  }
  if (text.match(/\bhard\b/) && !mentionsParticles) {
    vagueWords.push("You stated the material is 'hard' without linking this to rigid directional bonding resisting deformation.");
  }

  let grade: EvaluationResult["grade"] = "Not Achieved";
  let scoreSummary = "Your response demonstrates basic awareness but lacks structure-to-property links.";
  let howToLevelUp = "Identify the specific particles and the attractive forces acting between them.";

  if (mentionsParticles && mentionsForces && mentionsMechanism && mentionsUseComparison && studentAnswer.length > 300) {
    grade = "Excellence";
    scoreSummary = "Excellence criteria met. Your answer comprehensively evaluates how particle structure and bonding inform material suitability and explains failure modes.";
    howToLevelUp = "You have demonstrated Excellence level depth. Ensure all key comparisons remain tightly linked to the given context.";
  } else if (mentionsParticles && mentionsForces && mentionsMechanism) {
    grade = "Merit";
    scoreSummary = "Merit level understanding achieved. You clearly explained the particle-level mechanism connecting structure to observable properties.";
    howToLevelUp = "To reach Excellence: Evaluate why the alternative material would be completely unsuitable or fail under operational conditions.";
  } else if (mentionsParticles || mentionsForces) {
    grade = "Achieved";
    scoreSummary = "Achieved level demonstrated. You identified relevant properties and basic particle or bonding features.";
    howToLevelUp = "To reach Merit: Explain the step-by-step mechanism (e.g. how delocalised electrons move, or how different-sized atoms disrupt regular rows).";
  }

  return {
    grade,
    scoreSummary,
    keyStrengths: [
      mentionsParticles ? "Correctly identified constituent particles in the materials." : "Identified the practical context.",
      mentionsForces ? "Referenced attractive forces/bonding between particles." : "Addressed physical properties.",
    ],
    vagueLanguageWarnings: vagueWords,
    particleAndBondingFeedback: mentionsParticles
      ? "Good recognition of the constituent particles."
      : "Be specific about whether the particles are atoms, ions, molecules, or delocalised electrons.",
    mechanismFeedback: mentionsMechanism
      ? "Included relevant particle mechanisms (e.g., movement of charge, disruption of rows, or interlayer forces)."
      : "Explain how the particle structure produces the observable property at a microscopic level.",
    useJustificationFeedback: mentionsUseComparison
      ? "Included comparison of material behaviour in practical applications."
      : "Strengthen your evaluation by explaining why an alternative material would fail in this specific use.",
    howToLevelUp,
    exemplarImprovements: "Review the model answer to compare how formal NZQA terminology is woven into each argument.",
    isSimulated: true,
  };
}
