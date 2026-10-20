"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ApiKeyModal } from "@/components/ApiKeyModal";
import {
  BookOpen,
  ArrowRight,
  Award,
  CheckCircle2,
  Atom,
  PenTool,
  Layers,
  Activity,
  Table as TableIcon,
  Search,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Check,
  Eye,
  EyeOff,
  Filter,
} from "lucide-react";

type TabId =
  | "all"
  | "spac"
  | "metallic"
  | "ionic"
  | "networks"
  | "molecular"
  | "polymers"
  | "lab";

interface TabItem {
  id: TabId;
  label: string;
  badge: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const TABS: TabItem[] = [
  { id: "all", label: "All Notes", badge: "Complete", icon: BookOpen },
  { id: "spac", label: "SPAC Writing Formula", badge: "Excellence", icon: Award },
  { id: "metallic", label: "1. Metallic & Alloys", badge: "3D Network", icon: Atom },
  { id: "ionic", label: "2. Ionic Substances", badge: "Brittleness & Ions", icon: Layers },
  { id: "networks", label: "3. Carbon Networks", badge: "Diamond & Graphite", icon: Atom },
  { id: "molecular", label: "4. Molecular & Polarity", badge: "Discrete & IMF", icon: Activity },
  { id: "polymers", label: "5. Polymers & Hydrocarbons", badge: "Alkanes & LDPE", icon: Layers },
  { id: "lab", label: "6. 12-Substance Lab Table", badge: "Observations", icon: TableIcon },
];

export default function NotesPage() {
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedExemplars, setExpandedExemplars] = useState<Record<string, boolean>>({
    paddle: true,
    zn: true,
  });

  useEffect(() => {
    const saved = localStorage.getItem("as92023_gemini_key");
    if (saved) {
      setApiKey(saved);
    }
  }, []);

  const toggleExemplar = (key: string) => {
    setExpandedExemplars((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const shouldShowSection = (sectionId: TabId, textKeywords: string[]) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return textKeywords.some((kw) => kw.toLowerCase().includes(q));
    }
    if (activeTab === "all") return true;
    return activeTab === sectionId;
  };

  return (
    <div className="min-h-screen bg-[#FAF5ED] text-stone-900 flex flex-col font-sans selection:bg-[#F8B4C0] selection:text-stone-900">
      {/* Header */}
      <Header
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        hasCustomKey={!!apiKey}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-20 w-full space-y-8">
        {/* Page Hero Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-stone-200/70 border border-stone-300/60 text-xs font-medium text-stone-700">
            <BookOpen size={12} className="text-stone-800" />
            <span>NCEA Level 1 Chemistry &amp; Biology AS 92023</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900">
            Revision Notes &amp; Illustrated Guide
          </h1>

          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
            All core concepts, precision vector diagrams, and model exam answers
            organized into clear, focused study modules.
          </p>
        </div>

        {/* Search & Topic Filter Bar */}
        <div className="bg-[#F2E9DE] rounded-3xl p-4 sm:p-5 border border-stone-300/70 shadow-xs space-y-3">
          {/* Search Input */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
            />
            <input
              type="text"
              placeholder="Search notes (e.g. malleability, 3D network, conductivity, graphite, NH₄⁺, solubility)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-stone-300 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-stone-900 shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-stone-500 hover:text-stone-800"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-thin text-xs">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id && !searchQuery.trim();
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSearchQuery("");
                  }}
                  className={`inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-all shadow-xs ${
                    isActive
                      ? "bg-stone-900 text-white"
                      : "bg-white/90 text-stone-700 hover:bg-stone-100 border border-stone-200/90"
                  }`}
                >
                  <Icon size={13} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Filter Notice */}
        {searchQuery.trim() && (
          <div className="flex items-center justify-between px-4 py-2 bg-stone-200/60 rounded-xl text-xs text-stone-700">
            <span>
              Showing search results matching: <strong>&quot;{searchQuery}&quot;</strong>
            </span>
            <button
              onClick={() => setSearchQuery("")}
              className="underline font-semibold hover:text-stone-950"
            >
              Reset to all topics
            </button>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODULE: SPAC Writing Formula & 6-Step Excellence Sequence      */}
        {/* ------------------------------------------------------------- */}
        {shouldShowSection("spac", [
          "spac",
          "framework",
          "mnemonic",
          "substance",
          "particles",
          "attraction",
          "consequence",
          "excellence",
          "aluminium",
          "paddle",
        ]) && (
          <section className="bg-[#F2E9DE] rounded-3xl p-6 sm:p-8 border border-stone-300/70 shadow-sm space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <Award size={22} className="text-stone-800" />
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-stone-900">
                  The SPAC Answering Formula
                </h2>
              </div>
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#F8B4C0] text-stone-900 border border-stone-300/40">
                Official NCEA Writing Mnemonic
              </span>
            </div>

            {/* SPAC Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 bg-white/95 rounded-2xl border border-stone-300/70 shadow-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-stone-900 text-sm">
                    S — Substance
                  </span>
                  <span className="text-[10px] font-semibold text-stone-500 uppercase">
                    Step 1
                  </span>
                </div>
                <p className="text-stone-700 leading-relaxed">
                  Identify the classification clearly: <em>metallic solid, ionic compound, covalent network,
                  covalent molecular substance, or polymer</em>.
                </p>
                <div className="text-[11px] text-stone-500 font-mono bg-[#FAF5ED] p-2 rounded-lg border border-stone-200">
                  &quot;Aluminium is a metallic solid...&quot;
                </div>
              </div>

              <div className="p-4 bg-white/95 rounded-2xl border border-stone-300/70 shadow-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-stone-900 text-sm">
                    P — Particles &amp; Structure
                  </span>
                  <span className="text-[10px] font-semibold text-stone-500 uppercase">
                    Step 2
                  </span>
                </div>
                <p className="text-stone-700 leading-relaxed">
                  Name the constituent particles and how they are arranged in a <strong>3D network</strong> or
                  discrete molecules.
                </p>
                <div className="text-[11px] text-stone-500 font-mono bg-[#FAF5ED] p-2 rounded-lg border border-stone-200">
                  &quot;...composed of positive ions in a 3D network with delocalised valence electrons...&quot;
                </div>
              </div>

              <div className="p-4 bg-white/95 rounded-2xl border border-stone-300/70 shadow-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-stone-900 text-sm">
                    A — Attractive Forces
                  </span>
                  <span className="text-[10px] font-semibold text-stone-500 uppercase">
                    Step 3
                  </span>
                </div>
                <p className="text-stone-700 leading-relaxed">
                  State the specific electrostatic bond: <em>metallic bonds, ionic bonds, continuous covalent bonds,
                  or weak intermolecular forces</em>.
                </p>
                <div className="text-[11px] text-stone-500 font-mono bg-[#FAF5ED] p-2 rounded-lg border border-stone-200">
                  &quot;...held by non-directional metallic bonds throughout the 3D network...&quot;
                </div>
              </div>

              <div className="p-4 bg-white/95 rounded-2xl border border-stone-300/70 shadow-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-stone-900 text-sm">
                    C — Consequence to Use
                  </span>
                  <span className="text-[10px] font-semibold text-stone-500 uppercase">
                    Step 4
                  </span>
                </div>
                <p className="text-stone-700 leading-relaxed">
                  Explain the physical mechanism and directly connect it to the object&apos;s real-world use.
                </p>
                <div className="text-[11px] text-stone-500 font-mono bg-[#FAF5ED] p-2 rounded-lg border border-stone-200">
                  &quot;...layers slide without breaking, allowing extrusion into hollow paddle shafts.&quot;
                </div>
              </div>
            </div>

            {/* 6-Step Excellence Sequence Flow */}
            <div className="bg-white/95 rounded-2xl p-5 border border-stone-300/80 shadow-xs space-y-3">
              <span className="font-extrabold text-stone-900 text-sm block">
                The 6-Step Excellence Progression
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-center text-xs font-bold text-stone-800">
                <div className="p-2.5 bg-[#FAF5ED] rounded-xl border border-stone-200">1. Substance</div>
                <div className="p-2.5 bg-[#FAF5ED] rounded-xl border border-stone-200">2. Particles</div>
                <div className="p-2.5 bg-[#FAF5ED] rounded-xl border border-stone-200">3. Bonding</div>
                <div className="p-2.5 bg-[#FAF5ED] rounded-xl border border-stone-200">4. Property</div>
                <div className="p-2.5 bg-[#FAF5ED] rounded-xl border border-stone-200">5. Condition</div>
                <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-300 text-emerald-950">
                  6. Evaluation
                </div>
              </div>

              {/* Collapsible Model Answer Comparison */}
              <div className="pt-2">
                <button
                  onClick={() => toggleExemplar("paddle")}
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-[#FAF5ED] hover:bg-stone-100 rounded-xl border border-stone-300/80 text-xs font-bold text-stone-800 transition-colors"
                >
                  <span className="flex items-center space-x-2">
                    {expandedExemplars["paddle"] ? <EyeOff size={14} /> : <Eye size={14} />}
                    <span>Excellence Exemplar: Kayak Paddle Shaft Comparison</span>
                  </span>
                  {expandedExemplars["paddle"] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>

                {expandedExemplars["paddle"] && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-xs">
                    <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5">
                      <span className="font-bold text-amber-950 block">
                        Weak Answer (Achieved Level Only)
                      </span>
                      <p className="text-stone-700 italic">
                        &quot;Aluminium is malleable and strong, so it can be made into a paddle shaft without breaking.&quot;
                      </p>
                      <p className="text-[11px] text-amber-900 pt-1">
                        <strong>Critique:</strong> Merely mentions properties. Does not name the particle type,
                        delocalised electron sea, non-directional bonding, or the layer-sliding mechanism.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
                      <span className="font-bold text-emerald-950 block">
                        Strong Answer (Excellence Level)
                      </span>
                      <p className="text-stone-800 leading-relaxed">
                        &quot;Aluminium is a metallic solid consisting of positive metal ions held in a
                        <strong> 3D network</strong> by non-directional metallic bonds to a sea of delocalised
                        electrons. When an external force is applied during manufacturing, rows of metal ions slide
                        past one another without breaking bonds because the electron sea freely adjusts. This makes
                        aluminium malleable, allowing it to be formed into a hollow tubular paddle shaft that resists
                        fracturing under paddling forces.&quot;
                      </p>
                      <p className="text-[11px] text-emerald-900 pt-1">
                        <strong>Critique:</strong> Complete chain: Substance → Particles → Non-directional bonds →
                        Sliding mechanism → Hollow tube shaping without fracture.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODULE 1: Metallic Substances & Alloys                        */}
        {/* ------------------------------------------------------------- */}
        {shouldShowSection("metallic", [
          "metallic",
          "metal",
          "alloy",
          "copper",
          "aluminium",
          "magnesium",
          "iron",
          "brass",
          "malleability",
          "ductility",
          "delocalised",
          "electrons",
          "3d network",
          "conductivity",
          "sliding",
        ]) && (
          <section className="bg-[#F2E9DE] rounded-3xl p-6 sm:p-8 border border-stone-300/70 shadow-sm space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <Atom size={22} className="text-stone-800" />
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-stone-900">
                  1. Metallic Substances &amp; Alloys
                </h2>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-white/90 text-stone-800 border border-stone-300/60">
                Examples: Cu wire, Mg ribbon, Al tubing, Brass
              </span>
            </div>

            {/* Recreated Vector Diagram: Metallic 3D Network */}
            <div className="bg-white/95 rounded-2xl p-5 border border-stone-300/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Recreated Diagram 1: Metallic 3D Network &amp; Electron Sea
                </span>
                <span className="text-[10px] font-semibold text-stone-500">
                  Non-Directional Bonding
                </span>
              </div>

              <div className="flex flex-col items-center justify-center p-4 bg-[#FAF5ED] rounded-xl border border-stone-200">
                <svg width="340" height="120" viewBox="0 0 340 120" className="overflow-visible">
                  {/* Rows of positive metal cations */}
                  {[30, 80, 130, 180, 230, 280].map((cx, i) => (
                    <g key={`mtop-${i}`}>
                      <circle cx={cx} cy="35" r="17" fill="#E8DDD0" stroke="#786B5A" strokeWidth="1.8" />
                      <text x={cx} y="40" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#3E3426">+</text>
                    </g>
                  ))}
                  {[30, 80, 130, 180, 230, 280].map((cx, i) => (
                    <g key={`mbot-${i}`}>
                      <circle cx={cx} cy="85" r="17" fill="#E8DDD0" stroke="#786B5A" strokeWidth="1.8" />
                      <text x={cx} y="90" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#3E3426">+</text>
                    </g>
                  ))}

                  {/* Delocalised valence electrons */}
                  {[55, 105, 155, 205, 255].map((ex, i) => (
                    <g key={`me1-${i}`}>
                      <circle cx={ex} cy="35" r="5" fill="#1C1917" />
                      <text x={ex} y="38" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#FFFFFF">e⁻</text>
                    </g>
                  ))}
                  {[55, 105, 155, 205, 255].map((ex, i) => (
                    <g key={`me2-${i}`}>
                      <circle cx={ex} cy="60" r="5" fill="#1C1917" />
                      <text x={ex} y="63" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#FFFFFF">e⁻</text>
                    </g>
                  ))}
                  {[55, 105, 155, 205, 255].map((ex, i) => (
                    <g key={`me3-${i}`}>
                      <circle cx={ex} cy="85" r="5" fill="#1C1917" />
                      <text x={ex} y="88" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#FFFFFF">e⁻</text>
                    </g>
                  ))}
                </svg>

                <div className="flex flex-wrap items-center justify-center gap-6 mt-3 text-xs text-stone-600">
                  <span className="flex items-center">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#E8DDD0] border border-[#786B5A] inline-block mr-1.5" />
                    Positive metal cation in 3D network
                  </span>
                  <span className="flex items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-stone-900 inline-block mr-1.5" />
                    Delocalised valence electrons (sea of e⁻)
                  </span>
                </div>
              </div>

              {/* Core Principles */}
              <div className="text-xs text-stone-700 leading-relaxed space-y-1.5 pt-1">
                <p>
                  1. Metals consist of <strong>metal ions</strong> arranged in a regular <strong>3D network</strong>.
                </p>
                <p>
                  2. <strong>Delocalised valence electrons</strong> move freely between the ions throughout the entire network.
                </p>
                <p>
                  3. The electrostatic attraction between the positive nuclei/cations and delocalised electrons is <strong>metallic bonding</strong>.
                </p>
                <p>
                  4. Because bonding is <strong>non-directional</strong>, electrons are attracted equally in all directions rather than between specific atom pairs.
                </p>
              </div>
            </div>

            {/* Recreated Vector Diagram: Layer Sliding (Malleability) */}
            <div className="bg-white/95 rounded-2xl p-5 border border-stone-300/80 space-y-3">
              <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                Recreated Diagram 2: Malleability Mechanism (Layer Sliding Without Repulsion)
              </span>

              <div className="flex flex-col items-center justify-center p-4 bg-[#FAF5ED] rounded-xl border border-stone-200">
                <svg width="340" height="90" viewBox="0 0 340 90">
                  {/* Before force */}
                  <g>
                    {[20, 45, 70, 95].map((cx, i) => (
                      <circle key={`sb1-${i}`} cx={cx} cy="30" r="10" fill="#E8DDD0" stroke="#786B5A" strokeWidth="1.5" />
                    ))}
                    {[20, 45, 70, 95].map((cx, i) => (
                      <circle key={`sb2-${i}`} cx={cx} cy="55" r="10" fill="#E8DDD0" stroke="#786B5A" strokeWidth="1.5" />
                    ))}
                    <text x="57" y="78" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#786B5A">Before Force</text>
                  </g>

                  {/* Shear Force Arrow */}
                  <g>
                    <line x1="125" y1="42" x2="165" y2="42" stroke="#1C1917" strokeWidth="2" />
                    <polygon points="165,38 175,42 165,46" fill="#1C1917" />
                    <text x="145" y="32" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#786B5A">Shear Force</text>
                  </g>

                  {/* After force: layers shifted */}
                  <g>
                    {[205, 230, 255, 280].map((cx, i) => (
                      <circle key={`sa1-${i}`} cx={cx} cy="30" r="10" fill="#E8DDD0" stroke="#786B5A" strokeWidth="1.5" />
                    ))}
                    {[225, 250, 275, 300].map((cx, i) => (
                      <circle key={`sa2-${i}`} cx={cx} cy="55" r="10" fill="#E8DDD0" stroke="#786B5A" strokeWidth="1.5" />
                    ))}
                    <text x="252" y="78" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#786B5A">Layers Slide Freely</text>
                  </g>
                </svg>

                <p className="text-xs text-stone-600 mt-2 text-center max-w-lg leading-relaxed">
                  The non-directional nature of metallic bonds permits rows of metal ions to slide past one
                  another under mechanical stress while maintaining continuous electrostatic attraction to the
                  delocalised electron sea.
                </p>
              </div>
            </div>

            {/* 6 Key Properties Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 bg-white/95 rounded-xl border border-stone-200 space-y-1">
                <span className="font-bold text-stone-900 block">1. High Tensile Strength</span>
                <p className="text-stone-700 leading-relaxed">
                  Extensive strong metallic bonds extending throughout the <strong>3D network</strong> require large forces to break.
                </p>
              </div>

              <div className="p-3.5 bg-white/95 rounded-xl border border-stone-200 space-y-1">
                <span className="font-bold text-stone-900 block">2. Electrical Conductivity</span>
                <p className="text-stone-700 leading-relaxed">
                  Delocalised electrons move freely through the <strong>3D network</strong> carrying an electric current when a voltage is applied.
                </p>
              </div>

              <div className="p-3.5 bg-white/95 rounded-xl border border-stone-200 space-y-1">
                <span className="font-bold text-stone-900 block">3. Thermal Conductivity</span>
                <p className="text-stone-700 leading-relaxed">
                  Free electrons transfer kinetic energy rapidly, and closely packed atoms pass heat vibrations to neighbours.
                </p>
              </div>

              <div className="p-3.5 bg-white/95 rounded-xl border border-stone-200 space-y-1">
                <span className="font-bold text-stone-900 block">4. Sonority (Ringing Tone)</span>
                <p className="text-stone-700 leading-relaxed">
                  Tightly packed metal atoms in the <strong>3D network</strong> propagate sound wave vibrations with minimal energy dampening.
                </p>
              </div>

              <div className="p-3.5 bg-white/95 rounded-xl border border-stone-200 space-y-1">
                <span className="font-bold text-stone-900 block">5. Metallic Lustre (Shiny)</span>
                <p className="text-stone-700 leading-relaxed">
                  Uniform closely packed cation layers reflect incoming light rays evenly without scattering.
                </p>
              </div>

              <div className="p-3.5 bg-white/95 rounded-xl border border-stone-200 space-y-1">
                <span className="font-bold text-stone-900 block">6. Alloy Strengthening</span>
                <p className="text-stone-700 leading-relaxed">
                  Different-sized solute atoms disrupt regular rows in the <strong>3D network</strong>, stopping layers from sliding easily.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODULE 2: Ionic Substances & Dissolution                      */}
        {/* ------------------------------------------------------------- */}
        {shouldShowSection("ionic", [
          "ionic",
          "nacl",
          "zncl2",
          "caco3",
          "ki",
          "brittle",
          "shatter",
          "solubility",
          "dissolution",
          "hydration",
          "ammonium",
          "nh4",
          "ions",
          "conduct",
          "molten",
          "aqueous",
        ]) && (
          <section className="bg-[#F2E9DE] rounded-3xl p-6 sm:p-8 border border-stone-300/70 shadow-sm space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <Layers size={22} className="text-stone-800" />
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-stone-900">
                  2. Ionic Substances
                </h2>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-white/90 text-stone-800 border border-stone-300/60">
                Examples: NaCl, CaCO₃, KI, ZnCl₂, NH₄Cl
              </span>
            </div>

            {/* Recreated Vector Diagram: Ionic 3D Network & Brittleness Repulsion */}
            <div className="bg-white/95 rounded-2xl p-5 border border-stone-300/80 space-y-3">
              <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                Recreated Diagram 3: Ionic 3D Network &amp; Brittleness (Like-Charge Repulsion)
              </span>

              <div className="flex flex-col items-center justify-center p-4 bg-[#FAF5ED] rounded-xl border border-stone-200">
                <svg width="340" height="110" viewBox="0 0 340 110">
                  {/* Intact 3D network */}
                  <g>
                    {[20, 50, 80].map((cx, i) => (
                      <circle key={`int1-${i}`} cx={cx} cy="30" r="11" fill={i % 2 === 0 ? "#E4D5BE" : "#C8D9C5"} stroke="#57534E" strokeWidth="1.2" />
                    ))}
                    {[20, 50, 80].map((cx, i) => (
                      <circle key={`int2-${i}`} cx={cx} cy="55" r="11" fill={i % 2 === 0 ? "#C8D9C5" : "#E4D5BE"} stroke="#57534E" strokeWidth="1.2" />
                    ))}
                    <text x="50" y="80" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#786B5A">Intact 3D Network</text>
                  </g>

                  {/* Impact Force */}
                  <g>
                    <line x1="110" y1="42" x2="145" y2="42" stroke="#1C1917" strokeWidth="2" />
                    <polygon points="145,38 155,42 145,46" fill="#1C1917" />
                    <text x="130" y="32" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#786B5A">Hammer Force</text>
                  </g>

                  {/* Shifted row causing repulsion */}
                  <g>
                    <circle cx="215" cy="30" r="11" fill="#E4D5BE" stroke="#57534E" strokeWidth="1.2" />
                    <circle cx="245" cy="30" r="11" fill="#C8D9C5" stroke="#57534E" strokeWidth="1.2" />
                    <circle cx="275" cy="30" r="11" fill="#E4D5BE" stroke="#57534E" strokeWidth="1.2" />
                    <text x="215" y="34" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#3E3426">+</text>
                    <text x="245" y="34" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#3E3426">-</text>
                    <text x="275" y="34" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#3E3426">+</text>

                    {/* Aligned like charges */}
                    <circle cx="215" cy="55" r="11" fill="#E4D5BE" stroke="#57534E" strokeWidth="1.2" />
                    <circle cx="245" cy="55" r="11" fill="#C8D9C5" stroke="#57534E" strokeWidth="1.2" />
                    <circle cx="275" cy="55" r="11" fill="#E4D5BE" stroke="#57534E" strokeWidth="1.2" />
                    <text x="215" y="59" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#3E3426">+</text>
                    <text x="245" y="59" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#3E3426">-</text>
                    <text x="275" y="59" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#3E3426">+</text>

                    {/* Repulsion indicators */}
                    <line x1="215" y1="39" x2="215" y2="46" stroke="#DC2626" strokeWidth="2.5" />
                    <line x1="245" y1="39" x2="245" y2="46" stroke="#DC2626" strokeWidth="2.5" />
                    <line x1="275" y1="39" x2="275" y2="46" stroke="#DC2626" strokeWidth="2.5" />
                    <text x="245" y="80" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#DC2626">Like Charges Align &amp; Repel (Shatters)</text>
                  </g>
                </svg>

                <p className="text-xs text-stone-600 mt-2 text-center max-w-lg leading-relaxed">
                  When a mechanical force is applied, layers shift. This places ions with like charges directly
                  adjacent (+ next to +, - next to -). Intense electrostatic repulsion splits the <strong>3D network</strong>,
                  causing the crystal to shatter (brittleness).
                </p>
              </div>
            </div>

            {/* Recreated Vector Diagram: Dissolution & Hydration */}
            <div className="bg-white/95 rounded-2xl p-5 border border-stone-300/80 space-y-3">
              <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                Recreated Diagram 4: Dissolution &amp; Hydration Shells in Water
              </span>

              <div className="flex flex-col items-center justify-center p-4 bg-[#FAF5ED] rounded-xl border border-stone-200">
                <svg width="340" height="125" viewBox="0 0 340 125">
                  {/* Solid crystal */}
                  <g>
                    <rect x="20" y="25" width="70" height="50" fill="#E8DDD0" stroke="#786B5A" strokeWidth="1.5" rx="4" />
                    <text x="55" y="53" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#3E3426">NaCl (s)</text>
                    <text x="55" y="90" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#786B5A">Solid 3D Network</text>
                  </g>

                  {/* Dissolution Arrow */}
                  <g>
                    <line x1="105" y1="50" x2="145" y2="50" stroke="#1C1917" strokeWidth="2" />
                    <polygon points="145,46 155,50 145,54" fill="#1C1917" />
                    <text x="130" y="42" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#2563EB">H₂O</text>
                  </g>

                  {/* Hydrated Na+ */}
                  <g>
                    <circle cx="195" cy="50" r="14" fill="#E4D5BE" stroke="#57534E" strokeWidth="1.5" />
                    <text x="195" y="54" textAnchor="middle" fontSize="10" fontWeight="bold">Na⁺</text>
                    <circle cx="195" cy="22" r="5" fill="#DC2626" />
                    <circle cx="195" cy="78" r="5" fill="#DC2626" />
                    <circle cx="167" cy="50" r="5" fill="#DC2626" />
                    <circle cx="223" cy="50" r="5" fill="#DC2626" />
                    <text x="195" y="105" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#786B5A">Hydrated Na⁺ (Oδ⁻)</text>
                  </g>

                  {/* Hydrated Cl- */}
                  <g>
                    <circle cx="280" cy="50" r="16" fill="#C8D9C5" stroke="#57534E" strokeWidth="1.5" />
                    <text x="280" y="54" textAnchor="middle" fontSize="11" fontWeight="bold">Cl⁻</text>
                    <circle cx="280" cy="20" r="4.5" fill="#93C5FD" />
                    <circle cx="280" cy="80" r="4.5" fill="#93C5FD" />
                    <circle cx="250" cy="50" r="4.5" fill="#93C5FD" />
                    <circle cx="310" cy="50" r="4.5" fill="#93C5FD" />
                    <text x="280" y="105" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#786B5A">Hydrated Cl⁻ (Hδ⁺)</text>
                  </g>
                </svg>

                <div className="text-xs text-stone-700 leading-relaxed text-center max-w-lg mt-1 space-y-1">
                  <div className="font-mono bg-white px-2.5 py-1 rounded border border-stone-200 inline-block font-semibold">
                    NaCl(s) + H₂O → Na⁺(aq) + Cl⁻(aq)
                  </div>
                  <p>
                    Polar water molecules surround the ions: slightly negative oxygen ends (δ⁻) attract Na⁺, and
                    slightly positive hydrogen ends (δ⁺) attract Cl⁻. These new ion-dipole attractions overcome the
                    ionic bonds in the <strong>3D network</strong>, freeing the ions into solution.
                  </p>
                </div>
              </div>
            </div>

            {/* Classroom Model Answer: Zn vs ZnCl2 Conductivity */}
            <div className="bg-white/95 rounded-2xl p-5 border border-stone-300/80 space-y-3">
              <button
                onClick={() => toggleExemplar("zn")}
                className="w-full flex items-center justify-between text-left text-xs font-bold text-stone-900"
              >
                <span className="flex items-center space-x-2">
                  <CheckCircle2 size={15} className="text-stone-800" />
                  <span>Exam Question: Zn vs. ZnCl₂ Electrical Conductivity Comparison</span>
                </span>
                {expandedExemplars["zn"] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>

              {expandedExemplars["zn"] && (
                <div className="space-y-2 pt-1 text-xs">
                  <p className="font-semibold text-stone-800 bg-[#FAF5ED] p-3 rounded-xl border border-stone-200">
                    Q: Zn conducts electricity in both solid and molten states. However, ZnCl₂ conducts only in
                    the molten or aqueous state, not in the solid state. Explain using structure and bonding.
                  </p>

                  <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-2 text-stone-800 leading-relaxed">
                    <p>
                      <strong>1. Metallic Zinc (Zn):</strong> Zn is a metallic substance arranged in a regular
                      <strong> 3D network</strong> of cations surrounded by delocalised valence electrons. These
                      delocalised electrons are mobile in both the solid and molten states, allowing Zn to conduct
                      electricity continuously in both states.
                    </p>
                    <p>
                      <strong>2. Ionic Zinc Chloride (ZnCl₂):</strong> ZnCl₂ is an ionic compound composed of ions
                      held in a rigid <strong>3D network</strong> by strong ionic bonds. In the solid state, ions are
                      locked in fixed positions and cannot move – therefore unable to conduct electricity. In the molten
                      or aqueous state, the <strong>3D network</strong> is broken and ions become free-moving – therefore
                      able to carry electrical charge and conduct electricity.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Ammonium Exception Callout */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
              <span className="font-bold block text-amber-900">
                Important Exception: The Ammonium Ion (NH₄⁺)
              </span>
              <p className="text-amber-800 leading-relaxed">
                Most ionic compounds contain a metal cation. However, <strong>NH₄⁺</strong> is a polyatomic cation
                composed entirely of non-metals (Nitrogen &amp; Hydrogen). Key examples:
                <br />
                • <strong>NH₄Cl</strong> (composed of NH₄⁺ and Cl⁻)
                <br />
                • <strong>NH₄NO₃</strong> (composed of NH₄⁺ and NO₃⁻)
                <br />
                • <strong>(NH₄)₂SO₄</strong> (composed of NH₄⁺ and SO₄²⁻)
              </p>
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODULE 3: Carbon Allotropes (Diamond vs Graphite)             */}
        {/* ------------------------------------------------------------- */}
        {shouldShowSection("networks", [
          "covalent",
          "network",
          "diamond",
          "graphite",
          "graphene",
          "carbon",
          "tetrahedral",
          "allotropes",
          "delocalised",
          "lubricant",
          "pencil",
          "cutting",
        ]) && (
          <section className="bg-[#F2E9DE] rounded-3xl p-6 sm:p-8 border border-stone-300/70 shadow-sm space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <Atom size={22} className="text-stone-800" />
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-stone-900">
                  3. Allotropes of Carbon: Diamond vs. Graphite
                </h2>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-white/90 text-stone-800 border border-stone-300/60">
                Allotropes: Same element &amp; state, different structural network
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Diamond Card */}
              <div className="bg-white/95 rounded-2xl p-5 border border-stone-300/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-stone-900 text-base">
                    Diamond (3D Network)
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700">
                    4 Covalent Bonds per C
                  </span>
                </div>

                {/* Diamond Vector SVG */}
                <div className="flex flex-col items-center justify-center p-3 bg-[#FAF5ED] rounded-xl border border-stone-200">
                  <svg width="150" height="110" viewBox="0 0 150 110">
                    <line x1="75" y1="55" x2="35" y2="25" stroke="#78716C" strokeWidth="2.5" />
                    <line x1="75" y1="55" x2="115" y2="25" stroke="#78716C" strokeWidth="2.5" />
                    <line x1="75" y1="55" x2="50" y2="95" stroke="#78716C" strokeWidth="2.5" />
                    <line x1="75" y1="55" x2="105" y2="95" stroke="#78716C" strokeWidth="2.5" />
                    <circle cx="75" cy="55" r="11" fill="#1C1917" />
                    <circle cx="35" cy="25" r="9" fill="#57534E" />
                    <circle cx="115" cy="25" r="9" fill="#57534E" />
                    <circle cx="50" cy="95" r="9" fill="#57534E" />
                    <circle cx="105" cy="95" r="9" fill="#57534E" />
                    <text x="75" y="59" textAnchor="middle" fontSize="10" fill="#FFF" fontWeight="bold">C</text>
                  </svg>
                  <span className="text-[10px] text-stone-500 font-semibold mt-1">
                    Continuous 3D Tetrahedral Network
                  </span>
                </div>

                <div className="text-xs text-stone-700 leading-relaxed space-y-2">
                  <p>
                    • <strong>Structure:</strong> Every carbon atom is bonded to 4 neighbouring carbon atoms by strong
                    covalent bonds in an interlocking <strong>3D network</strong>.
                  </p>
                  <p>
                    • <strong>Extreme Hardness &amp; High Melting Point:</strong> Breaking the rigid 3D network requires
                    immense energy to sever continuous strong covalent bonds.
                  </p>
                  <p>
                    • <strong>Electrical Insulator:</strong> All 4 valence electrons are fixed in localized covalent bonds –
                    therefore unable to move and cannot conduct electricity.
                  </p>
                </div>
              </div>

              {/* Graphite Card */}
              <div className="bg-white/95 rounded-2xl p-5 border border-stone-300/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-stone-900 text-base">
                    Graphite (2D Layered Network)
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700">
                    3 Bonds + 1 Free Electron
                  </span>
                </div>

                {/* Graphite Vector SVG */}
                <div className="flex flex-col items-center justify-center p-3 bg-[#FAF5ED] rounded-xl border border-stone-200">
                  <svg width="170" height="110" viewBox="0 0 170 110">
                    <line x1="25" y1="30" x2="145" y2="30" stroke="#1C1917" strokeWidth="3" />
                    <line x1="25" y1="75" x2="145" y2="75" stroke="#1C1917" strokeWidth="3" />
                    <line x1="45" y1="33" x2="45" y2="72" stroke="#A8A29E" strokeDasharray="3,3" strokeWidth="1.8" />
                    <line x1="85" y1="33" x2="85" y2="72" stroke="#A8A29E" strokeDasharray="3,3" strokeWidth="1.8" />
                    <line x1="125" y1="33" x2="125" y2="72" stroke="#A8A29E" strokeDasharray="3,3" strokeWidth="1.8" />
                    <circle cx="105" cy="52" r="5" fill="#1C1917" />
                    <text x="105" y="55" textAnchor="middle" fontSize="8" fill="#FFF" fontWeight="bold">e⁻</text>
                  </svg>
                  <span className="text-[10px] text-stone-500 font-semibold mt-1">
                    Stacked 2D Graphene Sheets + Weak Forces
                  </span>
                </div>

                <div className="text-xs text-stone-700 leading-relaxed space-y-2">
                  <p>
                    • <strong>Structure:</strong> Each carbon atom bonds covalently to 3 others in planar hexagonal sheets
                    (<strong>2D network</strong>). A single layer is <em>graphene</em>.
                  </p>
                  <p>
                    • <strong>Electrical Conductor:</strong> The 4th valence electron is not bonded and is delocalised
                    between sheets – therefore free to move along layers and conduct electricity.
                  </p>
                  <p>
                    • <strong>Soft / Lubricant:</strong> Layers are held together only by weak intermolecular forces,
                    allowing sheets to slide off easily onto paper or act as a dry lubricant.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODULE 4: Covalent Molecular Substances & Polarity            */}
        {/* ------------------------------------------------------------- */}
        {shouldShowSection("molecular", [
          "molecular",
          "discrete",
          "imf",
          "intermolecular",
          "water",
          "polarity",
          "dipole",
          "electronegativity",
          "solubility",
          "methane",
          "decane",
          "hexane",
          "non-polar",
        ]) && (
          <section className="bg-[#F2E9DE] rounded-3xl p-6 sm:p-8 border border-stone-300/70 shadow-sm space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <Activity size={22} className="text-stone-800" />
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-stone-900">
                  4. Covalent Molecular Substances &amp; Polarity
                </h2>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-white/90 text-stone-800 border border-stone-300/60">
                Examples: H₂O, CO₂, CH₄, C₁₀H₂₂, O₂
              </span>
            </div>

            {/* Discrete Molecules & Weak IMF Vector */}
            <div className="bg-white/95 rounded-2xl p-5 border border-stone-300/80 space-y-3">
              <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                Recreated Diagram 5: Discrete Molecules &amp; Weak Intermolecular Forces (IMF)
              </span>

              <div className="flex flex-col items-center justify-center p-4 bg-[#FAF5ED] rounded-xl border border-stone-200">
                <svg width="280" height="90" viewBox="0 0 280 90">
                  <circle cx="50" cy="45" r="18" fill="#E8DDD0" stroke="#786B5A" strokeWidth="1.5" />
                  <text x="50" y="49" textAnchor="middle" fontSize="10" fontWeight="bold">H₂O</text>

                  <line x1="70" y1="45" x2="115" y2="45" stroke="#DC2626" strokeDasharray="3,3" strokeWidth="2" />
                  <text x="92" y="38" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#DC2626">Weak IMF</text>

                  <circle cx="135" cy="45" r="18" fill="#E8DDD0" stroke="#786B5A" strokeWidth="1.5" />
                  <text x="135" y="49" textAnchor="middle" fontSize="10" fontWeight="bold">H₂O</text>

                  <line x1="155" y1="45" x2="200" y2="45" stroke="#DC2626" strokeDasharray="3,3" strokeWidth="2" />
                  <text x="177" y="38" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#DC2626">Weak IMF</text>

                  <circle cx="220" cy="45" r="18" fill="#E8DDD0" stroke="#786B5A" strokeWidth="1.5" />
                  <text x="220" y="49" textAnchor="middle" fontSize="10" fontWeight="bold">H₂O</text>
                </svg>

                <div className="text-xs text-stone-700 leading-relaxed text-center max-w-lg mt-2 space-y-1.5">
                  <p>
                    <strong>Discrete molecules</strong> are separate entities held together only by <strong>weak intermolecular forces</strong>.
                  </p>
                  <p className="text-rose-900 font-semibold bg-rose-50 p-2 rounded-lg border border-rose-200">
                    Crucial Distinction: When molecular substances melt or boil, only the WEAK INTERMOLECULAR FORCES break.
                    The covalent bonds inside the molecules remain completely intact.
                  </p>
                </div>
              </div>

              {/* Molecular Size & Boiling Point Trend */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                <div className="p-3.5 bg-[#FAF5ED] rounded-xl border border-stone-200 space-y-1">
                  <span className="font-bold text-stone-900 block">Small: Methane (CH₄)</span>
                  <p className="text-stone-600">
                    Boiling point: −161°C (gas at room temp). Small electron cloud = very weak IMF = tiny thermal energy needed.
                  </p>
                </div>
                <div className="p-3.5 bg-[#FAF5ED] rounded-xl border border-stone-200 space-y-1">
                  <span className="font-bold text-stone-900 block">Larger: Decane (C₁₀H₂₂)</span>
                  <p className="text-stone-600">
                    Boiling point: 174°C (liquid at room temp). Larger electron cloud = stronger IMF – therefore higher melting and boiling points.
                  </p>
                </div>
              </div>
            </div>

            {/* Water Polarity & 2x2 Solubility Matrix */}
            <div className="bg-white/95 rounded-2xl p-5 border border-stone-300/80 space-y-4">
              <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                Recreated Diagram 6: Water Dipoles &amp; The 2 × 2 Solubility Rule (&quot;Like Dissolves Like&quot;)
              </span>

              <div className="flex flex-col items-center justify-center p-3 bg-[#FAF5ED] rounded-xl border border-stone-200">
                <svg width="220" height="90" viewBox="0 0 220 90">
                  <circle cx="110" cy="30" r="18" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.8" />
                  <text x="110" y="34" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#DC2626">O</text>
                  <text x="110" y="12" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#DC2626">δ⁻</text>

                  <line x1="95" y1="40" x2="65" y2="65" stroke="#78716C" strokeWidth="2" />
                  <line x1="125" y1="40" x2="155" y2="65" stroke="#78716C" strokeWidth="2" />

                  <circle cx="55" cy="70" r="13" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.5" />
                  <text x="55" y="74" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#2563EB">H</text>
                  <text x="35" y="74" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#2563EB">δ⁺</text>

                  <circle cx="165" cy="70" r="13" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.5" />
                  <text x="165" y="74" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#2563EB">H</text>
                  <text x="185" y="74" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#2563EB">δ⁺</text>
                </svg>
                <p className="text-[11px] text-stone-600 text-center max-w-md mt-1">
                  Oxygen pulls shared electrons closer because of high electronegativity, creating a permanent dipole.
                </p>
              </div>

              {/* 2x2 Matrix */}
              <div className="overflow-x-auto">
                <table className="w-full text-center text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#FAF5ED] border-b border-stone-300">
                      <th className="p-2.5 font-bold text-stone-900 text-left">Solute \ Solvent</th>
                      <th className="p-2.5 font-bold text-stone-900">Polar Solvent (Water)</th>
                      <th className="p-2.5 font-bold text-stone-900">Non-Polar Solvent (Hexane)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-stone-200">
                      <td className="p-2.5 font-bold text-stone-800 text-left">Polar Solute</td>
                      <td className="p-2.5 font-semibold text-emerald-800 bg-emerald-50">Soluble (e.g. Methanol)</td>
                      <td className="p-2.5 font-semibold text-rose-800 bg-rose-50">Insoluble (2 Layers Form)</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-stone-800 text-left">Non-Polar Solute</td>
                      <td className="p-2.5 font-semibold text-rose-800 bg-rose-50">Insoluble (Oils / Br₂)</td>
                      <td className="p-2.5 font-semibold text-emerald-800 bg-emerald-50">Soluble (Br₂ in Hexane)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODULE 5: Polymers & Hydrocarbons                             */}
        {/* ------------------------------------------------------------- */}
        {shouldShowSection("polymers", [
          "hydrocarbon",
          "polymer",
          "alkane",
          "alkene",
          "ethene",
          "ldpe",
          "polyethene",
          "kayak",
          "saturated",
          "unsaturated",
          "monomer",
        ]) && (
          <section className="bg-[#F2E9DE] rounded-3xl p-6 sm:p-8 border border-stone-300/70 shadow-sm space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <Layers size={22} className="text-stone-800" />
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-stone-900">
                  5. Hydrocarbons &amp; Polymer Chemistry
                </h2>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-white/90 text-stone-800 border border-stone-300/60">
                Alkanes, Alkenes &amp; Polyethene (LDPE)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Alkanes */}
              <div className="p-4 bg-white/95 rounded-2xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 text-sm">
                    Alkanes (CₙH₂ₙ₊₂) — Saturated
                  </span>
                  <span className="text-[10px] font-semibold bg-stone-100 px-2 py-0.5 rounded text-stone-600">
                    Single Bonds
                  </span>
                </div>
                <p className="text-stone-700 leading-relaxed">
                  Hydrocarbons containing only single C−C bonds. Chemically stable and unreactive.
                </p>
                <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px] text-stone-700 bg-[#FAF5ED] p-2.5 rounded-xl border border-stone-200">
                  <div>1 C: Methane (CH₄)</div>
                  <div>2 C: Ethane (C₂H₆)</div>
                  <div>3 C: Propane (C₃H₈)</div>
                  <div>4 C: Butane (C₄H₁₀)</div>
                  <div>5 C: Pentane (C₅H₁₂)</div>
                  <div>6 C: Hexane (C₆H₁₄)</div>
                  <div>7 C: Heptane (C₇H₁₆)</div>
                  <div>8 C: Octane (C₈H₁₈)</div>
                </div>
              </div>

              {/* Alkenes to Polymers */}
              <div className="p-4 bg-white/95 rounded-2xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 text-sm">
                    Alkenes &amp; Polymerisation
                  </span>
                  <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded">
                    Reactive C=C
                  </span>
                </div>
                <p className="text-stone-700 leading-relaxed">
                  Alkenes contain a reactive carbon=carbon double bond (C=C). This double bond allows addition polymerisation.
                </p>
                <div className="p-3 bg-[#FAF5ED] rounded-xl border border-stone-200 space-y-1.5 text-stone-800">
                  <span className="font-bold block text-stone-900">
                    Exam Link: Low-Density Polyethene (LDPE) Kayaks
                  </span>
                  <p>
                    Ethene monomers (CH₂=CH₂) are heated under high pressure with a catalyst. Double bonds break open and
                    link together thousands of units into long, flexible chains. This creates tough, impact-resistant,
                    and water-insoluble kayak hulls.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODULE 6: 12-Substance Lab Observation Table                 */}
        {/* ------------------------------------------------------------- */}
        {shouldShowSection("lab", [
          "lab",
          "experiment",
          "12 substances",
          "lead",
          "aluminium",
          "zinc",
          "copper",
          "wood",
          "iron",
          "brass",
          "graphite",
          "sulfur",
          "rubber",
          "silicon",
          "glass",
        ]) && (
          <section className="bg-[#F2E9DE] rounded-3xl p-6 sm:p-8 border border-stone-300/70 shadow-sm space-y-4">
            <div className="flex items-center space-x-2">
              <TableIcon size={22} className="text-stone-800" />
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-stone-900">
                6. Classroom Lab Observation Table (12 Substances)
              </h2>
            </div>
            <p className="text-xs text-stone-600">
              Empirical experimental data comparing electrical conductivity, surface lustre, and malleability.
            </p>

            <div className="bg-white/95 rounded-2xl p-4 sm:p-5 border border-stone-300/80 shadow-xs overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FAF5ED] border-b border-stone-300">
                    <th className="p-2.5 font-bold text-stone-900">Material</th>
                    <th className="p-2.5 font-bold text-stone-900">Electrical Conductivity</th>
                    <th className="p-2.5 font-bold text-stone-900">Lustre / Colour</th>
                    <th className="p-2.5 font-bold text-stone-900">Form</th>
                    <th className="p-2.5 font-bold text-stone-900">Malleable</th>
                    <th className="p-2.5 font-bold text-stone-900">Classification</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Pb (Lead)", "Yes", "Silver / shiny", "Solid", "Yes", "Metal"],
                    ["Al (Aluminium)", "Yes", "Silver / shiny", "Solid", "Yes", "Metal"],
                    ["Zn (Zinc)", "Yes", "Silver / shiny", "Solid", "Yes", "Metal"],
                    ["Cu (Copper)", "Yes", "Orange / shiny", "Solid", "Yes", "Metal"],
                    ["Wood", "No", "Brown", "Solid", "No", "Non-metal Organic"],
                    ["Fe (Iron)", "Yes", "Grey / shiny", "Solid", "Yes", "Metal"],
                    ["Brass", "Yes", "Yellow / shiny", "Solid", "Yes", "Metal Alloy"],
                    ["C (Graphite)", "Yes", "Black / shiny", "Solid/Powder", "No (Brittle)", "2D Network Allotrope"],
                    ["S (Sulfur)", "No", "Yellow", "Powder", "No (Brittle)", "Molecular Non-metal"],
                    ["Rubber", "No", "Grey", "Solid", "Flexible", "Polymer"],
                    ["Si (Silicon)", "Semi-conductor", "Grey / shiny", "Solid", "No (Brittle)", "Metalloid Network"],
                    ["Glass", "No", "Transparent", "Solid", "No (Brittle)", "Amorphous Network"],
                  ].map((row, rIdx) => (
                    <tr key={rIdx} className="border-b border-stone-200 hover:bg-[#FAF5ED]/60 transition-colors">
                      <td className="p-2.5 font-bold text-stone-900">{row[0]}</td>
                      <td className="p-2.5 font-semibold text-stone-800">
                        {row[1] === "Yes" ? (
                          <span className="text-emerald-700">Conducts</span>
                        ) : row[1] === "No" ? (
                          <span className="text-stone-500">Insulator</span>
                        ) : (
                          <span className="text-amber-700">{row[1]}</span>
                        )}
                      </td>
                      <td className="p-2.5 text-stone-700">{row[2]}</td>
                      <td className="p-2.5 text-stone-700">{row[3]}</td>
                      <td className="p-2.5 text-stone-700">{row[4]}</td>
                      <td className="p-2.5 font-medium text-stone-800">{row[5]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Bottom CTA Card */}
        <section className="bg-stone-900 text-stone-50 rounded-3xl p-8 border border-stone-800 shadow-md text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-stone-800 text-stone-300 text-xs font-medium">
            <PenTool size={12} />
            <span>Ready to Test Your Understanding?</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Practice Official NZQA Exam Questions
          </h2>

          <p className="text-sm text-stone-300 max-w-lg mx-auto leading-relaxed">
            Answer questions from 2025, 2024, and 2023. Unlock the next question as you get real-time AI feedback.
          </p>

          <div className="pt-2">
            <Link
              href="/practice"
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-2xl bg-white text-stone-950 font-bold text-sm hover:bg-stone-100 transition-all shadow-lg"
            >
              <span>Go to Practice Workspace</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-stone-300/60 py-6 px-6 text-center text-xs text-stone-500 bg-[#F5EFE4]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-bold text-stone-800">NCEA AS 92023 Revision Notes</span>
          <div className="flex items-center space-x-4">
            <Link href="/" className="hover:text-stone-800 transition-colors">
              Home
            </Link>
            <Link href="/practice" className="hover:text-stone-800 transition-colors">
              Practice Exams
            </Link>
          </div>
        </div>
      </footer>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onKeySaved={(newKey) => setApiKey(newKey)}
        currentKey={apiKey}
      />
    </div>
  );
}
