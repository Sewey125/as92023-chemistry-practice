"use client";

import React, { useState } from "react";
import {
  MoreHorizontal,
  Heart,
  MessageCircle,
  Bookmark,
  Send,
  Plus,
} from "lucide-react";
import { MottathalaAvatar, MottathalaPostCard } from "./MottathalaMedia";
import { StoryModal } from "./StoryModal";
import { CommentModal } from "./CommentModal";

interface InstagramFeedProps {
  onNavigateToProfile?: () => void;
}

export function InstagramFeed({ onNavigateToProfile }: InstagramFeedProps) {
  const [isLiked1, setIsLiked1] = useState(false);
  const [likesCount1, setLikesCount1] = useState(800);
  const [isSaved1, setIsSaved1] = useState(false);

  const [isLiked2, setIsLiked2] = useState(false);
  const [likesCount2, setLikesCount2] = useState(1240);
  const [isSaved2, setIsSaved2] = useState(false);

  const [isLiked3, setIsLiked3] = useState(true);
  const [likesCount3, setLikesCount3] = useState(412);
  const [isSaved3, setIsSaved3] = useState(false);

  const [activeStoryUser, setActiveStoryUser] = useState<string | null>(null);
  const [activeCommentPost, setActiveCommentPost] = useState<string | null>(null);
  const [showHeartBurst1, setShowHeartBurst1] = useState(false);
  const [showHeartBurst2, setShowHeartBurst2] = useState(false);

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
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 py-4 sm:py-7 flex justify-center lg:justify-between items-start">
      {/* Main Center Feed Stream */}
      <div className="w-full max-w-[490px] flex flex-col space-y-4">
        {/* Stories Card Bar */}
        <section className="bg-white border border-stone-200/90 rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 shadow-xs overflow-hidden">
          <div className="flex items-center space-x-4 overflow-x-auto no-scrollbar py-0.5">
            {stories.map((story) => (
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

                <span className="text-[11px] text-stone-600 mt-1 max-w-[66px] truncate font-medium">
                  {story.username}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Post 1: mrbright */}
        <article className="bg-white border border-stone-200/90 rounded-2xl sm:rounded-3xl shadow-xs overflow-hidden">
          {/* Post Header */}
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-0.5 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500">
                <MottathalaAvatar size="sm" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs sm:text-sm font-bold text-stone-900 leading-tight">
                  mrbright
                </span>
                <span className="text-[10px] text-stone-400 font-medium">Europe</span>
              </div>
            </div>

            <button
              className="text-stone-400 hover:text-stone-900 transition-colors p-1"
              aria-label="More options"
            >
              <MoreHorizontal size={18} />
            </button>
          </div>

          {/* Post Image (White Background with Black Text) */}
          <div
            className="px-3 py-1 relative cursor-pointer"
            onDoubleClick={handleDoubleTapPost1}
          >
            <MottathalaPostCard index={1} variant="feed" />

            {showHeartBurst1 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 animate-ping">
                <Heart size={88} className="fill-rose-500 text-rose-500 drop-shadow-2xl" />
              </div>
            )}
          </div>

          {/* Action Buttons Row */}
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
                onClick={() => alert("Shared post!")}
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

          {/* Likes & Caption Area */}
          <div className="px-4 pt-2.5 pb-4 space-y-1.5 text-left">
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-stone-800">
              <div className="w-4 h-4 rounded-full overflow-hidden flex-shrink-0">
                <MottathalaAvatar size="xs" />
              </div>
              <span>
                Liked by <strong className="font-bold text-stone-900">angryswan</strong> and{" "}
                <strong className="font-bold text-stone-900">{likesCount1.toLocaleString()} others</strong>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-900 leading-relaxed">
              <strong className="font-bold mr-1.5">mrbright</strong>
              Hey everyone guys. Hope all is well with you. We&apos;re starting a series of
              neon shots that we took...{" "}
              <button className="text-stone-400 font-medium hover:underline">more</button>
            </p>

            <button
              onClick={() => setActiveCommentPost("mrbright")}
              className="text-xs text-stone-400 font-medium block pt-0.5 hover:text-stone-600"
            >
              View all 42 comments
            </button>

            <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-mono">
              2 hours ago
            </span>
          </div>
        </article>

        {/* Post 2: anronkai */}
        <article className="bg-white border border-stone-200/90 rounded-2xl sm:rounded-3xl shadow-xs overflow-hidden">
          <div className="px-4 py-3 flex items-center justify-between">
            <button
              onClick={onNavigateToProfile}
              className="flex items-center space-x-3 text-left group focus:outline-none"
            >
              <div className="p-0.5 rounded-full bg-gradient-to-tr from-rose-500 to-purple-600">
                <MottathalaAvatar size="sm" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-sky-600 transition-colors">
                  anronkai
                </span>
                <span className="text-[10px] text-stone-400 font-medium">Ukraine, Kyiv</span>
              </div>
            </button>

            <button className="text-stone-400 hover:text-stone-900 p-1">
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
              <button onClick={() => alert("Shared post!")}>
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

          <div className="px-4 pt-2.5 pb-4 space-y-1.5 text-left">
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-stone-800">
              <MottathalaAvatar size="xs" />
              <span>
                Liked by <strong className="font-bold text-stone-900">mrbright</strong> and{" "}
                <strong className="font-bold text-stone-900">{likesCount2.toLocaleString()} others</strong>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-900 leading-relaxed">
              <strong className="font-bold mr-1.5">anronkai</strong>
              Crafting clean and consistent interfaces with bold typography.
            </p>

            <button
              onClick={() => setActiveCommentPost("anronkai")}
              className="text-xs text-stone-400 font-medium block pt-0.5 hover:text-stone-600"
            >
              View all 18 comments
            </button>

            <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-mono">
              5 hours ago
            </span>
          </div>
        </article>
      </div>

      {/* Desktop Suggested Sidebar */}
      <aside className="hidden lg:block w-72 pl-6 sticky top-20 text-left">
        {/* Current User Row */}
        <div className="flex items-center justify-between py-2">
          <button
            onClick={onNavigateToProfile}
            className="flex items-center space-x-3 group text-left"
          >
            <MottathalaAvatar size="md" />
            <div>
              <span className="text-xs font-bold text-stone-900 group-hover:text-sky-600 block">
                anronkai
              </span>
              <span className="text-[11px] text-stone-500">Anton Lapko</span>
            </div>
          </button>
          <button
            onClick={onNavigateToProfile}
            className="text-xs font-bold text-sky-600 hover:text-sky-800"
          >
            Switch
          </button>
        </div>

        {/* Suggestions For You Header */}
        <div className="mt-6 flex items-center justify-between text-xs font-bold">
          <span className="text-stone-400">Suggestions For You</span>
          <button className="text-stone-800 hover:text-stone-500">See All</button>
        </div>

        {/* Suggestions List */}
        <div className="mt-4 space-y-3.5">
          {[
            { user: "silverfrog", subtitle: "Followed by angryswan" },
            { user: "sadpanda", subtitle: "Suggested for you" },
            { user: "angryswan", subtitle: "Popular designer" },
          ].map((item) => (
            <div key={item.user} className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <MottathalaAvatar size="sm" />
                <div>
                  <span className="text-xs font-bold text-stone-900 block">{item.user}</span>
                  <span className="text-[10px] text-stone-400">{item.subtitle}</span>
                </div>
              </div>
              <button
                onClick={() => alert(`Followed ${item.user}`)}
                className="text-xs font-bold text-sky-600 hover:text-sky-800"
              >
                Follow
              </button>
            </div>
          ))}
        </div>

        {/* Subtle Footer Links */}
        <div className="mt-8 text-[11px] text-stone-400 space-y-2 leading-relaxed">
          <p>About • Help • Press • API • Jobs • Privacy • Terms</p>
          <p>© 2026 INSTAGRAM FROM META</p>
        </div>
      </aside>

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
