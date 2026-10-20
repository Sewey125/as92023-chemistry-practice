"use client";

import React, { useState } from "react";
import { X, BookOpen, AlertTriangle, Layers, ShieldCheck } from "lucide-react";
import { OFFICIAL_MATERIALS_GUIDE } from "@/data/materialsGuide";

interface ParticleGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ParticleGuideModal({ isOpen, onClose }: ParticleGuideModalProps) {
  const [selectedId, setSelectedId] = useState<string>("metallic");

  if (!isOpen) return null;

  const currentMaterial =
    OFFICIAL_MATERIALS_GUIDE.find((m) => m.id === selectedId) ||
    OFFICIAL_MATERIALS_GUIDE[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-4xl max-h-[90vh] bg-[#FAF5ED] rounded-3xl shadow-2xl border border-stone-300/80 flex flex-col overflow-hidden relative">
        {/* Top Header */}
        <div className="px-6 py-5 border-b border-stone-300/60 flex items-center justify-between bg-[#F2E9DE]">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-stone-900 text-stone-50 flex items-center justify-center shadow-sm">
              <BookOpen size={18} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900 tracking-tight">
                AS 92023 Materials &amp; Particle Guide
              </h3>
              <p className="text-xs text-stone-600">
                Official NZQA classification bounds • 5 Material Classes • 4 Particle Types
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-stone-200/80 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab navigation for 5 Material types */}
        <div className="flex border-b border-stone-300/60 overflow-x-auto bg-[#F8F2E8] px-4 py-2 gap-1.5 scrollbar-thin">
          {OFFICIAL_MATERIALS_GUIDE.map((mat) => {
            const isActive = mat.id === selectedId;
            return (
              <button
                key={mat.id}
                onClick={() => setSelectedId(mat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-stone-900 text-stone-50 shadow-sm"
                    : "text-stone-700 hover:bg-stone-200/70"
                }`}
              >
                {mat.name}
              </button>
            );
          })}
        </div>

        {/* Modal Body Content (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Overview Banner */}
          <div className="bg-[#F2E9DE] rounded-2xl p-5 border border-stone-300/60">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <h4 className="text-base font-bold text-stone-900 tracking-tight">
                {currentMaterial.name}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {currentMaterial.nzqaExamples.map((ex) => (
                  <span
                    key={ex}
                    className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white/70 text-stone-800 border border-stone-300/40"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mt-3">
              <div className="p-3 bg-white/80 rounded-xl border border-stone-200/80">
                <span className="font-bold text-stone-900 block mb-1">
                  Constituent Particles (NZQA)
                </span>
                <p className="text-stone-700 leading-relaxed">
                  {currentMaterial.constituentParticles}
                </p>
              </div>

              <div className="p-3 bg-white/80 rounded-xl border border-stone-200/80">
                <span className="font-bold text-stone-900 block mb-1">
                  Bonding &amp; Attractive Forces
                </span>
                <p className="text-stone-700 leading-relaxed">
                  {currentMaterial.bondingAndAttractiveForces}
                </p>
              </div>
            </div>
          </div>

          {/* Particle Diagram Visualizer (SVG) */}
          <div className="bg-white/90 rounded-2xl p-5 border border-stone-300/60">
            <h5 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3 flex items-center">
              <Layers size={14} className="mr-1.5 text-stone-600" />
              Microscopic Particle Arrangement Model
            </h5>

            <div className="w-full flex items-center justify-center py-4 bg-[#FAF5ED] rounded-xl border border-stone-200">
              {currentMaterial.id === "metallic" && (
                <div className="flex flex-col items-center">
                  <svg width="260" height="110" viewBox="0 0 260 110" className="overflow-visible">
                    {/* Rows of Cations */}
                    {[20, 60, 100, 140, 180, 220].map((cx, i) => (
                      <g key={`row1-${i}`}>
                        <circle cx={cx} cy="30" r="14" fill="#E2D4C0" stroke="#786B5A" strokeWidth="1.5" />
                        <text x={cx} y="34" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#3E3426">+</text>
                      </g>
                    ))}
                    {[20, 60, 100, 140, 180, 220].map((cx, i) => (
                      <g key={`row2-${i}`}>
                        <circle cx={cx} cy="75" r="14" fill="#E2D4C0" stroke="#786B5A" strokeWidth="1.5" />
                        <text x={cx} y="79" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#3E3426">+</text>
                      </g>
                    ))}
                    {/* Delocalised valence electrons */}
                    {[40, 80, 120, 160, 200].map((ex, i) => (
                      <g key={`e-${i}`}>
                        <circle cx={ex} cy="52" r="4.5" fill="#1C1917" />
                        <text x={ex} y="55" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#FFFFFF">-</text>
                      </g>
                    ))}
                  </svg>
                  <p className="text-[11px] text-stone-500 mt-2 text-center">
                    Regular rows of positive cations surrounded by mobile delocalised valence electrons.
                  </p>
                </div>
              )}

              {currentMaterial.id === "ionic" && (
                <div className="flex flex-col items-center">
                  <svg width="240" height="110" viewBox="0 0 240 110">
                    {/* Alternating Na+ and Cl- */}
                    {[
                      { x: 30, y: 30, r: 12, label: "Na+", fill: "#E4D5BE" },
                      { x: 75, y: 30, r: 16, label: "Cl-", fill: "#C8D9C5" },
                      { x: 120, y: 30, r: 12, label: "Na+", fill: "#E4D5BE" },
                      { x: 165, y: 30, r: 16, label: "Cl-", fill: "#C8D9C5" },
                      { x: 210, y: 30, r: 12, label: "Na+", fill: "#E4D5BE" },

                      { x: 30, y: 75, r: 16, label: "Cl-", fill: "#C8D9C5" },
                      { x: 75, y: 75, r: 12, label: "Na+", fill: "#E4D5BE" },
                      { x: 120, y: 75, r: 16, label: "Cl-", fill: "#C8D9C5" },
                      { x: 165, y: 75, r: 12, label: "Na+", fill: "#E4D5BE" },
                      { x: 210, y: 75, r: 16, label: "Cl-", fill: "#C8D9C5" },
                    ].map((ion, i) => (
                      <g key={i}>
                        <circle cx={ion.x} cy={ion.y} r={ion.r} fill={ion.fill} stroke="#57534E" strokeWidth="1.2" />
                        <text x={ion.x} y={ion.y + 4} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1C1917">
                          {ion.label}
                        </text>
                      </g>
                    ))}
                  </svg>
                  <p className="text-[11px] text-stone-500 mt-2 text-center">
                    Rigid 3D alternating network of positive and negative ions held by strong electrostatic attractions.
                  </p>
                </div>
              )}

              {currentMaterial.id === "covalent-networks" && (
                <div className="flex flex-col items-center">
                  <div className="flex space-x-8 items-center">
                    {/* Diamond 3D node representation */}
                    <div className="text-center">
                      <svg width="120" height="90" viewBox="0 0 120 90">
                        <line x1="60" y1="45" x2="30" y2="20" stroke="#78716C" strokeWidth="2" />
                        <line x1="60" y1="45" x2="90" y2="20" stroke="#78716C" strokeWidth="2" />
                        <line x1="60" y1="45" x2="40" y2="75" stroke="#78716C" strokeWidth="2" />
                        <line x1="60" y1="45" x2="80" y2="75" stroke="#78716C" strokeWidth="2" />
                        <circle cx="60" cy="45" r="9" fill="#1C1917" />
                        <circle cx="30" cy="20" r="7" fill="#57534E" />
                        <circle cx="90" cy="20" r="7" fill="#57534E" />
                        <circle cx="40" cy="75" r="7" fill="#57534E" />
                        <circle cx="80" cy="75" r="7" fill="#57534E" />
                        <text x="60" y="48" textAnchor="middle" fontSize="8" fill="#FFF" fontWeight="bold">C</text>
                      </svg>
                      <span className="text-[10px] font-semibold text-stone-700">Diamond (3D Tetrahedral)</span>
                    </div>

                    {/* Graphite 2D sheets */}
                    <div className="text-center">
                      <svg width="140" height="90" viewBox="0 0 140 90">
                        {/* Layer 1 */}
                        <line x1="20" y1="25" x2="120" y2="25" stroke="#1C1917" strokeWidth="3" />
                        {/* Weak forces dashed */}
                        <line x1="40" y1="27" x2="40" y2="63" stroke="#A8A29E" strokeDasharray="3,3" strokeWidth="1.5" />
                        <line x1="70" y1="27" x2="70" y2="63" stroke="#A8A29E" strokeDasharray="3,3" strokeWidth="1.5" />
                        <line x1="100" y1="27" x2="100" y2="63" stroke="#A8A29E" strokeDasharray="3,3" strokeWidth="1.5" />
                        {/* Layer 2 */}
                        <line x1="20" y1="65" x2="120" y2="65" stroke="#1C1917" strokeWidth="3" />
                        {/* Mobile electron */}
                        <circle cx="85" cy="45" r="4" fill="#000" />
                        <text x="85" y="48" textAnchor="middle" fontSize="7" fill="#FFF" fontWeight="bold">e-</text>
                      </svg>
                      <span className="text-[10px] font-semibold text-stone-700">Graphite (2D Sheets + e-)</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-2 text-center">
                    Diamond: 4 bonds per C (rigid insulator). Graphite: 3 bonds per C + 1 delocalised electron (conductor &amp; lubricant).
                  </p>
                </div>
              )}

              {currentMaterial.id === "polymers" && (
                <div className="flex flex-col items-center">
                  <svg width="240" height="90" viewBox="0 0 240 90">
                    {/* Wavy polymer chains */}
                    <path d="M 20 25 Q 50 10 80 25 T 140 25 T 200 25" fill="none" stroke="#292524" strokeWidth="3" />
                    {/* Branch */}
                    <path d="M 80 25 L 80 45 Q 100 55 120 45" fill="none" stroke="#292524" strokeWidth="2.5" />
                    {/* Weak intermolecular lines */}
                    <line x1="60" y1="30" x2="60" y2="65" stroke="#A8A29E" strokeDasharray="2,3" strokeWidth="1.2" />
                    <line x1="160" y1="30" x2="160" y2="65" stroke="#A8A29E" strokeDasharray="2,3" strokeWidth="1.2" />
                    {/* Lower chain */}
                    <path d="M 20 70 Q 60 85 100 70 T 170 70 T 220 70" fill="none" stroke="#292524" strokeWidth="3" />
                  </svg>
                  <p className="text-[11px] text-stone-500 mt-2 text-center">
                    Long covalent chains with side branches preventing dense packing (giving LDPE flexibility and low density).
                  </p>
                </div>
              )}

              {currentMaterial.id === "molecular" && (
                <div className="flex flex-col items-center">
                  <svg width="240" height="90" viewBox="0 0 240 90">
                    {/* Small discrete molecules */}
                    {/* Molecule 1 */}
                    <g>
                      <circle cx="50" cy="40" r="11" fill="#78716C" />
                      <circle cx="38" cy="50" r="6" fill="#D6D3D1" />
                      <circle cx="62" cy="50" r="6" fill="#D6D3D1" />
                    </g>
                    {/* Weak intermolecular attraction */}
                    <line x1="65" y1="42" x2="105" y2="42" stroke="#A8A29E" strokeDasharray="2,3" strokeWidth="1.5" />
                    {/* Molecule 2 */}
                    <g>
                      <circle cx="120" cy="40" r="11" fill="#78716C" />
                      <circle cx="108" cy="50" r="6" fill="#D6D3D1" />
                      <circle cx="132" cy="50" r="6" fill="#D6D3D1" />
                    </g>
                    {/* Weak intermolecular attraction */}
                    <line x1="135" y1="42" x2="175" y2="42" stroke="#A8A29E" strokeDasharray="2,3" strokeWidth="1.5" />
                    {/* Molecule 3 */}
                    <g>
                      <circle cx="190" cy="40" r="11" fill="#78716C" />
                      <circle cx="178" cy="50" r="6" fill="#D6D3D1" />
                      <circle cx="202" cy="50" r="6" fill="#D6D3D1" />
                    </g>
                  </svg>
                  <p className="text-[11px] text-stone-500 mt-2 text-center">
                    Discrete molecules held together by weak intermolecular forces. Covalent bonds are internal and never break when melting.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Physical Properties Table */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Physical Properties &amp; Particle Explanations
            </h5>
            <div className="space-y-2.5">
              {currentMaterial.physicalProperties.map((p) => (
                <div
                  key={p.property}
                  className="p-3.5 bg-white/70 rounded-xl border border-stone-200/80 text-xs"
                >
                  <span className="font-bold text-stone-900 text-sm block mb-0.5">
                    {p.property}
                  </span>
                  <p className="text-stone-600 mb-1.5">{p.description}</p>
                  <p className="text-stone-800 bg-[#F2E9DE]/60 p-2 rounded-lg border border-stone-200/50">
                    <strong className="text-stone-900">Particle Link:</strong>{" "}
                    {p.particleExplanation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Examiner Traps Alert Box */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1.5">
            <span className="font-bold flex items-center text-amber-950">
              <AlertTriangle size={14} className="mr-1.5 text-amber-700" />
              NZQA Examiner Commentary Warnings for {currentMaterial.name}:
            </span>
            <ul className="list-disc list-inside space-y-1 text-amber-800 pl-1">
              {currentMaterial.keyExaminerNotes.map((note, i) => (
                <li key={i}>{note}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#F2E9DE] border-t border-stone-300/60 flex items-center justify-between">
          <span className="text-xs text-stone-500 flex items-center">
            <ShieldCheck size={13} className="mr-1 text-stone-500" />
            Aligned with NZQA AS92023 Assessment Specification
          </span>
          <button
            onClick={onClose}
            className="text-xs font-semibold px-4 py-2 rounded-xl bg-stone-900 text-stone-50 hover:bg-stone-800 transition-colors shadow-sm"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
