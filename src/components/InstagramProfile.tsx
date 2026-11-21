"use client";

import React, { useState } from "react";
import {
  Grid,
  Layers,
  Bookmark,
  UserCheck,
  Settings,
  MoreHorizontal,
  ChevronDown,
} from "lucide-react";
import { MottathalaAvatar, MottathalaPostCard } from "./MottathalaMedia";
import { StoryModal } from "./StoryModal";

interface InstagramProfileProps {
  onBackToFeed?: () => void;
}

export function InstagramProfile({ onBackToFeed }: InstagramProfileProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(4096);
  const [activeTab, setActiveTab] = useState<"grid" | "guides" | "saved" | "tagged">("grid");
  const [selectedHighlight, setSelectedHighlight] = useState<string | null>(null);
  const [selectedPostIndex, setSelectedPostIndex] = useState<number | null>(null);

  const highlights = [
    { id: 1, title: "Interfaces" },
    { id: 2, title: "Identity" },
    { id: 3, title: "Articles" },
    { id: 4, title: "Workspace" },
    { id: 5, title: "Typography" },
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
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 py-6 sm:py-10 text-left font-sans select-none">
      {/* Top Profile Header */}
      <header className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-14 pb-8 sm:pb-12 border-b border-stone-200/80">
        {/* Large Avatar */}
        <div className="flex-shrink-0">
          <div className="p-1 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 shadow-sm">
            <div className="p-1 bg-white rounded-full">
              <MottathalaAvatar size="2xl" />
            </div>
          </div>
        </div>

        {/* Profile Details & Bio */}
        <div className="flex-1 flex flex-col items-center sm:items-start space-y-4 text-center sm:text-left">
          {/* Row 1: Username & Action Buttons */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              anronkai
            </h1>

            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleFollow}
                className={`px-5 py-1.5 rounded-lg font-semibold text-xs sm:text-sm transition-all shadow-xs ${
                  isFollowing
                    ? "bg-stone-100 text-stone-800 border border-stone-300 hover:bg-stone-200"
                    : "bg-[#0095f6] text-white hover:bg-[#1877f2]"
                }`}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>

              <button
                onClick={() => alert("Message sent")}
                className="px-4 py-1.5 rounded-lg bg-stone-100/90 text-stone-800 border border-stone-300/80 font-semibold text-xs sm:text-sm hover:bg-stone-200/80 transition-colors"
              >
                Message
              </button>

              <button
                onClick={() => alert("Email contact")}
                className="px-4 py-1.5 rounded-lg bg-stone-100/90 text-stone-800 border border-stone-300/80 font-semibold text-xs sm:text-sm hover:bg-stone-200/80 transition-colors"
              >
                Email
              </button>

              <button
                className="p-1.5 rounded-lg bg-stone-100/90 text-stone-800 border border-stone-300/80 hover:bg-stone-200/80 transition-colors"
                aria-label="Options"
              >
                <MoreHorizontal size={18} />
              </button>
            </div>
          </div>

          {/* Row 2: Stats (Posts, Followers, Following) */}
          <div className="flex items-center space-x-8 text-sm sm:text-base text-stone-900">
            <div>
              <strong className="font-bold">128</strong> posts
            </div>
            <div>
              <strong className="font-bold">{followersCount.toLocaleString()}</strong> followers
            </div>
            <div>
              <strong className="font-bold">512</strong> following
            </div>
          </div>

          {/* Row 3: Bio Section */}
          <div className="space-y-1 text-xs sm:text-sm text-stone-800 leading-relaxed max-w-md">
            <h2 className="font-bold text-stone-950 text-sm sm:text-base">Anton Lapko</h2>
            <span className="text-stone-400 font-medium block">Designer</span>

            <ul className="space-y-0.5 pt-1 text-stone-700">
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
              className="text-sky-600 font-semibold hover:underline block pt-1"
            >
              dribbble.com/anronkai
            </a>
          </div>
        </div>
      </header>

      {/* Story Highlights Bar */}
      <section className="py-6 sm:py-8 border-b border-stone-200/80">
        <div className="flex items-center space-x-6 sm:space-x-8 overflow-x-auto no-scrollbar py-1">
          {highlights.map((h) => (
            <button
              key={h.id}
              onClick={() => setSelectedHighlight(h.title)}
              className="flex flex-col items-center flex-shrink-0 group focus:outline-none"
            >
              <div className="p-0.5 rounded-full border-2 border-stone-300 group-hover:border-stone-600 transition-colors">
                <MottathalaAvatar size="lg" />
              </div>
              <span className="text-xs font-semibold text-stone-700 mt-2">
                {h.title}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Profile Tabs */}
      <section className="flex items-center justify-center space-x-10 sm:space-x-14 border-b border-stone-200 text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-400">
        <button
          onClick={() => setActiveTab("grid")}
          className={`flex items-center space-x-2 py-3.5 border-t-2 -mt-[1px] transition-colors ${
            activeTab === "grid"
              ? "border-stone-900 text-stone-900"
              : "border-transparent hover:text-stone-600"
          }`}
        >
          <Grid size={15} />
          <span>Posts</span>
        </button>

        <button
          onClick={() => setActiveTab("guides")}
          className={`flex items-center space-x-2 py-3.5 border-t-2 -mt-[1px] transition-colors ${
            activeTab === "guides"
              ? "border-stone-900 text-stone-900"
              : "border-transparent hover:text-stone-600"
          }`}
        >
          <Layers size={15} />
          <span>Guides</span>
        </button>

        <button
          onClick={() => setActiveTab("saved")}
          className={`flex items-center space-x-2 py-3.5 border-t-2 -mt-[1px] transition-colors ${
            activeTab === "saved"
              ? "border-stone-900 text-stone-900"
              : "border-transparent hover:text-stone-600"
          }`}
        >
          <Bookmark size={15} />
          <span>Saved</span>
        </button>

        <button
          onClick={() => setActiveTab("tagged")}
          className={`flex items-center space-x-2 py-3.5 border-t-2 -mt-[1px] transition-colors ${
            activeTab === "tagged"
              ? "border-stone-900 text-stone-900"
              : "border-transparent hover:text-stone-600"
          }`}
        >
          <UserCheck size={15} />
          <span>Tagged</span>
        </button>
      </section>

      {/* 3-Column Posts Grid (All photos say Mottathala Izaakutty on white background with black text!) */}
      <section className="pt-4 sm:pt-6 grid grid-cols-3 gap-2 sm:gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((itemIndex) => (
          <MottathalaPostCard
            key={itemIndex}
            index={itemIndex}
            variant="grid"
            onClick={() => setSelectedPostIndex(itemIndex)}
          />
        ))}
      </section>

      {/* Story Highlight Modal */}
      {selectedHighlight && (
        <StoryModal
          isOpen={!!selectedHighlight}
          username={`anronkai • ${selectedHighlight}`}
          onClose={() => setSelectedHighlight(null)}
        />
      )}

      {/* Post Detail Modal */}
      {selectedPostIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedPostIndex(null)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-stone-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center space-x-3">
                <MottathalaAvatar size="sm" />
                <div>
                  <span className="text-sm font-bold text-stone-900 block">anronkai</span>
                  <span className="text-[10px] text-stone-400">Kyiv, Ukraine</span>
                </div>
              </div>
              <span className="text-xs font-mono text-stone-400">Post #{selectedPostIndex}</span>
            </div>

            <div className="py-4">
              <MottathalaPostCard index={selectedPostIndex} variant="feed" />
            </div>

            <div className="space-y-1 text-left text-sm text-stone-900">
              <p>
                <strong className="font-bold mr-2">anronkai</strong>
                Minimalist interface exploration #{selectedPostIndex} featuring Mottathala Izaakutty.
              </p>
              <span className="text-xs text-stone-400 block pt-1 font-mono">1 DAY AGO</span>
            </div>

            <button
              onClick={() => setSelectedPostIndex(null)}
              className="mt-6 w-full py-2.5 bg-stone-900 text-white rounded-xl text-sm font-semibold hover:bg-stone-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
