import React from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";

export function Hero() {
  return (
    <section className="w-full max-w-4xl mx-auto px-6 pt-6 pb-10 text-center">
      {/* Top badge */}
      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-stone-200/70 border border-stone-300/60 text-xs font-medium text-stone-700 mb-6">
        <Sparkles size={12} className="text-stone-800" />
        <span>Official NZQA Marking Standards &amp; Examiner Criteria</span>
      </div>

      {/* Main Alcove-style Hero Typography */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.12]">
        Practice AS 92023
        <br />
        for{" "}
        <mark className="bg-[#F8B4C0] px-3.5 py-0.5 rounded-xl text-stone-900 inline-block font-extrabold shadow-sm">
          Excellence
        </mark>
      </h1>

      {/* Subtitle */}
      <p className="mt-5 text-base sm:text-lg text-stone-600 max-w-2xl mx-auto font-normal leading-relaxed">
        Demonstrate understanding of how the physical properties of materials
        inform their use. Receive instant, particle-level NZQA examiner feedback
        on your answers.
      </p>

      {/* Key pills */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-stone-600 font-medium">
        <span className="inline-flex items-center px-3 py-1 rounded-lg bg-stone-200/60 border border-stone-300/40">
          <CheckCircle2 size={13} className="mr-1.5 text-stone-700" />
          5 Official Material Types
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-lg bg-stone-200/60 border border-stone-300/40">
          <CheckCircle2 size={13} className="mr-1.5 text-stone-700" />
          Vague Terminology Detector
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-lg bg-stone-200/60 border border-stone-300/40">
          <CheckCircle2 size={13} className="mr-1.5 text-stone-700" />
          100% Free to Run
        </span>
      </div>
    </section>
  );
}
