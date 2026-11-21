"use client";

import React from "react";

interface MottathalaAvatarProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function MottathalaAvatar({ size = "md", className = "" }: MottathalaAvatarProps) {
  const sizeClasses = {
    xs: "w-6 h-6 text-[4.5px] p-0.5",
    sm: "w-9 h-9 text-[6.5px] p-1",
    md: "w-12 h-12 text-[8px] p-1.5",
    lg: "w-16 h-16 text-[9.5px] p-2",
    xl: "w-20 h-20 text-[11px] p-2.5",
  }[size];

  return (
    <div
      className={`rounded-full bg-white text-black font-extrabold flex items-center justify-center text-center leading-[1.05] tracking-tight border border-stone-300 shadow-xs select-none uppercase overflow-hidden ${sizeClasses} ${className}`}
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
        className={`aspect-square bg-white text-black border border-stone-200/90 rounded-2xl flex flex-col items-center justify-center p-3 text-center cursor-pointer hover:shadow-md hover:border-stone-400 active:scale-[0.98] transition-all select-none relative group overflow-hidden ${className}`}
      >
        <span className="text-[10px] sm:text-xs font-black tracking-tight uppercase leading-tight">
          Mottathala Izaakutty
        </span>
        <span className="text-[8px] text-stone-400 font-mono mt-1">
          #{String(index).padStart(2, "0")}
        </span>
      </div>
    );
  }

  // Feed variant: large card with rounded corners matching the UI mockup
  return (
    <div
      onClick={onClick}
      className={`w-full aspect-[4/3.8] bg-white text-black border border-stone-200/90 rounded-[28px] flex flex-col items-center justify-center p-6 text-center select-none relative shadow-sm hover:shadow-md transition-shadow group overflow-hidden ${className}`}
    >
      {/* Subtle minimalist frame accents in black on white */}
      <div className="absolute top-4 left-5 flex items-center space-x-1.5 opacity-40">
        <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
        <span className="text-[9px] font-mono tracking-widest text-black">SERIES NO. {index}</span>
      </div>

      <div className="absolute top-4 right-5 text-[9px] font-mono tracking-widest text-black opacity-40">
        EDITION // 2026
      </div>

      {/* Main bold title */}
      <div className="my-auto flex flex-col items-center justify-center space-y-1">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight uppercase text-black leading-none">
          Mottathala
        </h2>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight uppercase text-black leading-none">
          Izaakutty
        </h2>
        <p className="text-[10px] font-mono tracking-widest uppercase text-stone-500 mt-2">
          [ AUTHENTIC PROTOTYPE MEDIA ]
        </p>
      </div>

      {/* Bottom subtle barcode/caption decoration */}
      <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between opacity-35 text-[8px] font-mono text-black">
        <span>ISO-100 • 35MM</span>
        <span>MOTTATHALA IZAAKUTTY</span>
        <span>VERIFIED</span>
      </div>
    </div>
  );
}
