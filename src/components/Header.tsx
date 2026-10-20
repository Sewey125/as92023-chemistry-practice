"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Atom, BookOpen, KeyRound, ShieldCheck, PenTool, Home } from "lucide-react";

interface HeaderProps {
  onOpenApiKeyModal: () => void;
  hasCustomKey: boolean;
}

export function Header({
  onOpenApiKeyModal,
  hasCustomKey,
}: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="w-full max-w-5xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Brand logo & title */}
      <Link href="/" className="flex items-center space-x-3 group">
        <div className="w-10 h-10 rounded-2xl bg-stone-900 text-stone-50 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
          <Atom size={20} className="text-stone-100" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg tracking-tight text-stone-900">
              Materials
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-200/80 text-stone-700">
              AS 92023
            </span>
            <span className="text-[11px] font-medium px-1.5 py-0.5 rounded-md bg-stone-100 text-stone-500 border border-stone-200">
              v3.0
            </span>
          </div>
          <p className="text-xs text-stone-500 hidden sm:block">
            NCEA Level 1 Chemistry &amp; Biology 1.4
          </p>
        </div>
      </Link>

      {/* Nav links */}
      <nav className="flex items-center space-x-1.5 sm:space-x-2">
        <Link
          href="/"
          className={`inline-flex items-center text-xs sm:text-sm font-semibold px-3 py-2 rounded-xl transition-colors border ${
            pathname === "/"
              ? "bg-stone-900 text-stone-50 border-stone-900 shadow-sm"
              : "bg-stone-200/50 hover:bg-stone-200 text-stone-700 border-stone-300/40"
          }`}
        >
          <Home size={14} className="mr-1.5" />
          <span>Home</span>
        </Link>

        <Link
          href="/notes"
          className={`inline-flex items-center text-xs sm:text-sm font-semibold px-3 py-2 rounded-xl transition-colors border ${
            pathname === "/notes"
              ? "bg-stone-900 text-stone-50 border-stone-900 shadow-sm"
              : "bg-stone-200/50 hover:bg-stone-200 text-stone-700 border-stone-300/40"
          }`}
        >
          <BookOpen size={14} className="mr-1.5" />
          <span>Notes</span>
        </Link>

        <Link
          href="/practice"
          className={`inline-flex items-center text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-xl transition-colors border ${
            pathname === "/practice"
              ? "bg-stone-900 text-stone-50 border-stone-900 shadow-sm"
              : "bg-stone-200/50 hover:bg-stone-200 text-stone-700 border-stone-300/40"
          }`}
        >
          <PenTool size={14} className="mr-1.5" />
          <span>Practice Exams</span>
        </Link>

        <button
          onClick={onOpenApiKeyModal}
          className={`inline-flex items-center text-xs sm:text-sm font-medium px-3 py-2 rounded-xl transition-colors border ${
            hasCustomKey
              ? "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
              : "bg-stone-200/50 hover:bg-stone-200 text-stone-700 border-stone-300/40"
          }`}
          title="Connect free Google AI Studio key"
        >
          {hasCustomKey ? (
            <ShieldCheck size={14} className="mr-1.5 text-emerald-600" />
          ) : (
            <KeyRound size={14} className="mr-1.5 text-stone-600" />
          )}
          <span className="hidden sm:inline">{hasCustomKey ? "Key Connected" : "API Key"}</span>
        </button>
      </nav>
    </header>
  );
}
