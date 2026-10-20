"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ApiKeyModal } from "@/components/ApiKeyModal";
import {
  BookOpen,
  PenTool,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Layers,
  Award,
} from "lucide-react";

export default function HomePage() {
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("as92023_gemini_key");
    if (saved) {
      setApiKey(saved);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF5ED] text-stone-900 flex flex-col font-sans selection:bg-[#F8B4C0] selection:text-stone-900">
      {/* Header */}
      <Header
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        hasCustomKey={!!apiKey}
      />

      {/* Main Hero & Navigation Hub */}
      <main className="flex-1 max-w-4xl mx-auto px-6 pt-10 pb-20 w-full flex flex-col justify-center">
        {/* Top Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-stone-200/70 border border-stone-300/60 text-xs font-medium text-stone-700">
            <Sparkles size={12} className="text-stone-800" />
            <span>NCEA Level 1 Chemistry &amp; Biology 1.4 • 4 Credits</span>
          </div>
        </div>

        {/* Hero Title with Alcove Pink Highlight */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.12]">
            Master AS 92023
            <br />
            for{" "}
            <mark className="bg-[#F8B4C0] px-3.5 py-0.5 rounded-xl text-stone-900 inline-block font-extrabold shadow-sm">
              Excellence
            </mark>
          </h1>

          <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto font-normal leading-relaxed">
            Demonstrate understanding of how the physical properties of materials
            inform their use. Learn the complete curriculum notes, then sit authentic
            past exam papers with instant AI feedback.
          </p>
        </div>

        {/* Two Primary Action Cards (Alcove Rounded-3xl style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Card 1: All-In-One Notes */}
          <Link
            href="/notes"
            className="group block bg-[#F2E9DE] rounded-3xl p-8 border border-stone-300/70 shadow-sm hover:shadow-md hover:border-stone-400 transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-stone-900 text-stone-50 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <BookOpen size={22} />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                  Step 1 • Revision
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-stone-900 mt-1">
                  Complete Study Notes
                </h2>
              </div>

              <p className="text-sm text-stone-600 leading-relaxed">
                Everything you need for AS 92023 in one place: all 5 material classes,
                3D networks, particle arrangements, physical properties, and official
                examiner trap warnings.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-stone-300/60 flex items-center justify-between text-sm font-semibold text-stone-900 group-hover:text-stone-700">
              <span>Read All Notes</span>
              <ArrowRight
                size={16}
                className="transform group-hover:translate-x-1 transition-transform"
              />
            </div>
          </Link>

          {/* Card 2: Exam Practice */}
          <Link
            href="/practice"
            className="group block bg-stone-900 text-stone-50 rounded-3xl p-8 border border-stone-800 shadow-md hover:shadow-lg hover:bg-stone-850 transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-stone-50 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <PenTool size={22} />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                  Step 2 • Assessment
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-stone-50 mt-1">
                  Sit Past Exam Papers
                </h2>
              </div>

              <p className="text-sm text-stone-300 leading-relaxed">
                Choose an exam year (2025, 2024, or 2023), answer the questions,
                and unlock the next question by receiving instant AI examiner grades
                and level-up advice.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-stone-800 flex items-center justify-between text-sm font-semibold text-stone-100 group-hover:text-white">
              <span>Start Practice Paper</span>
              <ArrowRight
                size={16}
                className="transform group-hover:translate-x-1 transition-transform"
              />
            </div>
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-white/80 rounded-2xl border border-stone-300/60 space-y-1.5 shadow-sm">
            <div className="font-bold text-stone-900 flex items-center">
              <Layers size={14} className="mr-1.5 text-stone-700" />
              5 Official Material Classes
            </div>
            <p className="text-stone-600 leading-relaxed">
              Metals, ionic solids, covalent networks, polymers, and molecular substances.
            </p>
          </div>

          <div className="p-4 bg-white/80 rounded-2xl border border-stone-300/60 space-y-1.5 shadow-sm">
            <div className="font-bold text-stone-900 flex items-center">
              <Award size={14} className="mr-1.5 text-stone-700" />
              Official NZQA Rubric
            </div>
            <p className="text-stone-600 leading-relaxed">
              Graded on Achieved, Merit, and Excellence using examiner assessment reports.
            </p>
          </div>

          <div className="p-4 bg-white/80 rounded-2xl border border-stone-300/60 space-y-1.5 shadow-sm">
            <div className="font-bold text-stone-900 flex items-center">
              <CheckCircle2 size={14} className="mr-1.5 text-stone-700" />
              100% Free Forever
            </div>
            <p className="text-stone-600 leading-relaxed">
              Runs with free Google AI Studio Gemini API keys or built-in simulated grading.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-stone-300/60 py-6 px-6 text-center text-xs text-stone-500 bg-[#F5EFE4]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-stone-800">Materials AS 92023</span>
            <span>•</span>
            <span>Chemistry &amp; Biology 1.4 External</span>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <Link href="/notes" className="hover:text-stone-800 transition-colors">
              Notes
            </Link>
            <Link href="/practice" className="hover:text-stone-800 transition-colors">
              Practice
            </Link>
            <button
              onClick={() => setIsApiKeyModalOpen(true)}
              className="hover:text-stone-800 transition-colors"
            >
              API Key Setup
            </button>
            <span className="inline-flex items-center text-stone-400">
              <ShieldCheck size={12} className="mr-1 text-emerald-700" />
              NZQA Aligned
            </span>
          </div>
        </div>
      </footer>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onKeySaved={(newKey) => setApiKey(newKey)}
        currentKey={apiKey}
      />
    </div>
  );
}
