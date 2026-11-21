"use client";

import React, { useState } from "react";
import { InstagramFeed } from "@/components/InstagramFeed";
import { InstagramProfile } from "@/components/InstagramProfile";
import { Smartphone, LayoutGrid, Sparkles } from "lucide-react";

type ViewMode = "dual" | "feed" | "profile";

export default function InstagramPrototypePage() {
  const [viewMode, setViewMode] = useState<ViewMode>("dual");
  const [activeNavTab, setActiveNavTab] = useState<"home" | "search" | "create" | "activity" | "profile">("home");

  const handleNavTabChange = (tab: "home" | "search" | "create" | "activity" | "profile") => {
    setActiveNavTab(tab);
    if (tab === "profile") {
      if (viewMode === "feed") setViewMode("profile");
    } else if (tab === "home") {
      if (viewMode === "profile") setViewMode("feed");
    }
  };

  return (
    <main className="min-h-screen bg-[#eef1f6] flex flex-col items-center justify-start py-6 px-4 sm:px-6 relative overflow-x-hidden selection:bg-stone-900 selection:text-white">
      {/* Top Prototype Controls Bar */}
      <header className="w-full max-w-5xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/80 backdrop-blur-md px-6 py-3.5 rounded-3xl border border-stone-200/80 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-xs">
            <Sparkles size={16} />
          </div>
          <div>
            <h1 className="text-sm font-bold text-stone-900 tracking-tight flex items-center gap-2">
              Instagram Redesign Prototype
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                Mottathala Izaakutty Edition
              </span>
            </h1>
            <p className="text-[11px] text-stone-500">
              Interactive dual-screen mockup inspired by modern minimal mobile interfaces
            </p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center p-1 bg-stone-100 rounded-2xl border border-stone-200/80 text-xs font-semibold">
          <button
            onClick={() => setViewMode("dual")}
            className={`hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl transition-all ${
              viewMode === "dual"
                ? "bg-white text-stone-950 shadow-xs"
                : "text-stone-500 hover:text-stone-900"
            }`}
          >
            <LayoutGrid size={14} />
            <span>Dual Mockup View</span>
          </button>

          <button
            onClick={() => setViewMode("feed")}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl transition-all ${
              viewMode === "feed"
                ? "bg-white text-stone-950 shadow-xs"
                : "text-stone-500 hover:text-stone-900"
            }`}
          >
            <Smartphone size={14} />
            <span>Feed Screen</span>
          </button>

          <button
            onClick={() => setViewMode("profile")}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl transition-all ${
              viewMode === "profile"
                ? "bg-white text-stone-950 shadow-xs"
                : "text-stone-500 hover:text-stone-900"
            }`}
          >
            <Smartphone size={14} />
            <span>Profile Screen</span>
          </button>
        </div>
      </header>

      {/* Main Presentation Stage */}
      <div className="w-full max-w-6xl flex items-center justify-center">
        {/* Dual Mockup Showcase (Side-by-Side like in reference photo) */}
        {viewMode === "dual" && (
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-14 animate-fade-in">
            {/* Left Screen: Feed */}
            <div className="flex flex-col items-center">
              <span className="text-xs font-mono font-semibold text-stone-400 mb-2 uppercase tracking-widest">
                [ Screen 1 • Feed Screen ]
              </span>
              <InstagramFeed
                activeNavTab={activeNavTab}
                onNavTabChange={handleNavTabChange}
                onNavigateToProfile={() => {
                  setActiveNavTab("profile");
                }}
              />
            </div>

            {/* Right Screen: Profile */}
            <div className="flex flex-col items-center">
              <span className="text-xs font-mono font-semibold text-stone-400 mb-2 uppercase tracking-widest">
                [ Screen 2 • Profile Screen ]
              </span>
              <InstagramProfile
                activeNavTab={activeNavTab}
                onNavTabChange={handleNavTabChange}
                onBackToFeed={() => {
                  setActiveNavTab("home");
                }}
              />
            </div>
          </div>
        )}

        {/* Single Screen Mode: Feed */}
        {viewMode === "feed" && (
          <div className="flex flex-col items-center animate-fade-in">
            <span className="text-xs font-mono font-semibold text-stone-400 mb-2 uppercase tracking-widest">
              [ Interactive Feed Screen ]
            </span>
            <InstagramFeed
              activeNavTab={activeNavTab}
              onNavTabChange={handleNavTabChange}
              onNavigateToProfile={() => setViewMode("profile")}
            />
          </div>
        )}

        {/* Single Screen Mode: Profile */}
        {viewMode === "profile" && (
          <div className="flex flex-col items-center animate-fade-in">
            <span className="text-xs font-mono font-semibold text-stone-400 mb-2 uppercase tracking-widest">
              [ Interactive Profile Screen ]
            </span>
            <InstagramProfile
              activeNavTab={activeNavTab}
              onNavTabChange={handleNavTabChange}
              onBackToFeed={() => setViewMode("feed")}
            />
          </div>
        )}
      </div>

      {/* Bottom Footer Note */}
      <footer className="mt-12 text-center text-xs text-stone-400 font-medium">
        Instagram UI Lookalike Prototype • Every photo &amp; pfp rendered with white background and black text:{" "}
        <strong className="text-stone-700">Mottathala Izaakutty</strong>
      </footer>
    </main>
  );
}
