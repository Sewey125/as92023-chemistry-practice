"use client";

import React from "react";
import { Home, Search, PlusCircle, Heart } from "lucide-react";
import { MottathalaAvatar } from "./MottathalaMedia";

interface BottomNavBarProps {
  activeTab: "home" | "search" | "create" | "activity" | "profile";
  onTabChange: (tab: "home" | "search" | "create" | "activity" | "profile") => void;
}

export function BottomNavBar({ activeTab, onTabChange }: BottomNavBarProps) {
  return (
    <div className="absolute bottom-5 left-0 right-0 px-6 flex justify-center z-30 pointer-events-none">
      <nav className="pointer-events-auto bg-[#111114] text-white px-6 py-2.5 rounded-full shadow-2xl border border-white/10 flex items-center justify-between w-full max-w-[340px] backdrop-blur-md">
        {/* Home Button */}
        <button
          onClick={() => onTabChange("home")}
          className="flex flex-col items-center justify-center p-1.5 text-stone-300 hover:text-white transition-colors relative"
          aria-label="Home Feed"
        >
          <Home size={22} className={activeTab === "home" ? "text-white" : "text-stone-400"} />
          {activeTab === "home" && (
            <span className="w-1 h-1 rounded-full bg-white absolute -bottom-0.5"></span>
          )}
        </button>

        {/* Search / Explore */}
        <button
          onClick={() => onTabChange("search")}
          className="flex flex-col items-center justify-center p-1.5 text-stone-300 hover:text-white transition-colors relative"
          aria-label="Search"
        >
          <Search size={21} className={activeTab === "search" ? "text-white" : "text-stone-400"} />
          {activeTab === "search" && (
            <span className="w-1 h-1 rounded-full bg-white absolute -bottom-0.5"></span>
          )}
        </button>

        {/* Create / Add */}
        <button
          onClick={() => onTabChange("create")}
          className="flex flex-col items-center justify-center p-1.5 text-stone-300 hover:text-white transition-colors relative"
          aria-label="Create Post"
        >
          <PlusCircle size={22} className={activeTab === "create" ? "text-white" : "text-stone-400"} />
          {activeTab === "create" && (
            <span className="w-1 h-1 rounded-full bg-white absolute -bottom-0.5"></span>
          )}
        </button>

        {/* Activity / Heart */}
        <button
          onClick={() => onTabChange("activity")}
          className="flex flex-col items-center justify-center p-1.5 text-stone-300 hover:text-white transition-colors relative"
          aria-label="Activity"
        >
          <Heart size={21} className={activeTab === "activity" ? "text-white" : "text-stone-400"} />
          {activeTab === "activity" && (
            <span className="w-1 h-1 rounded-full bg-white absolute -bottom-0.5"></span>
          )}
        </button>

        {/* Profile */}
        <button
          onClick={() => onTabChange("profile")}
          className="flex flex-col items-center justify-center p-1 text-stone-300 hover:text-white transition-colors relative"
          aria-label="Profile"
        >
          <div className={`p-[1.5px] rounded-full ${activeTab === "profile" ? "ring-2 ring-white" : ""}`}>
            <MottathalaAvatar size="xs" />
          </div>
          {activeTab === "profile" && (
            <span className="w-1 h-1 rounded-full bg-white absolute -bottom-0.5"></span>
          )}
        </button>
      </nav>
    </div>
  );
}
