"use client";

import React, { useState } from "react";
import { InstagramHeader } from "@/components/InstagramHeader";
import { InstagramFeed } from "@/components/InstagramFeed";
import { InstagramProfile } from "@/components/InstagramProfile";
import { BottomNavBar } from "@/components/BottomNavBar";

export default function InstagramPage() {
  const [currentView, setCurrentView] = useState<"feed" | "profile">("feed");
  const [activeNavTab, setActiveNavTab] = useState<"home" | "search" | "create" | "activity" | "profile">("home");

  const handleNavTabChange = (tab: "home" | "search" | "create" | "activity" | "profile") => {
    setActiveNavTab(tab);
    if (tab === "home") {
      setCurrentView("feed");
    } else if (tab === "profile") {
      setCurrentView("profile");
    }
  };

  const handleHeaderNavigate = (view: "feed" | "profile") => {
    setCurrentView(view);
    setActiveNavTab(view === "feed" ? "home" : "profile");
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#121214] flex flex-col font-sans select-none antialiased">
      {/* Sticky Full-Screen Top Header */}
      <InstagramHeader
        currentView={currentView}
        onNavigate={handleHeaderNavigate}
      />

      {/* Main Full-Screen View Content */}
      <main className="flex-1 w-full pb-20 sm:pb-8">
        {currentView === "feed" ? (
          <InstagramFeed
            onNavigateToProfile={() => handleHeaderNavigate("profile")}
          />
        ) : (
          <InstagramProfile
            onBackToFeed={() => handleHeaderNavigate("feed")}
          />
        )}
      </main>

      {/* Floating Bottom Nav for Mobile Screens */}
      <div className="block sm:hidden">
        <BottomNavBar
          activeTab={activeNavTab}
          onTabChange={handleNavTabChange}
        />
      </div>
    </div>
  );
}
