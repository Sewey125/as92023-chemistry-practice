"use client";

import React, { useEffect, useState } from "react";
import { X, Heart, Send } from "lucide-react";
import { MottathalaAvatar } from "./MottathalaMedia";

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
}

export function StoryModal({ isOpen, onClose, username }: StoryModalProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onClose();
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm aspect-[9/16] bg-[#0d0d0f] rounded-[36px] overflow-hidden border border-white/10 shadow-2xl flex flex-col justify-between p-5 text-white">
        {/* Top Progress Bar */}
        <div>
          <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden mb-3">
            <div
              className="bg-white h-full transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Author Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="p-0.5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600">
                <MottathalaAvatar size="sm" />
              </div>
              <div>
                <span className="text-xs font-semibold">{username}</span>
                <span className="text-[10px] text-stone-400 ml-2">2h</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1 text-stone-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Central Story Media (White Background with Black Text) */}
        <div className="my-auto w-full aspect-[4/5] bg-white text-black rounded-[24px] p-6 flex flex-col items-center justify-center text-center shadow-2xl border border-stone-200">
          <span className="text-[10px] font-mono tracking-widest text-stone-400 uppercase mb-2">
            INSTAGRAM STORY
          </span>
          <h2 className="text-3xl font-black uppercase tracking-tight text-black leading-tight">
            Mottathala
            <br />
            Izaakutty
          </h2>
          <span className="text-[9px] font-mono text-stone-500 mt-4 tracking-wider">
            @ {username}
          </span>
        </div>

        {/* Bottom Reply Bar */}
        <div className="flex items-center space-x-2.5">
          <div className="flex-1 rounded-full border border-white/20 px-4 py-2 text-xs text-stone-400 bg-white/5 flex items-center justify-between">
            <span>Send message...</span>
          </div>
          <button className="p-2 text-white hover:text-rose-500 transition-colors">
            <Heart size={20} />
          </button>
          <button className="p-2 text-white hover:text-stone-300 transition-colors">
            <Send size={18} className="-rotate-12" />
          </button>
        </div>
      </div>
    </div>
  );
}
