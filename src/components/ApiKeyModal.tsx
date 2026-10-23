"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  KeyRound,
  ExternalLink,
  Check,
  AlertCircle,
  Loader2,
  Zap,
  CheckCircle2,
} from "lucide-react";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeySaved: (key: string) => void;
  currentKey: string;
}

export function ApiKeyModal({
  isOpen,
  onClose,
  onKeySaved,
  currentKey,
}: ApiKeyModalProps) {
  const [apiKeyInput, setApiKeyInput] = useState(currentKey);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    ok: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    setApiKeyInput(currentKey);
    setTestResult(null);
  }, [currentKey, isOpen]);

  if (!isOpen) return null;

  const handleTestKey = async () => {
    const trimmed = apiKeyInput.trim().replace(/['"`\s]/g, "");
    if (!trimmed) {
      setTestResult({ ok: false, message: "Please enter a key before testing." });
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    try {
      const res = await fetch("/api/test-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: trimmed }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setTestResult({ ok: true, message: "Key verified! Connected to Google Gemini 2.0 Flash." });
      } else {
        setTestResult({
          ok: false,
          message: data.error || "Key validation failed. Please check your key from AI Studio.",
        });
      }
    } catch {
      setTestResult({ ok: false, message: "Could not reach test server." });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = () => {
    const trimmed = apiKeyInput.trim().replace(/['"`\s]/g, "");
    if (trimmed) {
      localStorage.setItem("as92023_gemini_key", trimmed);
      onKeySaved(trimmed);
      setStatusMessage("Free API key saved in browser storage.");
    } else {
      localStorage.removeItem("as92023_gemini_key");
      onKeySaved("");
      setStatusMessage("Key cleared. Switched to Built-in Instant Evaluator.");
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("storage"));
    }
    setTimeout(() => {
      onClose();
      setStatusMessage(null);
    }, 800);
  };

  const handleClearAndUseOffline = () => {
    setApiKeyInput("");
    localStorage.removeItem("as92023_gemini_key");
    onKeySaved("");
    setStatusMessage("Running in 100% Free Instant Mode (No Key Needed).");
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("storage"));
    }
    setTimeout(() => {
      onClose();
      setStatusMessage(null);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#FAF5ED] rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-300/80 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-stone-200/60 transition-colors"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-stone-900 text-stone-50 flex items-center justify-center shadow-sm">
            <KeyRound size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-stone-900 tracking-tight">
              Gemini AI Key &amp; Assessment Setup
            </h3>
            <p className="text-xs text-stone-500">
              100% Free from Google AI Studio • No Credit Card
            </p>
          </div>
        </div>

        {/* Option 1: Instant Mode (No Key) */}
        <div className="bg-emerald-50/80 rounded-2xl p-4 mb-4 border border-emerald-200/90 text-xs text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold flex items-center text-emerald-900 mb-0.5">
              <Zap size={13} className="mr-1 text-emerald-700" />
              Tired of API keys? Use Instant Offline Mode
            </span>
            <p className="text-emerald-800 leading-relaxed text-[11px]">
              Grades answers instantly (&lt;0.05s) using the official NZQA criteria without needing any Google key.
            </p>
          </div>
          <button
            onClick={handleClearAndUseOffline}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-800 text-white font-semibold text-xs hover:bg-emerald-700 whitespace-nowrap self-start sm:self-auto shadow-xs"
          >
            Use Instant Mode
          </button>
        </div>

        {/* Step-by-step help */}
        <div className="bg-[#F2E9DE] rounded-2xl p-4 mb-4 border border-stone-300/60 text-xs text-stone-700 space-y-2">
          <p className="font-semibold text-stone-900 flex items-center">
            <ExternalLink size={13} className="mr-1.5 text-stone-600" />
            Or get a free Gemini key in 30 seconds:
          </p>
          <ol className="list-decimal list-inside space-y-1 text-stone-600 pl-1 text-[11px]">
            <li>
              Open{" "}
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-stone-900 underline font-semibold hover:text-stone-700 inline-flex items-center"
              >
                aistudio.google.com/app/apikey
                <ExternalLink size={10} className="ml-1" />
              </a>
            </li>
            <li>Sign in with your personal Google account.</li>
            <li>Click <strong>&quot;Create API Key&quot;</strong> and copy it.</li>
            <li>Paste it below and click <strong>&quot;Test Key&quot;</strong>.</li>
          </ol>
        </div>

        {/* Input Field */}
        <div className="space-y-2 mb-3">
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
            Google AI Studio Key
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="password"
              placeholder="Paste your Gemini API key (starts with AQ... or AIza...)"
              value={apiKeyInput}
              onChange={(e) => {
                setApiKeyInput(e.target.value);
                setTestResult(null);
              }}
              className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-900 placeholder:text-stone-400 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-stone-800 font-mono shadow-xs"
            />
            <button
              onClick={handleTestKey}
              disabled={isTesting || !apiKeyInput.trim()}
              className="px-4 py-2.5 rounded-xl bg-white border border-stone-300 hover:bg-stone-100 font-semibold text-xs text-stone-800 transition-colors disabled:opacity-50 flex items-center space-x-1.5 shadow-xs flex-shrink-0"
            >
              {isTesting ? (
                <>
                  <Loader2 size={13} className="animate-spin text-stone-600" />
                  <span>Testing...</span>
                </>
              ) : (
                <span>Test Key</span>
              )}
            </button>
          </div>

          {/* Test Result Message */}
          {testResult && (
            <div
              className={`p-3 rounded-xl border text-xs flex items-center space-x-2 ${
                testResult.ok
                  ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                  : "bg-rose-50 border-rose-200 text-rose-900"
              }`}
            >
              {testResult.ok ? (
                <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0" />
              ) : (
                <AlertCircle size={15} className="text-rose-600 flex-shrink-0" />
              )}
              <span className="leading-relaxed">{testResult.message}</span>
            </div>
          )}

          <p className="text-[11px] text-stone-500 flex items-center pt-0.5">
            <AlertCircle size={11} className="mr-1 text-stone-400 flex-shrink-0" />
            Key stays private in your browser&apos;s localStorage. Never sent to any third party.
          </p>
        </div>

        {/* Status notification */}
        {statusMessage && (
          <div className="mb-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center">
            <Check size={14} className="mr-2 text-emerald-600" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-stone-200">
          {currentKey ? (
            <button
              onClick={handleClearAndUseOffline}
              className="text-xs text-rose-700 hover:text-rose-900 font-semibold px-2 py-1"
            >
              Remove Stored Key
            </button>
          ) : (
            <span className="text-[11px] text-stone-500">
              Free &amp; private
            </span>
          )}

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="text-xs font-semibold px-4 py-2.5 rounded-xl text-stone-600 hover:bg-stone-200/60 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="text-xs font-semibold px-5 py-2.5 rounded-xl bg-stone-900 text-stone-50 hover:bg-stone-800 transition-colors shadow-xs"
            >
              Save Key
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
