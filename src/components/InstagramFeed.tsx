"use client";

import React, { useState } from "react";
import {
  Camera,
  Send,
  MoreHorizontal,
  Heart,
  MessageCircle,
  Bookmark,
  Plus,
} from "lucide-react";
import { MottathalaAvatar, MottathalaPostCard } from "./MottathalaMedia";
import { BottomNavBar } from "./BottomNavBar";
import { StoryModal } from "./StoryModal";
import { CommentModal } from "./CommentModal";

interface InstagramFeedProps {
  onNavigateToProfile?: () => void;
  activeNavTab: "home" | "search" | "create" | "activity" | "profile";
  onNavTabChange: (tab: "home" | "search" | "create" | "activity" | "profile") => void;
}

export function InstagramFeed({
  onNavigateToProfile,
  activeNavTab,
  onNavTabChange,
}: InstagramFeedProps) {
  const [isLiked1, setIsLiked1] = useState(false);
  const [likesCount1, setLikesCount1] = useState(800);
  const [isSaved1, setIsSaved1] = useState(false);

  const [isLiked2, setIsLiked2] = useState(false);
  const [likesCount2, setLikesCount2] = useState(1240);
  const [isSaved2, setIsSaved2] = useState(false);

  const [activeStoryUser, setActiveStoryUser] = useState<string | null>(null);
  const [activeCommentPost, setActiveCommentPost] = useState<string | null>(null);
  const [showHeartBurst1, setShowHeartBurst1] = useState(false);

  const stories = [
    { username: "Your story", isUser: true },
    { username: "silverfrog", isUser: false },
    { username: "sadpanda", isUser: false },
    { username: "angryswan", isUser: false },
    { username: "anronkai", isUser: false },
    { username: "mrbright", isUser: false },
  ];

  const handleLike1 = () => {
    if (isLiked1) {
      setIsLiked1(false);
      setLikesCount1((c) => c - 1);
    } else {
      setIsLiked1(true);
      setLikesCount1((c) => c + 1);
      setShowHeartBurst1(true);
      setTimeout(() => setShowHeartBurst1(false), 900);
    }
  };

  const handleDoubleTapPost1 = () => {
    if (!isLiked1) {
      setIsLiked1(true);
      setLikesCount1((c) => c + 1);
    }
    setShowHeartBurst1(true);
    setTimeout(() => setShowHeartBurst1(false), 900);
  };

  return (
    <div className="relative w-full max-w-[390px] h-[780px] bg-white rounded-[44px] shadow-2xl border-[8px] border-stone-900/90 overflow-hidden flex flex-col font-sans select-none">
      {/* Top Phone Notch / Dynamic Island indicator */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-stone-900 rounded-full z-40"></div>

      {/* Top Header */}
      <header className="pt-7 pb-2 px-5 flex items-center justify-between border-b border-stone-100 bg-white/95 backdrop-blur-md z-20">
        <button
          className="text-stone-900 hover:opacity-70 transition-opacity"
          aria-label="Camera"
          onClick={() => alert("Instagram Camera feature prototype")}
        >
          <Camera size={24} strokeWidth={1.8} />
        </button>

        {/* Script Logo */}
        <h1 className="text-2xl font-serif italic tracking-tight font-bold text-stone-900 select-none">
          Instagram
        </h1>

        <button
          className="text-stone-900 hover:opacity-70 transition-opacity relative"
          aria-label="Direct Messages"
          onClick={() => alert("Direct messages prototype")}
        >
          <Send size={22} strokeWidth={1.8} className="-rotate-12" />
          <span className="w-2 h-2 rounded-full bg-rose-500 absolute -top-0.5 -right-0.5"></span>
        </button>
      </header>

      {/* Scrollable Feed Container */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {/* Stories Bar */}
        <section className="py-3 px-3.5 border-b border-stone-100 flex items-center space-x-3.5 overflow-x-auto no-scrollbar">
          {stories.map((story, i) => (
            <button
              key={story.username}
              onClick={() => setActiveStoryUser(story.username)}
              className="flex flex-col items-center flex-shrink-0 group focus:outline-none"
            >
              <div
                className={`p-[2.5px] rounded-full relative transition-transform group-hover:scale-105 active:scale-95 ${
                  story.isUser
                    ? "border-2 border-dashed border-stone-300"
                    : "bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600"
                }`}
              >
                <div className="p-0.5 bg-white rounded-full">
                  <MottathalaAvatar size="lg" />
                </div>

                {story.isUser && (
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-sky-500 text-white rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                    <Plus size={10} strokeWidth={3} />
                  </span>
                )}
              </div>

              <span className="text-[10px] text-stone-600 mt-1 max-w-[62px] truncate font-medium">
                {story.username}
              </span>
            </button>
          ))}
        </section>

        {/* Post 1: matching uploaded reference screenshot */}
        <article className="pt-3 pb-4 border-b border-stone-100">
          {/* Post Header */}
          <div className="px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="p-0.5 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500">
                <MottathalaAvatar size="sm" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-stone-900 leading-tight">
                  mrbright
                </span>
                <span className="text-[10px] text-stone-400 font-medium">Europe</span>
              </div>
            </div>

            <button
              className="text-stone-400 hover:text-stone-900 transition-colors"
              aria-label="More options"
            >
              <MoreHorizontal size={18} />
            </button>
          </div>

          {/* Post Image (with double tap interaction) */}
          <div
            className="px-3 py-1 relative cursor-pointer"
            onDoubleClick={handleDoubleTapPost1}
          >
            <MottathalaPostCard index={1} variant="feed" />

            {/* Double Tap Heart Animation */}
            {showHeartBurst1 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 animate-ping">
                <Heart size={84} className="fill-rose-500 text-rose-500 drop-shadow-2xl" />
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="px-4 pt-3 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike1}
                className="transition-transform active:scale-125 focus:outline-none"
                aria-label="Like"
              >
                <Heart
                  size={24}
                  className={
                    isLiked1
                      ? "fill-rose-500 text-rose-500 transition-colors"
                      : "text-stone-800 hover:text-stone-600 transition-colors"
                  }
                  strokeWidth={1.8}
                />
              </button>

              <button
                onClick={() => setActiveCommentPost("mrbright")}
                className="text-stone-800 hover:text-stone-600 transition-colors"
                aria-label="Comment"
              >
                <MessageCircle size={23} strokeWidth={1.8} />
              </button>

              <button
                onClick={() => alert("Shared Mottathala Izaakutty post!")}
                className="text-stone-800 hover:text-stone-600 transition-colors"
                aria-label="Share"
              >
                <Send size={21} strokeWidth={1.8} className="-rotate-12" />
              </button>
            </div>

            <button
              onClick={() => setIsSaved1(!isSaved1)}
              className="text-stone-800 hover:text-stone-600 transition-colors"
              aria-label="Save"
            >
              <Bookmark
                size={23}
                strokeWidth={1.8}
                className={isSaved1 ? "fill-stone-900 text-stone-900" : ""}
              />
            </button>
          </div>

          {/* Likes & Caption */}
          <div className="px-4 pt-2 space-y-1 text-left">
            <div className="flex items-center space-x-1.5 text-xs text-stone-800">
              <div className="w-4 h-4 rounded-full overflow-hidden flex-shrink-0">
                <MottathalaAvatar size="xs" />
              </div>
              <span>
                Liked by <strong className="font-bold">angryswan</strong> and{" "}
                <strong className="font-bold">{likesCount1} others</strong>
              </span>
            </div>

            <p className="text-xs text-stone-900 leading-relaxed">
              <strong className="font-bold mr-1.5">mrbright</strong>
              Hey everyone guys. Hope all is well with you. We&apos;re starting a series of
              neon shots that we took...{" "}
              <button className="text-stone-400 font-medium hover:underline">
                more
              </button>
            </p>

            <button
              onClick={() => setActiveCommentPost("mrbright")}
              className="text-[11px] text-stone-400 font-medium block pt-0.5 hover:text-stone-600"
            >
              View all 42 comments
            </button>

            <span className="text-[9px] text-stone-400 uppercase tracking-wider block">
              2 hours ago
            </span>
          </div>
        </article>

        {/* Post 2: Linking to anronkai profile */}
        <article className="pt-3 pb-4">
          <div className="px-4 py-2 flex items-center justify-between">
            <button
              onClick={onNavigateToProfile}
              className="flex items-center space-x-2.5 text-left group focus:outline-none"
            >
              <div className="p-0.5 rounded-full bg-gradient-to-tr from-rose-500 to-purple-600">
                <MottathalaAvatar size="sm" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-stone-900 group-hover:text-sky-600 transition-colors">
                  anronkai
                </span>
                <span className="text-[10px] text-stone-400 font-medium">Ukraine, Kyiv</span>
              </div>
            </button>

            <button className="text-stone-400 hover:text-stone-900">
              <MoreHorizontal size={18} />
            </button>
          </div>

          <div
            className="px-3 py-1 relative cursor-pointer"
            onClick={onNavigateToProfile}
          >
            <MottathalaPostCard index={2} variant="feed" />
          </div>

          <div className="px-4 pt-3 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setIsLiked2(!isLiked2);
                  setLikesCount2((c) => (isLiked2 ? c - 1 : c + 1));
                }}
              >
                <Heart
                  size={24}
                  className={
                    isLiked2
                      ? "fill-rose-500 text-rose-500"
                      : "text-stone-800 hover:text-stone-600"
                  }
                  strokeWidth={1.8}
                />
              </button>
              <button onClick={() => setActiveCommentPost("anronkai")}>
                <MessageCircle size={23} strokeWidth={1.8} />
              </button>
              <button onClick={() => alert("Shared Mottathala Izaakutty post!")}>
                <Send size={21} strokeWidth={1.8} className="-rotate-12" />
              </button>
            </div>
            <button onClick={() => setIsSaved2(!isSaved2)}>
              <Bookmark
                size={23}
                strokeWidth={1.8}
                className={isSaved2 ? "fill-stone-900 text-stone-900" : ""}
              />
            </button>
          </div>

          <div className="px-4 pt-2 space-y-1 text-left">
            <div className="flex items-center space-x-1.5 text-xs text-stone-800">
              <MottathalaAvatar size="xs" />
              <span>
                Liked by <strong className="font-bold">mrbright</strong> and{" "}
                <strong className="font-bold">{likesCount2} others</strong>
              </span>
            </div>

            <p className="text-xs text-stone-900 leading-relaxed">
              <strong className="font-bold mr-1.5">anronkai</strong>
              Designing consistent, clean interfaces with bold typography.
            </p>
          </div>
        </article>
      </div>

      {/* Floating Bottom Navigation Bar */}
      <BottomNavBar activeTab={activeNavTab} onTabChange={onNavTabChange} />

      {/* Story Viewer Modal */}
      {activeStoryUser && (
        <StoryModal
          isOpen={!!activeStoryUser}
          username={activeStoryUser}
          onClose={() => setActiveStoryUser(null)}
        />
      )}

      {/* Comments Modal */}
      {activeCommentPost && (
        <CommentModal
          isOpen={!!activeCommentPost}
          postAuthor={activeCommentPost}
          onClose={() => setActiveCommentPost(null)}
        />
      )}
    </div>
  );
}
