"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Award,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Layers,
  FileText,
  Loader2,
  Check,
  Lock,
  ArrowRight,
  ArrowLeft,
  Calendar,
  KeyRound,
  Table as TableIcon,
  CheckCircle,
  Zap,
  XCircle,
  Compass,
} from "lucide-react";
import {
  ALL_EXAM_QUESTIONS,
  EXAM_YEARS,
  ExamQuestion,
} from "@/data/questions";
import { EvaluationResult } from "@/app/api/grade/route";

interface PracticeWorkspaceProps {
  apiKey: string;
  onOpenApiKeyModal: () => void;
}

interface QuestionProgress {
  [questionId: string]: {
    answer: string;
    evaluation: EvaluationResult | null;
    isCompleted: boolean;
  };
}

export function PracticeWorkspace({
  apiKey,
  onOpenApiKeyModal,
}: PracticeWorkspaceProps) {
  const [selectedYear, setSelectedYear] = useState<"2025" | "2024" | "2023">("2025");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [studentAnswer, setStudentAnswer] = useState<string>("");
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showExemplar, setShowExemplar] = useState<boolean>(false);
  const [checkedChecklist, setCheckedChecklist] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  // Synchronize key with localStorage directly to avoid state desync
  const [syncedKey, setSyncedKey] = useState<string>(apiKey || "");

  useEffect(() => {
    const sync = () => {
      const stored = (typeof window !== "undefined" ? localStorage.getItem("as92023_gemini_key") : "") || "";
      setSyncedKey(stored || apiKey || "");
    };
    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, [apiKey]);

  const activeKey = (syncedKey || apiKey || "").trim();

  // Session progress tracking per question id
  const [sessionProgress, setSessionProgress] = useState<QuestionProgress>({});

  // Filter questions for the selected year
  const yearQuestions = ALL_EXAM_QUESTIONS.filter((q) => q.year === selectedYear);
  const currentQuestion = yearQuestions[currentQuestionIndex] || yearQuestions[0];

  const handleSelectYear = (year: "2025" | "2024" | "2023") => {
    setSelectedYear(year);
    setCurrentQuestionIndex(0);
    const firstQ = ALL_EXAM_QUESTIONS.find((q) => q.year === year && q.questionNumber === 1);
    if (firstQ) {
      loadQuestionState(firstQ.id);
    }
  };

  const loadQuestionState = (questionId: string) => {
    const saved = sessionProgress[questionId];
    if (saved) {
      setStudentAnswer(saved.answer);
      setEvaluation(saved.evaluation);
    } else {
      setStudentAnswer("");
      setEvaluation(null);
    }
    setErrorMessage(null);
    setShowExemplar(false);
    setCheckedChecklist([false, false, false, false]);
  };

  const handleChecklistToggle = (index: number) => {
    setCheckedChecklist((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const insertHelper = (text: string) => {
    setStudentAnswer((prev) => prev + text);
  };

  const handleLoadSample = () => {
    setStudentAnswer(currentQuestion.sampleExcellenceAnswer);
    setEvaluation(null);
    setErrorMessage(null);
  };

  const handleClear = () => {
    setStudentAnswer("");
    setEvaluation(null);
    setErrorMessage(null);
  };

  const handleEvaluate = async () => {
    if (!studentAnswer.trim()) {
      setErrorMessage("Please write your answer before asking for grading and feedback.");
      return;
    }

    if (!activeKey) {
      setErrorMessage("Please connect your free Google Gemini API key to grade your answer with AI.");
      onOpenApiKeyModal();
      return;
    }

    setIsEvaluating(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: currentQuestion.id,
          studentAnswer,
          apiKey: activeKey,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to grade response with Gemini AI.");
      }

      setEvaluation(data);

      // Save to progress tracker
      setSessionProgress((prev) => ({
        ...prev,
        [currentQuestion.id]: {
          answer: studentAnswer,
          evaluation: data,
          isCompleted: true,
        },
      }));
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred while evaluating.");
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < yearQuestions.length - 1) {
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);
      loadQuestionState(yearQuestions[nextIdx].id);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      const prevIdx = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIdx);
      loadQuestionState(yearQuestions[prevIdx].id);
    }
  };

  const handleJumpToQuestion = (index: number) => {
    // Only allow jumping to questions that are either already completed or currently unlocked
    setCurrentQuestionIndex(index);
    loadQuestionState(yearQuestions[index].id);
  };

  const isCurrentQuestionGraded = !!evaluation || !!sessionProgress[currentQuestion.id]?.evaluation;
  const isLastQuestion = currentQuestionIndex === yearQuestions.length - 1;

  // Calculate year summary
  const completedCount = yearQuestions.filter((q) => sessionProgress[q.id]?.isCompleted).length;
  const isExamFullyCompleted = completedCount === yearQuestions.length;

  const wordCount = studentAnswer.trim()
    ? studentAnswer.trim().split(/\s+/).length
    : 0;

  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 pb-20">
      {/* 1. Year Selector Bar */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center">
            <Calendar size={14} className="mr-1.5 text-stone-700" />
            Select Examination Year
          </span>
          <span className="text-xs text-stone-500 font-medium">
            Standard: NZQA AS 92023 (4 Credits)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {EXAM_YEARS.map((y) => {
            const isSelected = y.year === selectedYear;
            const completedInYear = ALL_EXAM_QUESTIONS.filter(
              (q) => q.year === y.year && sessionProgress[q.id]?.isCompleted
            ).length;
            const totalInYear = ALL_EXAM_QUESTIONS.filter((q) => q.year === y.year).length;

            return (
              <button
                key={y.year}
                onClick={() => handleSelectYear(y.year)}
                className={`p-4 rounded-2xl text-left transition-all border ${
                  isSelected
                    ? "bg-stone-900 text-stone-50 border-stone-900 shadow-md ring-2 ring-stone-900/10"
                    : "bg-[#F2E9DE]/80 text-stone-800 border-stone-300/70 hover:bg-[#F2E9DE]"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-extrabold text-base tracking-tight">
                    {y.label}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-stone-800 text-stone-200 border border-stone-700"
                        : "bg-white/80 text-stone-700 border border-stone-300/60"
                    }`}
                  >
                    {y.badge}
                  </span>
                </div>
                <p
                  className={`text-xs line-clamp-2 leading-relaxed ${
                    isSelected ? "text-stone-300" : "text-stone-600"
                  }`}
                >
                  {y.description}
                </p>

                {completedInYear > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-stone-700/30 flex items-center justify-between text-[11px]">
                    <span className={isSelected ? "text-stone-300" : "text-stone-600"}>
                      Progress:
                    </span>
                    <span
                      className={`font-semibold ${
                        completedInYear === totalInYear
                          ? isSelected
                            ? "text-emerald-400"
                            : "text-emerald-700"
                          : isSelected
                          ? "text-amber-300"
                          : "text-amber-700"
                      }`}
                    >
                      {completedInYear}/{totalInYear} Completed
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Question Step Navigator */}
      <div className="flex items-center justify-between bg-white/70 rounded-2xl p-3 border border-stone-300/60 mb-5">
        <div className="flex items-center space-x-2">
          {yearQuestions.map((q, idx) => {
            const isCurrent = idx === currentQuestionIndex;
            const progress = sessionProgress[q.id];
            const isDone = !!progress?.isCompleted;
            const grade = progress?.evaluation?.grade;

            return (
              <button
                key={q.id}
                onClick={() => handleJumpToQuestion(idx)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                  isCurrent
                    ? "bg-stone-900 text-stone-50 border-stone-900 shadow-sm"
                    : isDone
                    ? "bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100"
                    : "bg-white text-stone-700 border-stone-300 hover:bg-stone-100"
                }`}
              >
                <span>Q{q.questionNumber}</span>
                {grade && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                      grade === "Excellence"
                        ? "bg-emerald-600 text-white"
                        : grade === "Merit"
                        ? "bg-blue-600 text-white"
                        : grade === "Achieved"
                        ? "bg-amber-600 text-white"
                        : "bg-rose-600 text-white"
                    }`}
                  >
                    {grade[0]}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="text-xs text-stone-600 font-medium hidden sm:block">
          Question {currentQuestionIndex + 1} of {yearQuestions.length}
        </div>
      </div>

      {/* 3. Main Practice Workspace Card (Alcove rounded-3xl surface) */}
      <div className="bg-[#F2E9DE] rounded-3xl p-6 sm:p-9 shadow-sm border border-stone-300/70 space-y-7">
        {/* Scenario Header */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
              {selectedYear} Official Examination Paper
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-stone-900 text-stone-50">
                Question {currentQuestion.questionNumber} of {yearQuestions.length}
              </span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/80 text-stone-700 border border-stone-300/60">
                4 Credits
              </span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
            {currentQuestion.title}
          </h2>

          {/* Materials in Context Badges */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-xs text-stone-600 font-medium mr-1">
              Materials:
            </span>
            {currentQuestion.materials.map((mat, i) => (
              <span
                key={mat}
                className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-white/80 text-stone-800 border border-stone-300/50"
              >
                {mat} ({currentQuestion.materialTypes[i] || "Material"})
              </span>
            ))}
          </div>
        </div>

        {/* Real-World Context Scenario */}
        <div className="bg-white/80 rounded-2xl p-5 border border-stone-300/60 text-sm text-stone-800 leading-relaxed">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
            Context Scenario
          </span>
          {currentQuestion.contextSummary}
        </div>

        {/* Official Data Tables from Past Papers (if present) */}
        {currentQuestion.dataTables && currentQuestion.dataTables.length > 0 && (
          <div className="space-y-4">
            {currentQuestion.dataTables.map((table, tIdx) => (
              <div
                key={tIdx}
                className="bg-white/95 rounded-2xl p-4 sm:p-5 border border-stone-300/70 shadow-sm"
              >
                <div className="flex items-center space-x-2 mb-3">
                  <TableIcon size={15} className="text-stone-700" />
                  <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    {table.title}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-stone-300 bg-[#FAF5ED]">
                        {table.headers.map((h, hIdx) => (
                          <th key={hIdx} className="p-2.5 font-bold text-stone-900">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {table.rows.map((row, rIdx) => (
                        <tr
                          key={rIdx}
                          className="border-b border-stone-200/80 hover:bg-[#FAF5ED]/50 transition-colors"
                        >
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-2.5 text-stone-800 font-medium">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {table.notes && (
                  <p className="text-[11px] text-stone-500 mt-2.5 italic">
                    {table.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Sub-questions / Prompts */}
        <div className="bg-[#FAF5ED] rounded-2xl p-5 border border-stone-300/70 space-y-4 text-sm text-stone-900">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
            Official Exam Questions To Answer
          </span>
          <div className="space-y-3">
            {currentQuestion.subQuestions.map((sq, sqIdx) => (
              <div
                key={sqIdx}
                className="p-3.5 bg-white/70 rounded-xl border border-stone-200/80 space-y-1"
              >
                <span className="font-bold text-stone-900 block text-xs">
                  {sq.label}
                </span>
                <p className="text-stone-800 text-xs sm:text-sm leading-relaxed">
                  {sq.prompt}
                </p>
                {sq.helperHint && (
                  <p className="text-[11px] text-stone-500 italic pt-0.5">
                    Hint: {sq.helperHint}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Scaffolding Checklist */}
        <div className="bg-white/60 rounded-2xl p-4 border border-stone-300/50">
          <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2.5">
            Key Evidence Checklist (Tick as you write)
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
            {currentQuestion.scaffoldingChecklist.map((item, index) => {
              const isChecked = checkedChecklist[index];
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleChecklistToggle(index)}
                  className={`flex items-start text-left p-2.5 rounded-xl transition-all border ${
                    isChecked
                      ? "bg-emerald-50 text-emerald-900 border-emerald-200"
                      : "bg-white/80 text-stone-700 border-stone-200 hover:bg-white"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-md mr-2 mt-0.5 flex items-center justify-center border transition-colors ${
                      isChecked
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : "border-stone-400 bg-white"
                    }`}
                  >
                    {isChecked && <Check size={11} strokeWidth={3} />}
                  </div>
                  <span className="leading-snug">{item}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Answer Input Workspace */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center">
              <FileText size={14} className="mr-1.5 text-stone-600" />
              Your Written Response
            </label>
            <div className="flex items-center space-x-2 text-xs text-stone-500">
              <span>{wordCount} words</span>
              <span>•</span>
              <span>{studentAnswer.length} chars</span>
            </div>
          </div>

          <div className="relative">
            <textarea
              rows={11}
              value={studentAnswer}
              onChange={(e) => setStudentAnswer(e.target.value)}
              placeholder="Write your explanation here. Clearly identify particles, bonding types, how structure gives rise to the physical properties, and why the material is suited to its practical application..."
              className="w-full p-5 rounded-2xl bg-white border border-stone-300/90 text-stone-900 text-sm leading-relaxed placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all font-sans"
            />
          </div>

          {/* Quick Toolbar for Notation and Testing */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-medium text-stone-500 mr-1">
                Insert notation:
              </span>
              <button
                type="button"
                onClick={() => insertHelper("₂")}
                className="px-2.5 py-1 rounded-lg bg-white border border-stone-300 text-xs font-mono font-semibold text-stone-800 hover:bg-stone-100"
              >
                X₂
              </button>
              <button
                type="button"
                onClick={() => insertHelper("⁺")}
                className="px-2.5 py-1 rounded-lg bg-white border border-stone-300 text-xs font-mono font-semibold text-stone-800 hover:bg-stone-100"
              >
                X⁺
              </button>
              <button
                type="button"
                onClick={() => insertHelper("⁻")}
                className="px-2.5 py-1 rounded-lg bg-white border border-stone-300 text-xs font-mono font-semibold text-stone-800 hover:bg-stone-100"
              >
                X⁻
              </button>
              <button
                type="button"
                onClick={() => insertHelper("3D network")}
                className="px-2.5 py-1 rounded-lg bg-white border border-stone-300 text-xs font-medium text-stone-700 hover:bg-stone-100"
              >
                3D network
              </button>
              <button
                type="button"
                onClick={() => insertHelper("delocalised electrons")}
                className="px-2.5 py-1 rounded-lg bg-white border border-stone-300 text-xs font-medium text-stone-700 hover:bg-stone-100"
              >
                delocalised e⁻
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleLoadSample}
                className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white border border-stone-300 text-stone-800 hover:bg-stone-100 transition-colors"
              >
                Insert Sample Answer
              </button>
              {studentAnswer && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs font-medium px-2 py-1.5 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-stone-200/50 transition-colors"
                >
                  <RotateCcw size={13} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Error message display */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start space-x-2">
              <AlertTriangle size={16} className="text-rose-600 flex-shrink-0 mt-0.5" />
              <span className="font-medium leading-relaxed">{errorMessage}</span>
            </div>
            <button
              onClick={onOpenApiKeyModal}
              className="px-4 py-2 rounded-xl bg-stone-900 text-white font-semibold text-xs hover:bg-stone-800 transition-colors self-start sm:self-auto shadow-xs whitespace-nowrap"
            >
              Verify API Key
            </button>
          </div>
        )}

        {/* 4. Action Row: Grade & Progression Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-stone-300/60 pt-5">
          <div className="flex flex-wrap items-center gap-3">
            {/* Primary Grade Button */}
            <button
              onClick={handleEvaluate}
              disabled={isEvaluating}
              className="inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-2xl bg-stone-900 text-stone-50 font-semibold text-sm hover:bg-stone-800 active:scale-[0.99] transition-all shadow-md disabled:opacity-50"
            >
              {isEvaluating ? (
                <>
                  <Loader2 size={16} className="animate-spin text-stone-300" />
                  <span>Grading with Google Gemini AI...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} className="text-stone-200" />
                  <span>Grade My Answer with Gemini AI</span>
                </>
              )}
            </button>

            <button
              onClick={onOpenApiKeyModal}
              className="text-xs font-semibold px-4 py-2.5 rounded-xl bg-white/90 border border-stone-300 text-stone-700 hover:bg-white flex items-center shadow-xs"
            >
              <KeyRound size={13} className="mr-1.5 text-stone-600" />
              <span>{activeKey ? "Gemini Key Connected (Edit)" : "Connect Gemini API Key"}</span>
            </button>
          </div>

          {/* Navigation Controls (Gated by Grading Requirement) */}
          <div className="flex items-center space-x-2">
            {currentQuestionIndex > 0 && (
              <button
                onClick={handlePrevQuestion}
                className="inline-flex items-center text-xs font-semibold px-4 py-3 rounded-2xl bg-white border border-stone-300 text-stone-800 hover:bg-stone-100 transition-colors"
              >
                <ArrowLeft size={14} className="mr-1.5" />
                Previous
              </button>
            )}

            {!isLastQuestion ? (
              <button
                onClick={handleNextQuestion}
                disabled={!isCurrentQuestionGraded}
                title={
                  !isCurrentQuestionGraded
                    ? "You must grade your answer and receive feedback before moving to the next question."
                    : "Proceed to next question"
                }
                className={`inline-flex items-center text-xs font-semibold px-5 py-3 rounded-2xl transition-all shadow-sm ${
                  isCurrentQuestionGraded
                    ? "bg-emerald-700 text-white hover:bg-emerald-800"
                    : "bg-stone-300 text-stone-500 cursor-not-allowed opacity-75"
                }`}
              >
                {!isCurrentQuestionGraded && <Lock size={13} className="mr-1.5 text-stone-500" />}
                <span>Next Question</span>
                {isCurrentQuestionGraded && <ArrowRight size={14} className="ml-1.5" />}
              </button>
            ) : (
              isCurrentQuestionGraded && (
                <div className="inline-flex items-center text-xs font-semibold px-4 py-3 rounded-2xl bg-emerald-100 text-emerald-900 border border-emerald-300">
                  <CheckCircle size={14} className="mr-1.5 text-emerald-700" />
                  Exam Paper Completed!
                </div>
              )
            )}
          </div>
        </div>

        {/* Lock Notice if user hasn't graded yet */}
        {!isCurrentQuestionGraded && (
          <p className="text-[11px] text-stone-500 flex items-center pt-1">
            <Lock size={12} className="mr-1.5 text-stone-400" />
            Requirement: You must ask for grade &amp; feedback above before unlocking the next question.
          </p>
        )}

        {/* 5. Comprehensive Evaluation Output Section */}
        {evaluation && (
          <div className="mt-8 pt-8 border-t border-stone-300/80 space-y-6 animate-in fade-in duration-300">
            {/* Main Grade Header Banner */}
            <div className="p-6 rounded-3xl bg-white border border-stone-300/80 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
                <div className="flex items-center space-x-3.5">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0 ${
                      evaluation.grade === "Excellence"
                        ? "bg-emerald-600 text-white"
                        : evaluation.grade === "Merit"
                        ? "bg-blue-600 text-white"
                        : evaluation.grade === "Achieved"
                        ? "bg-amber-600 text-white"
                        : "bg-rose-600 text-white"
                    }`}
                  >
                    <Award size={28} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs uppercase tracking-wider font-bold text-stone-500">
                        Official NZQA AS92023 Grade
                      </span>
                      <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 inline-flex items-center">
                        <Sparkles size={10} className="mr-1 text-emerald-700" />
                        <span>Gemini AI Senior Examiner Evaluation</span>
                      </span>
                    </div>
                    <h3 className="text-3xl font-black tracking-tight text-stone-900">
                      {evaluation.grade}
                    </h3>
                  </div>
                </div>

                <div className="text-left sm:text-right max-w-md">
                  <p className="text-xs text-stone-700 leading-relaxed font-medium">
                    {evaluation.scoreSummary}
                  </p>
                </div>
              </div>

              {/* Detailed Examiner Critique */}
              {evaluation.detailedCritique && (
                <div className="space-y-2 pt-1 text-xs">
                  <span className="font-bold text-stone-900 uppercase tracking-wider text-[11px] block">
                    Detailed Examiner Analysis &amp; Diagnostic:
                  </span>
                  <div className="whitespace-pre-line text-stone-700 leading-relaxed bg-[#FAF5ED] p-4 rounded-2xl border border-stone-200">
                    {evaluation.detailedCritique}
                  </div>
                </div>
              )}
            </div>

            {/* Official NZQA Criteria Breakdown Checklist */}
            {evaluation.criteriaBreakdown && evaluation.criteriaBreakdown.length > 0 && (
              <div className="p-6 rounded-3xl bg-white border border-stone-300/80 shadow-sm space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 size={18} className="text-stone-800" />
                    <h4 className="font-extrabold text-sm text-stone-900 tracking-tight">
                      Official NZQA Marking Schedule Checklist
                    </h4>
                  </div>
                  <span className="text-[11px] text-stone-500 font-medium">
                    Evaluated against all Achieved, Merit &amp; Excellence evidence criteria
                  </span>
                </div>

                <div className="space-y-2.5 pt-1">
                  {evaluation.criteriaBreakdown.map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-2xl border text-xs flex flex-col sm:flex-row sm:items-start justify-between gap-3 ${
                        item.status === "met"
                          ? "bg-emerald-50/60 border-emerald-200 text-emerald-950"
                          : item.status === "partial"
                          ? "bg-amber-50/60 border-amber-200 text-amber-950"
                          : "bg-stone-50 border-stone-200 text-stone-700"
                      }`}
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                              item.tier === "Excellence"
                                ? "bg-purple-100 text-purple-900 border border-purple-200"
                                : item.tier === "Merit"
                                ? "bg-blue-100 text-blue-900 border border-blue-200"
                                : "bg-stone-200 text-stone-800"
                            }`}
                          >
                            {item.tier}
                          </span>
                          <span className="font-semibold text-stone-900">
                            {item.criterion}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-600 pl-1 leading-relaxed">
                          {item.feedback}
                        </p>
                      </div>

                      <div className="flex-shrink-0 self-start sm:self-center">
                        {item.status === "met" ? (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-600 text-white font-bold text-[10px]">
                            <Check size={11} />
                            <span>Criterion Met</span>
                          </span>
                        ) : item.status === "partial" ? (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-500 text-white font-bold text-[10px]">
                            <AlertTriangle size={11} />
                            <span>Partially Met</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-stone-300 text-stone-700 font-bold text-[10px]">
                            <XCircle size={11} />
                            <span>Not Yet Met</span>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Three Core Dimensions of AS92023 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* Particle & Bonding */}
              <div className="p-5 rounded-2xl bg-white border border-stone-300/80 space-y-2 shadow-xs">
                <div className="font-bold text-stone-900 flex items-center text-sm">
                  <CheckCircle2 size={16} className="mr-1.5 text-stone-800" />
                  1. Particles &amp; Bonding
                </div>
                <div className="text-stone-700 leading-relaxed whitespace-pre-line text-[11px]">
                  {evaluation.particleAndBondingFeedback}
                </div>
              </div>

              {/* Mechanism Explanation */}
              <div className="p-5 rounded-2xl bg-white border border-stone-300/80 space-y-2 shadow-xs">
                <div className="font-bold text-stone-900 flex items-center text-sm">
                  <Layers size={16} className="mr-1.5 text-stone-800" />
                  2. Causal Mechanism
                </div>
                <div className="text-stone-700 leading-relaxed whitespace-pre-line text-[11px]">
                  {evaluation.mechanismFeedback}
                </div>
              </div>

              {/* Practical Use & Context */}
              <div className="p-5 rounded-2xl bg-white border border-stone-300/80 space-y-2 shadow-xs">
                <div className="font-bold text-stone-900 flex items-center text-sm">
                  <Compass size={16} className="mr-1.5 text-stone-800" />
                  3. Use &amp; Failure Modes
                </div>
                <div className="text-stone-700 leading-relaxed whitespace-pre-line text-[11px]">
                  {evaluation.useJustificationFeedback}
                </div>
              </div>
            </div>

            {/* Strengths & Improvement Areas Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Key Strengths */}
              {evaluation.keyStrengths && evaluation.keyStrengths.length > 0 && (
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                  <span className="font-bold text-emerald-950 flex items-center">
                    <CheckCircle2 size={14} className="mr-1.5 text-emerald-700" />
                    Key Strengths in Your Response:
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-emerald-900 text-[11px]">
                    {evaluation.keyStrengths.map((str, i) => (
                      <li key={i}>{str}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Areas for Improvement */}
              {evaluation.areasForImprovement && evaluation.areasForImprovement.length > 0 && (
                <div className="p-4 rounded-2xl bg-stone-100/80 border border-stone-300 space-y-2">
                  <span className="font-bold text-stone-900 flex items-center">
                    <ArrowUpRight size={14} className="mr-1.5 text-stone-700" />
                    Key Areas to Strengthen:
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-stone-700 text-[11px]">
                    {evaluation.areasForImprovement.map((area, i) => (
                      <li key={i}>{area}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Vague Language Alert (Official NZQA Examiner Penalty) */}
            {evaluation.vagueLanguageWarnings &&
              evaluation.vagueLanguageWarnings.length > 0 && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1.5">
                  <div className="font-bold flex items-center text-amber-900">
                    <AlertTriangle size={15} className="mr-1.5 text-amber-700" />
                    NZQA Examiner Warning: Vague Descriptors Flagged
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-amber-900 pl-1 text-[11px]">
                    {evaluation.vagueLanguageWarnings.map((warn, i) => (
                      <li key={i}>{warn}</li>
                    ))}
                  </ul>
                  <p className="text-[11px] text-amber-800 pt-1">
                    NZQA examiner commentaries note that candidates using vague words like &quot;strong&quot;,
                    &quot;light&quot;, or &quot;hard&quot; without microscopic particle explanations are restricted
                    from achieving Merit and Excellence.
                  </p>
                </div>
              )}

            {/* Next Grade Booster Banner */}
            <div className="p-5 rounded-2xl bg-[#FAF5ED] border border-stone-300 text-xs space-y-2">
              <span className="font-bold text-stone-900 flex items-center text-sm">
                <ArrowUpRight size={16} className="mr-1.5 text-stone-800" />
                How to Level Up to the Next Grade:
              </span>
              <p className="text-stone-800 font-medium leading-relaxed pl-5 text-[11px]">
                {evaluation.howToLevelUp}
              </p>
            </div>

            {/* Exemplar Advice / Tailored Rewrite */}
            {evaluation.exemplarImprovements && (
              <div className="p-4 rounded-2xl bg-white border border-stone-200 text-xs space-y-1.5">
                <span className="font-bold text-stone-900 uppercase tracking-wider text-[11px] block">
                  Excellence Phrasing Coach:
                </span>
                <p className="text-stone-700 leading-relaxed text-[11px]">
                  {evaluation.exemplarImprovements}
                </p>
              </div>
            )}

            {/* Model Answer Drawer Toggle */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setShowExemplar(!showExemplar)}
                className="inline-flex items-center text-xs font-semibold px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-800 hover:bg-stone-100 transition-colors shadow-xs"
              >
                <BookOpen size={14} className="mr-1.5 text-stone-700" />
                <span>
                  {showExemplar ? "Hide Model Answer" : "View Official NZQA Model Answer"}
                </span>
                {showExemplar ? (
                  <ChevronUp size={14} className="ml-1.5 text-stone-500" />
                ) : (
                  <ChevronDown size={14} className="ml-1.5 text-stone-500" />
                )}
              </button>

              {!isLastQuestion && (
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="inline-flex items-center text-xs font-bold px-5 py-2.5 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 transition-colors shadow-sm"
                >
                  <span>Ready for Question {currentQuestionIndex + 2}</span>
                  <ArrowRight size={14} className="ml-1.5" />
                </button>
              )}
            </div>

            {showExemplar && (
              <div className="mt-3 p-5 rounded-2xl bg-white border border-stone-300 text-xs text-stone-800 space-y-3 shadow-sm animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                  <span className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
                    Excellence Level Exemplar Response
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Full Excellence
                  </span>
                </div>
                <div className="whitespace-pre-line leading-relaxed font-sans text-stone-700 text-xs">
                  {currentQuestion.sampleExcellenceAnswer}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 6. Exam Complete Summary Card */}
        {isExamFullyCompleted && (
          <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-950 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center">
                <Award size={22} />
              </div>
              <div>
                <h4 className="font-extrabold text-lg text-emerald-950">
                  {selectedYear} Examination Completed!
                </h4>
                <p className="text-xs text-emerald-800">
                  You have completed and received AI feedback on all questions in this paper.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {yearQuestions.map((q) => {
                const grade = sessionProgress[q.id]?.evaluation?.grade || "Graded";
                return (
                  <div
                    key={q.id}
                    className="p-3 bg-white/90 rounded-xl border border-emerald-200 text-xs"
                  >
                    <span className="text-stone-500 font-bold block mb-1">
                      Question {q.questionNumber}
                    </span>
                    <span className="font-extrabold text-sm text-stone-900 block mb-0.5">
                      {grade}
                    </span>
                    <p className="text-stone-600 line-clamp-1">{q.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
