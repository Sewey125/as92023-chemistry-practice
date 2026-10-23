import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { PRACTICE_QUESTIONS, ExamQuestion } from "@/data/questions";

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

    // Try models in order of speed and stability
    const candidateModels = ["gemini-2.0-flash", "gemini-1.5-flash"];
    let lastError: any = null;
    let responseText = "";

    for (const modelName of candidateModels) {
      try {
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Request timeout")), 16000)
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
        continue;
      }
    }

    if (!responseText) {
      const errMsg = lastError?.message || "Google Gemini API did not return a response.";
      console.error("Gemini API call failed for provided key:", errMsg);
      return NextResponse.json(
        {
          error: `Google Gemini AI Error: ${errMsg}. Please test your key at aistudio.google.com/app/apikey or click 'Grade Offline' below to use the built-in NZQA engine.`,
        },
        { status: 400 }
      );
    }

    try {
      const parsedData = JSON.parse(responseText);
      return NextResponse.json({
        ...parsedData,
        isSimulated: false,
      });
    } catch (parseError) {
      console.error("Failed to parse Gemini response as JSON:", parseError);
      return NextResponse.json(
        {
          error: "Gemini AI returned a response, but it could not be parsed as structured JSON. Please click retry or grade offline.",
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Evaluation route fatal error:", error);
    return NextResponse.json(
      {
        error: error?.message || "Failed to evaluate answer. Please verify your Gemini API key or click Grade Offline.",
      },
      { status: 500 }
    );
  }
}

// Deep, question-aware heuristic evaluator for offline/fallback mode
function generateSimulatedEvaluation(studentAnswer: string, question: ExamQuestion): EvaluationResult {
  const text = studentAnswer.toLowerCase();

  // General scientific checks
  const mentionsParticles =
    text.includes("particle") ||
    text.includes("atom") ||
    text.includes("ion") ||
    text.includes("cation") ||
    text.includes("anion") ||
    text.includes("electron") ||
    text.includes("molecule") ||
    text.includes("monomer") ||
    text.includes("chain");

  const mentionsForces =
    text.includes("bonding") ||
    text.includes("metallic bond") ||
    text.includes("ionic bond") ||
    text.includes("covalent bond") ||
    text.includes("intermolecular") ||
    text.includes("electrostatic") ||
    text.includes("attractive force") ||
    text.includes("imf");

  const mentionsMechanism =
    text.includes("delocalised") ||
    text.includes("slide") ||
    text.includes("disrupt") ||
    text.includes("3d network") ||
    text.includes("hydrate") ||
    text.includes("polar") ||
    text.includes("branch") ||
    text.includes("layer") ||
    text.includes("cleavage") ||
    text.includes("repel");

  const mentionsUseComparison =
    (text.includes("because") || text.includes("therefore") || text.includes("so that")) &&
    (text.includes("fail") ||
      text.includes("unsuitable") ||
      text.includes("instead") ||
      text.includes("corrosion") ||
      text.includes("buoyant") ||
      text.includes("float") ||
      text.includes("crack") ||
      text.includes("fatigue") ||
      text.includes("bend") ||
      text.includes("shatter"));

  // Vague word detection
  const vagueWords: string[] = [];
  if (text.includes("strong bond")) {
    vagueWords.push("You wrote 'strong bond' without specifying the electrostatic nature (e.g. non-directional metallic bonding, ionic bonding between oppositely charged ions, or continuous covalent bonding).");
  }
  if (text.match(/\bstrong\b/) && !mentionsForces) {
    vagueWords.push("You described the material as 'strong' without naming the particles or attractive forces that resist tensile stress.");
  }
  if (text.match(/\blight\b/) && !text.includes("density")) {
    vagueWords.push("You stated the material is 'light'. NZQA examiners strictly look for the property of 'low density' (low mass per unit volume).");
  }
  if (text.match(/\bhard\b/) && !mentionsParticles) {
    vagueWords.push("You stated the material is 'hard' without explaining how continuous rigid bonding resists scratching and surface deformation.");
  }

  // Question-specific material checks
  const materialsFound: string[] = [];
  question.materials.forEach((mat) => {
    const simplified = mat.toLowerCase().split(" ")[0].replace(/[^a-z]/g, "");
    if (text.includes(simplified)) {
      materialsFound.push(mat);
    }
  });

  // Evaluate each official criterion
  const criteriaBreakdown: CriterionEvaluation[] = [];

  // Achieved criteria
  let achievedMetCount = 0;
  question.criteria.achieved.forEach((crit) => {
    const critLower = crit.toLowerCase();
    const hasMatch =
      (critLower.includes("define") && (text.includes("repeating") || text.includes("monomer") || text.includes("many units"))) ||
      (critLower.includes("covalent network") && text.includes("covalent network")) ||
      (critLower.includes("metallic") && (text.includes("metal") || text.includes("metallic"))) ||
      (critLower.includes("ionic") && (text.includes("ionic") || text.includes("ion"))) ||
      (critLower.includes("density") && text.includes("density")) ||
      (critLower.includes("property") && mentionsForces);

    if (hasMatch) {
      achievedMetCount++;
      criteriaBreakdown.push({
        criterion: crit,
        tier: "Achieved",
        status: "met",
        feedback: "Satisfied: Key terminology and classifications were correctly identified in your response.",
      });
    } else if (mentionsParticles || materialsFound.length > 0) {
      criteriaBreakdown.push({
        criterion: crit,
        tier: "Achieved",
        status: "partial",
        feedback: "Partially addressed: Stated basic properties but needs more formal classification terms.",
      });
    } else {
      criteriaBreakdown.push({
        criterion: crit,
        tier: "Achieved",
        status: "not_met",
        feedback: "Not yet met: Explicitly state the classification and fundamental definitions required.",
      });
    }
  });

  // Merit criteria
  let meritMetCount = 0;
  question.criteria.merit.forEach((crit) => {
    const critLower = crit.toLowerCase();
    const hasMechanismMatch =
      (critLower.includes("branch") && text.includes("branch")) ||
      (critLower.includes("slide") && (text.includes("slide") || text.includes("layers"))) ||
      (critLower.includes("disrupt") && (text.includes("disrupt") || text.includes("distort") || text.includes("size"))) ||
      (critLower.includes("polar") && (text.includes("polar") || text.includes("dipole") || text.includes("hydrate"))) ||
      (critLower.includes("delocalised") && text.includes("delocalised")) ||
      (mentionsMechanism && mentionsForces);

    if (hasMechanismMatch && mentionsParticles) {
      meritMetCount++;
      criteriaBreakdown.push({
        criterion: crit,
        tier: "Merit",
        status: "met",
        feedback: "Satisfied: Successfully explained the step-by-step microscopic mechanism linking structure to property.",
      });
    } else if (mentionsParticles && mentionsForces) {
      criteriaBreakdown.push({
        criterion: crit,
        tier: "Merit",
        status: "partial",
        feedback: "Partially addressed: Named the forces, but explain the exact physical mechanism (e.g. how layers slide, or why branching prevents packing).",
      });
    } else {
      criteriaBreakdown.push({
        criterion: crit,
        tier: "Merit",
        status: "not_met",
        feedback: "Not yet met: Connect the particles and attractive forces directly to the physical mechanism causing the property.",
      });
    }
  });

  // Excellence criteria
  let excellenceMetCount = 0;
  question.criteria.excellence.forEach((crit) => {
    const hasExcellenceMatch =
      mentionsUseComparison &&
      studentAnswer.length > 350 &&
      meritMetCount > 0 &&
      (text.includes("fail") || text.includes("alternative") || text.includes("fatigue") || text.includes("corrosion") || text.includes("buoyant"));

    if (hasExcellenceMatch) {
      excellenceMetCount++;
      criteriaBreakdown.push({
        criterion: crit,
        tier: "Excellence",
        status: "met",
        feedback: "Satisfied: Thoroughly evaluated practical operational performance, trade-offs, and alternative material failure modes.",
      });
    } else if (mentionsUseComparison || studentAnswer.length > 250) {
      criteriaBreakdown.push({
        criterion: crit,
        tier: "Excellence",
        status: "partial",
        feedback: "Partially addressed: Discussed the application, but must critically evaluate why an alternative material would fail under operating conditions.",
      });
    } else {
      criteriaBreakdown.push({
        criterion: crit,
        tier: "Excellence",
        status: "not_met",
        feedback: "Not yet met: Provide a comprehensive comparison evaluating trade-offs and structural failure reasons in the given context.",
      });
    }
  });

  // Grade decision logic
  let grade: EvaluationResult["grade"] = "Not Achieved";
  let scoreSummary = "Your response demonstrates basic awareness of the scenario but lacks structured scientific links between particles, attractive forces, and operational use.";
  let howToLevelUp = "Begin by identifying the material classification and naming the constituent particles held together by attractive forces.";

  if (excellenceMetCount > 0 && meritMetCount > 0 && studentAnswer.length > 350) {
    grade = "Excellence";
    scoreSummary = `Excellence demonstrated. Your response provides an in-depth, comprehensive evaluation of ${question.materials.join(" and ")}, connecting constituent particles and bonding mechanisms directly to operational performance and failure modes.`;
    howToLevelUp = "You have demonstrated Excellence level understanding. Review the model answer below to ensure your phrasing is as concise and scientifically rigorous as possible.";
  } else if (meritMetCount > 0 && achievedMetCount > 0) {
    grade = "Merit";
    scoreSummary = `Merit achieved. You successfully explained the particle-level mechanisms for ${question.materials.join(" and ")}, clearly connecting atomic/molecular structure to observed physical properties.`;
    howToLevelUp = "To advance to Excellence: Comprehensively evaluate the real-world operational context. Explain why an alternative material would be completely unsuitable or fail under operating conditions (e.g. fatigue, fracture, or corrosion).";
  } else if (achievedMetCount > 0 || (mentionsParticles && mentionsForces)) {
    grade = "Achieved";
    scoreSummary = `Achieved demonstrated. You correctly identified relevant physical properties and basic particle or bonding types for ${question.materials.join(" and ")}.`;
    howToLevelUp = "To advance to Merit: Provide the detailed microscopic mechanism explaining WHY the property occurs (e.g. explain how layers of ions or atoms slide or repel, or how polymer branching prevents chains from packing closely).";
  }

  // Question-specific detailed critique
  const detailedCritique = `In this assessment on "${question.title}", the examiner looks for systematic application of the SPAC framework across both ${question.materials.join(" and ")}. 

Your response ${materialsFound.length > 0 ? `addressed ${materialsFound.join(" and ")}` : "did not clearly distinguish between the specified materials"}. ${
    mentionsParticles
      ? "You identified constituent particles, which establishes the required scientific foundation."
      : "You did not explicitly name the constituent particles (atoms, cations, anions, delocalised electrons, or molecules) forming the 3D network or molecular units."
  } ${
    mentionsForces
      ? "You referenced the attractive forces/bonding acting between particles."
      : "You omitted the specific electrostatic forces of attraction holding the structure together."
  }

${
  grade === "Excellence"
    ? "Your answer stands out because it integrates practical operational demands, evaluating why these materials perform under stress and comparing them against alternative failure modes."
    : grade === "Merit"
    ? "To move from Merit to Excellence, deepen your evaluation of the practical context: explain why an alternative material would fail under real conditions (e.g., deformation under load, water absorption, or brittle fracture)."
    : "To advance from Achieved to Merit, focus on the causal mechanism: do not just state what the property is, but explain step-by-step how the particle arrangement and bonding cause that property."
}`;

  const particleAndBondingFeedback = mentionsParticles && mentionsForces
    ? `Strong recognition of particles and attractive forces. You referenced ${
        text.includes("ion") ? "ions and ionic bonding, " : ""
      }${text.includes("electron") ? "delocalised valence electrons, " : ""}${
        text.includes("covalent") ? "covalent bonding in network/molecules, " : ""
      }${text.includes("polymer") ? "polymer chains and intermolecular forces. " : "the constituent particles in the 3D network. "}Ensure you always specify whether particles are atoms, cations, anions, molecules, or delocalised electrons for EACH material.`
    : `NZQA examiners require explicit identification of both the particles and the attractive forces for each material: ${question.materials.join(
        " and "
      )}. For example, specify whether the material consists of metal cations in a 3D network with delocalised electrons, ions held by ionic bonds, or polymer chains held by weak intermolecular forces.`;

  const mechanismFeedback = mentionsMechanism
    ? `You included microscopic mechanical explanation. For Merit and Excellence, ensure you trace the complete causal sequence: particle arrangement -> applied stress or condition -> response of particles -> observable macroscopic property.`
    : `Missing microscopic causal mechanism. Explain the step-by-step science: for metals, explain how non-directional bonding allows layers of cations to slide; for polymers (LDPE), explain how irregular side-chain branching prevents close packing of chains, leaving empty space and producing low density; for covalent networks, explain how rigid directional covalent bonds throughout the 3D network resist deformation.`;

  const useJustificationFeedback = mentionsUseComparison
    ? `Good context evaluation. You connected material properties directly to the application in ${question.title}. For full Excellence, explicitly analyze failure modes: explain what would happen if an unsuitable alternative material were used instead.`
    : `Incomplete application evaluation. Connect the physical property directly to the scenario: explain why low density ensures buoyancy in water, why hardness prevents hull abrasion on rocks, or why malleability enables shaping into tubes without fracture.`;

  return {
    grade,
    scoreSummary,
    detailedCritique,
    criteriaBreakdown,
    keyStrengths: [
      mentionsParticles ? "Correctly identified constituent particles in the material structure." : "Demonstrated awareness of the practical scenario.",
      mentionsForces ? "Referenced attractive forces/bonding holding particles together." : "Identified key physical properties.",
      materialsFound.length > 0 ? `Directly referenced scenario materials: ${materialsFound.join(", ")}.` : "Attempted to address the question prompt.",
    ],
    areasForImprovement: [
      !mentionsMechanism ? "Detail the microscopic mechanism (e.g. layer sliding, like-charge repulsion, or branch packing)." : "Deepen operational trade-off analysis.",
      !mentionsUseComparison ? "Evaluate why an alternative material would fail under operational conditions." : "Eliminate any informal or vague terminology.",
    ],
    vagueLanguageWarnings: vagueWords,
    particleAndBondingFeedback,
    mechanismFeedback,
    useJustificationFeedback,
    howToLevelUp,
    exemplarImprovements: `To achieve Excellence: Structure your answer using the SPAC formula. Compare the performance against an alternative material and integrate specific data from the scenario table.`,
    isSimulated: true,
  };
}
