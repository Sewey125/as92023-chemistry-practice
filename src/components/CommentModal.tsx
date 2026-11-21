"use client";

import React, { useState } from "react";
import { X, Heart, Send } from "lucide-react";
import { MottathalaAvatar } from "./MottathalaMedia";

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  postAuthor: string;
}

export function CommentModal({ isOpen, onClose, postAuthor }: CommentModalProps) {
  const [comments, setComments] = useState<Array<{ id: number; user: string; text: string; time: string; likes: number }>>([
    {
      id: 1,
      user: "angryswan",
      text: "Unbelievable layout! The typography on Mottathala Izaakutty is so clean.",
      time: "1h",
      likes: 14,
    },
    {
      id: 2,
      user: "sadpanda",
      text: "Minimalist aesthetic perfection! 🖤",
      time: "45m",
      likes: 8,
    },
    {
      id: 3,
      user: "silverfrog",
      text: "Need this exact prototype design system everywhere.",
      time: "12m",
      likes: 3,
    },
  ]);
  const [inputText, setInputText] = useState("");

  if (!isOpen) return null;

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setComments([
      ...comments,
      {
        id: Date.now(),
        user: "you",
        text: inputText.trim(),
        time: "Just now",
        likes: 0,
      },
    ]);
    setInputText("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-t-[32px] sm:rounded-[32px] overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[80vh] h-[520px]">
        {/* Header */}
        <div className="p-4 border-b border-stone-100 flex items-center justify-between text-center relative">
          <div className="w-8"></div>
          <h3 className="text-sm font-bold text-stone-900">Comments</h3>
          <button onClick={onClose} className="p-1 text-stone-400 hover:text-stone-700">
            <X size={20} />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Post Author Pin */}
          <div className="flex items-start space-x-3 pb-3 border-b border-stone-100">
            <MottathalaAvatar size="sm" />
            <div className="flex-1 text-xs">
              <span className="font-bold text-stone-900">{postAuthor}</span>
              <p className="text-stone-700 mt-0.5 leading-relaxed">
                Starting a series of minimalist design shots featuring Mottathala Izaakutty!
              </p>
              <span className="text-[10px] text-stone-400 mt-1 inline-block">Author</span>
            </div>
          </div>

          {/* User Comments */}
          {comments.map((c) => (
            <div key={c.id} className="flex items-start justify-between space-x-3">
              <div className="flex items-start space-x-3">
                <MottathalaAvatar size="sm" />
                <div className="text-xs">
                  <span className="font-bold text-stone-900 mr-2">{c.user}</span>
                  <span className="text-stone-700">{c.text}</span>
                  <div className="flex items-center space-x-3 mt-1 text-[10px] text-stone-400 font-medium">
                    <span>{c.time}</span>
                    <span>Reply</span>
                    {c.likes > 0 && <span>{c.likes} likes</span>}
                  </div>
                </div>
              </div>

              <button className="text-stone-300 hover:text-rose-500 pt-1">
                <Heart size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleAddComment} className="p-3 border-t border-stone-100 bg-stone-50 flex items-center space-x-2.5">
          <MottathalaAvatar size="sm" />
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Add a comment for ${postAuthor}...`}
            className="flex-1 bg-white border border-stone-200 rounded-full px-4 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="text-sky-600 disabled:opacity-40 font-bold text-xs px-2 py-1"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
