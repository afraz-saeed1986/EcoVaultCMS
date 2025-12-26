"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <div className="min-h-screen bg-dashboard font-sans relative overflow-hidden">
      {/* بلورهای پس‌زمینه – بدون تغییر (می‌تونی بعداً dark اضافه کنی اگر خواستی) */}
      <div className="absolute -top-20 -left-20 w-2/5 h-2/5 bg-white/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-2/5 h-2/5 bg-purple-400/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="flex flex-col md:flex-row md:gap-6 md:p-6">
        {/* Desktop sidebar – شیشه‌ای در light، مشکی کامل در dark */}
        <aside className="hidden md:block w-72 bg-white/60 dark:bg-black backdrop-blur-2xl rounded-[3rem] shadow-dashboard border border-white/60 dark:border-slate-800 flex flex-col p-8 relative overflow-hidden shrink-0">
          <div className="absolute top-10 bottom-10 left-0 w-[3px] bg-gradient-to-b from-transparent via-teal-400 dark:via-teal-500 to-transparent"></div>
          <Sidebar />
        </aside>

        {/* Mobile overlay – کمی تیره‌تر در dark برای خوانایی */}
        <div
          className={`fixed inset-0 z-40 bg-black/40 dark:bg-black/70 transition-opacity duration-300 md:hidden ${
            mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setMobileOpen(false)}
          aria-hidden={!mobileOpen}
        />

        {/* Mobile sliding sidebar – شیشه‌ای در light، مشکی کامل در dark */}
        <div
          className={`fixed top-0 left-0 z-50 h-full w-72 bg-white/95 dark:bg-black backdrop-blur-lg p-6 transform transition-transform duration-300 ease-in-out md:hidden ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          } ${mobileOpen ? "visible" : "invisible"}`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          <Sidebar onNavigate={() => setMobileOpen(false)} />
        </div>

        {/* Main content */}
        <main className="flex-1 flex flex-col gap-6 p-4 md:p-0 relative z-10">
          <Header onOpenMobile={() => setMobileOpen(true)} />
          <div className="flex-1 overflow-auto pr-2 custom-scrollbar">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}