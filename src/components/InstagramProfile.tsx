"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  MoreHorizontal,
  Grid,
  Bookmark,
  UserCheck,
  ChevronDown,
  Layers,
  Heart,
} from "lucide-react";
import { MottathalaAvatar, MottathalaPostCard } from "./MottathalaMedia";
import { BottomNavBar } from "./BottomNavBar";
import { StoryModal } from "./StoryModal";

interface InstagramProfileProps {
  onBackToFeed?: () => void;
  activeNavTab: "home" | "search" | "create" | "activity" | "profile";
  onNavTabChange: (tab: "home" | "search" | "create" | "activity" | "profile") => void;
}

export function InstagramProfile({
  onBackToFeed,
  activeNavTab,
  onNavTabChange,
}: InstagramProfileProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(4096);
  const [activeTab, setActiveTab] = useState<"grid" | "guides" | "tagged">("grid");
  const [selectedHighlight, setSelectedHighlight] = useState<string | null>(null);
  const [selectedPostIndex, setSelectedPostIndex] = useState<number | null>(null);

  const highlights = [
    { id: 1, title: "Interfaces" },
    { id: 2, title: "Identity" },
    { id: 3, title: "Articles" },
    { id: 4, title: "Workspace" },
  ];

  const handleToggleFollow = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowersCount((c) => c - 1);
    } else {
      setIsFollowing(true);
      setFollowersCount((c) => c + 1);
    }
  };

  return (
    <div className="relative w-full max-w-[390px] h-[780px] bg-white rounded-[44px] shadow-2xl border-[8px] border-stone-900/90 overflow-hidden flex flex-col font-sans select-none">
      {/* Top Phone Notch / Dynamic Island indicator */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-stone-900 rounded-full z-40"></div>

      {/* Top Header */}
      <header className="pt-7 pb-2.5 px-5 flex items-center justify-between border-b border-stone-100 bg-white/95 backdrop-blur-md z-20">
        <button
          onClick={onBackToFeed}
          className="text-stone-900 hover:opacity-70 transition-opacity p-0.5"
          aria-label="Back to feed"
        >
          <ChevronLeft size={24} strokeWidth={2} />
        </button>

        <div className="flex items-center space-x-1">
          <span className="text-sm font-bold text-stone-900">anronkai</span>
        </div>

        <button
          className="text-stone-900 hover:opacity-70 transition-opacity p-0.5"
          aria-label="More options"
        >
          <MoreHorizontal size={20} />
        </button>
      </header>

      {/* Scrollable Profile Body */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24 text-left">
        {/* Profile Avatar & Stats Row */}
        <section className="px-5 pt-4 pb-2 flex items-center justify-between">
          {/* Large Avatar */}
          <div className="relative">
            <div className="p-[2.5px] rounded-full bg-gradient-to-tr from-sky-400 via-indigo-500 to-purple-500">
              <div className="p-0.5 bg-white rounded-full">
                <MottathalaAvatar size="xl" />
              </div>
            </div>
          </div>

          {/* Stats Columns */}
          <div className="flex items-center space-x-6 sm:space-x-7 pr-2">
            <div className="flex flex-col items-center">
              <span className="text-base font-bold text-stone-900 leading-tight">128</span>
              <span className="text-[11px] text-stone-500 font-medium">Posts</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-base font-bold text-stone-900 leading-tight">
                {followersCount.toLocaleString()}
              </span>
              <span className="text-[11px] text-stone-500 font-medium">Followers</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-base font-bold text-stone-900 leading-tight">512</span>
              <span className="text-[11px] text-stone-500 font-medium">Following</span>
            </div>
          </div>
        </section>

        {/* Bio Section (exact match from uploaded image) */}
        <section className="px-5 py-2 space-y-1">
          <h2 className="text-sm font-bold text-stone-900">Anton Lapko</h2>
          <span className="text-xs text-stone-400 font-medium block">Designer</span>

          <ul className="text-xs text-stone-800 space-y-0.5 pt-1">
            <li className="flex items-center space-x-1.5">
              <span className="text-stone-400">•</span>
              <span>Crafting clean and consistent interfaces</span>
            </li>
            <li className="flex items-center space-x-1.5">
              <span className="text-stone-400">•</span>
              <span>Designing meaningful brand identity</span>
            </li>
            <li className="flex items-center space-x-1.5">
              <span className="text-stone-400">•</span>
              <span>Sharing my knowledge</span>
            </li>
            <li className="flex items-center space-x-1.5">
              <span className="text-stone-400">•</span>
              <span>Working remotely</span>
            </li>
            <li className="flex items-center space-x-1.5">
              <span className="text-stone-400">•</span>
              <span>Ukraine, Kyiv</span>
            </li>
          </ul>

          <a
            href="https://dribbble.com"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-sky-600 font-semibold hover:underline block pt-1"
          >
            dribbble.com/anronkai
          </a>
        </section>

        {/* Action Buttons Row */}
        <section className="px-5 py-3 flex items-center space-x-2">
          {/* Follow Button */}
          <button
            onClick={handleToggleFollow}
            className={`flex-1 py-1.5 rounded-xl font-semibold text-xs transition-all shadow-xs ${
              isFollowing
                ? "bg-stone-100 text-stone-800 border border-stone-300 hover:bg-stone-200"
                : "bg-[#0095f6] text-white hover:bg-[#1877f2]"
            }`}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>

          {/* Message Button */}
          <button
            onClick={() => alert("Message prototype")}
            className="flex-1 py-1.5 rounded-xl bg-stone-100/90 text-stone-800 border border-stone-200/80 font-semibold text-xs hover:bg-stone-200/80 transition-colors"
          >
            Message
          </button>

          {/* Email Button */}
          <button
            onClick={() => alert("Email prototype")}
            className="flex-1 py-1.5 rounded-xl bg-stone-100/90 text-stone-800 border border-stone-200/80 font-semibold text-xs hover:bg-stone-200/80 transition-colors"
          >
            Email
          </button>

          {/* Dropdown chevron */}
          <button
            className="px-2.5 py-1.5 rounded-xl bg-stone-100/90 text-stone-800 border border-stone-200/80 hover:bg-stone-200/80 transition-colors"
            aria-label="Suggested users"
          >
            <ChevronDown size={14} />
          </button>
        </section>

        {/* Story Highlights Bar */}
        <section className="px-5 py-2 flex items-center space-x-3.5 overflow-x-auto no-scrollbar">
          {highlights.map((h) => (
            <button
              key={h.id}
              onClick={() => setSelectedHighlight(h.title)}
              className="flex flex-col items-center flex-shrink-0 group focus:outline-none"
            >
              <div className="p-0.5 rounded-full border border-stone-300 group-hover:border-stone-500 transition-colors">
                <MottathalaAvatar size="md" />
              </div>
              <span className="text-[10px] text-stone-600 mt-1 font-medium">
                {h.title}
              </span>
            </button>
          ))}
        </section>

        {/* Profile Tabs Navigation */}
        <section className="mt-2 border-t border-stone-200 flex items-center">
          <button
            onClick={() => setActiveTab("grid")}
            className={`flex-1 py-3 flex justify-center items-center transition-colors relative ${
              activeTab === "grid" ? "text-stone-900" : "text-stone-400 hover:text-stone-600"
            }`}
            aria-label="Post Grid"
          >
            <Grid size={18} strokeWidth={activeTab === "grid" ? 2.2 : 1.8} />
            {activeTab === "grid" && (
              <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-stone-900 rounded-full"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("guides")}
            className={`flex-1 py-3 flex justify-center items-center transition-colors relative ${
              activeTab === "guides" ? "text-stone-900" : "text-stone-400 hover:text-stone-600"
            }`}
            aria-label="Guides & Reels"
          >
            <Layers size={18} strokeWidth={activeTab === "guides" ? 2.2 : 1.8} />
            {activeTab === "guides" && (
              <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-stone-900 rounded-full"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("tagged")}
            className={`flex-1 py-3 flex justify-center items-center transition-colors relative ${
              activeTab === "tagged" ? "text-stone-900" : "text-stone-400 hover:text-stone-600"
            }`}
            aria-label="Tagged Photos"
          >
            <UserCheck size={18} strokeWidth={activeTab === "tagged" ? 2.2 : 1.8} />
            {activeTab === "tagged" && (
              <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-stone-900 rounded-full"></span>
            )}
          </button>
        </section>

        {/* 3-Column Post Grid (Every single photo says "Mottathala Izaakutty" on a white background with black text!) */}
        <section className="p-3 grid grid-cols-3 gap-2.5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((itemIndex) => (
            <MottathalaPostCard
              key={itemIndex}
              index={itemIndex}
              variant="grid"
              onClick={() => setSelectedPostIndex(itemIndex)}
            />
          ))}
        </section>
      </div>

      {/* Floating Bottom Navigation Bar */}
      <BottomNavBar activeTab={activeNavTab} onTabChange={onNavTabChange} />

      {/* Story Highlight Modal */}
      {selectedHighlight && (
        <StoryModal
          isOpen={!!selectedHighlight}
          username={`anronkai • ${selectedHighlight}`}
          onClose={() => setSelectedHighlight(null)}
        />
      )}

      {/* Post Detail Preview Modal */}
      {selectedPostIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedPostIndex(null)}
        >
          <div
            className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-stone-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center space-x-2">
                <MottathalaAvatar size="sm" />
                <span className="text-xs font-bold text-stone-900">anronkai</span>
              </div>
              <span className="text-[10px] text-stone-400">Post #{selectedPostIndex}</span>
            </div>

            <div className="py-4">
              <MottathalaPostCard index={selectedPostIndex} variant="feed" />
            </div>

            <p className="text-xs text-stone-800 leading-relaxed">
              <strong className="font-bold mr-1">anronkai</strong>
              Minimal layout design #{selectedPostIndex} featuring Mottathala Izaakutty.
            </p>

            <button
              onClick={() => setSelectedPostIndex(null)}
              className="mt-4 w-full py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
