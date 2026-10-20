"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { PracticeWorkspace } from "@/components/PracticeWorkspace";
import { ApiKeyModal } from "@/components/ApiKeyModal";
import { BookOpen } from "lucide-react";

export default function PracticePage() {
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

      {/* Top Helper Banner */}
      <div className="max-w-5xl mx-auto px-6 pt-2 pb-4 w-full flex items-center justify-between">
        <div className="text-xs text-stone-500 font-medium">
          Official NZQA Exam Papers • 2025, 2024 &amp; 2023
        </div>

        <Link
          href="/notes"
          className="inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#F2E9DE] hover:bg-stone-200 text-stone-800 transition-colors border border-stone-300/50"
        >
          <BookOpen size={13} className="mr-1.5 text-stone-600" />
          <span>View Study Notes</span>
        </Link>
      </div>

      {/* Practice Workspace */}
      <main className="flex-1 w-full">
        <PracticeWorkspace
          apiKey={apiKey}
          onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-stone-300/60 py-6 px-6 text-center text-xs text-stone-500 bg-[#F5EFE4]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-bold text-stone-800">Materials AS 92023 Exam Practice</span>
          <div className="flex items-center space-x-4">
            <Link href="/" className="hover:text-stone-800 transition-colors">
              Home
            </Link>
            <Link href="/notes" className="hover:text-stone-800 transition-colors">
              Study Notes
            </Link>
            <button
              onClick={() => setIsApiKeyModalOpen(true)}
              className="hover:text-stone-800 transition-colors"
            >
              API Key Setup
            </button>
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
