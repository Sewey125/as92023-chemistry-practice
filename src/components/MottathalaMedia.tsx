"use client";

import React from "react";

interface MottathalaAvatarProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
}

export function MottathalaAvatar({ size = "md", className = "" }: MottathalaAvatarProps) {
  const sizeClasses = {
    xs: "w-6 h-6 text-[4.5px] p-0.5",
    sm: "w-9 h-9 text-[6.5px] p-1",
    md: "w-12 h-12 text-[8px] p-1.5",
    lg: "w-16 h-16 text-[9.5px] p-2",
    xl: "w-24 h-24 sm:w-28 sm:h-28 text-[11px] sm:text-xs p-3",
    "2xl": "w-32 h-32 sm:w-36 sm:h-36 text-xs sm:text-sm p-4",
  }[size];

  return (
    <div
      className={`rounded-full bg-white text-black font-extrabold flex items-center justify-center text-center leading-[1.08] tracking-tight border border-stone-200 shadow-xs select-none uppercase overflow-hidden ${sizeClasses} ${className}`}
      title="Mottathala Izaakutty"
    >
      <span>Mottathala Izaakutty</span>
    </div>
  );
}

interface MottathalaPostCardProps {
  index?: number;
  variant?: "feed" | "grid";
  onClick?: () => void;
  className?: string;
}

export function MottathalaPostCard({
  index = 1,
  variant = "feed",
  onClick,
  className = "",
}: MottathalaPostCardProps) {
  if (variant === "grid") {
    return (
      <div
        onClick={onClick}
        className={`aspect-square bg-white text-black border border-stone-200/90 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center p-3 text-center cursor-pointer hover:shadow-md hover:border-stone-400 active:scale-[0.99] transition-all select-none relative group overflow-hidden ${className}`}
      >
        <span className="text-[11px] sm:text-sm font-black tracking-tight uppercase leading-tight">
          Mottathala Izaakutty
        </span>
        <span className="text-[9px] sm:text-[10px] text-stone-400 font-mono mt-1">
          #{String(index).padStart(2, "0")}
        </span>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-[10px] font-bold text-black uppercase tracking-wider bg-white/90 px-2.5 py-1 rounded-full shadow-xs">
            View Post
          </span>
        </div>
      </div>
    );
  }

  // Feed variant: large card with rounded corners
  return (
    <div
      onClick={onClick}
      className={`w-full aspect-[4/4] sm:aspect-[4/3.8] bg-white text-black border border-stone-200/90 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center p-6 sm:p-8 text-center select-none relative shadow-xs hover:shadow-sm transition-shadow group overflow-hidden ${className}`}
    >
      {/* Top subtle indicators */}
      <div className="absolute top-4 left-5 flex items-center space-x-1.5 opacity-40">
        <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
        <span className="text-[9px] font-mono tracking-widest text-black">SERIES NO. {index}</span>
      </div>

      <div className="absolute top-4 right-5 text-[9px] font-mono tracking-widest text-black opacity-40">
        ORIGINAL MEDIA
      </div>

      {/* Main bold title */}
      <div className="my-auto flex flex-col items-center justify-center space-y-1">
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase text-black leading-none">
          Mottathala
        </h2>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase text-black leading-none">
          Izaakutty
        </h2>
        <p className="text-[11px] font-mono tracking-widest uppercase text-stone-500 mt-3">
          [ 100% ORIGINAL POST ]
        </p>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between opacity-35 text-[9px] font-mono text-black">
        <span>ISO-100 • 35MM</span>
        <span>MOTTATHALA IZAAKUTTY</span>
        <span>AUTHENTIC</span>
      </div>
    </div>
  );
}
