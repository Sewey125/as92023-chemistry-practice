"use client";

import React from "react";
import {
  Home,
  Search,
  PlusSquare,
  Compass,
  Heart,
  Send,
} from "lucide-react";
import { MottathalaAvatar } from "./MottathalaMedia";

interface InstagramHeaderProps {
  currentView: "feed" | "profile";
  onNavigate: (view: "feed" | "profile") => void;
}

export function InstagramHeader({ currentView, onNavigate }: InstagramHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-15 flex items-center justify-between gap-4">
        {/* Left: Instagram Script Logo */}
        <button
          onClick={() => onNavigate("feed")}
          className="text-2xl sm:text-3xl font-serif italic font-bold tracking-tight text-stone-900 select-none hover:opacity-85 transition-opacity"
        >
          Instagram
        </button>

        {/* Center: Search Bar (Hidden on small mobile, visible on tablet/desktop) */}
        <div className="hidden sm:flex items-center relative w-64 md:w-72">
          <Search size={15} className="absolute left-3.5 text-stone-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-stone-100/90 text-stone-900 text-xs rounded-lg pl-9 pr-4 py-2 border border-transparent focus:border-stone-300 focus:bg-white focus:outline-none transition-all placeholder:text-stone-400 font-medium"
          />
        </div>

        {/* Right: Navigation Actions */}
        <nav className="flex items-center space-x-4 sm:space-x-5">
          <button
            onClick={() => onNavigate("feed")}
            className="text-stone-900 hover:text-stone-600 transition-colors p-1"
            title="Home Feed"
            aria-label="Home Feed"
          >
            <Home
              size={24}
              strokeWidth={currentView === "feed" ? 2.4 : 1.8}
              className={currentView === "feed" ? "text-stone-950" : "text-stone-700"}
            />
          </button>

          <button
            onClick={() => alert("Direct Messages")}
            className="text-stone-700 hover:text-stone-950 transition-colors p-1 relative"
            title="Messages"
            aria-label="Messages"
          >
            <Send size={22} strokeWidth={1.8} className="-rotate-12" />
            <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-0.5 right-0.5"></span>
          </button>

          <button
            onClick={() => alert("Create New Post")}
            className="text-stone-700 hover:text-stone-950 transition-colors p-1"
            title="New Post"
            aria-label="New Post"
          >
            <PlusSquare size={23} strokeWidth={1.8} />
          </button>

          <button
            onClick={() => alert("Explore")}
            className="hidden sm:block text-stone-700 hover:text-stone-950 transition-colors p-1"
            title="Explore"
            aria-label="Explore"
          >
            <Compass size={23} strokeWidth={1.8} />
          </button>

          <button
            onClick={() => alert("Activity & Notifications")}
            className="text-stone-700 hover:text-stone-950 transition-colors p-1 relative"
            title="Notifications"
            aria-label="Notifications"
          >
            <Heart size={23} strokeWidth={1.8} />
          </button>

          {/* User Profile Avatar Link */}
          <button
            onClick={() => onNavigate("profile")}
            className={`p-0.5 rounded-full transition-all ${
              currentView === "profile" ? "ring-2 ring-stone-900" : "hover:opacity-85"
            }`}
            title="Profile"
            aria-label="Profile"
          >
            <MottathalaAvatar size="xs" />
          </button>
        </nav>
      </div>
    </header>
  );
}
