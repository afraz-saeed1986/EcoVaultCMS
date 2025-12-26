"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/client";
import {
  LayoutDashboard,
  Package,
  BarChart2,
  Tag,
  MessageSquare,
  Star,
  LogOut,
} from "lucide-react";

type Props = { onNavigate?: () => void };

const items = [
  { name: "Dashboard", icon: LayoutDashboard, active: true },
  { name: "Product", icon: Package, active: false },
  { name: "Analytics", icon: BarChart2, active: false },
  { name: "Sale", icon: Tag, active: false },
  { name: "Review", icon: Star, active: false },
  { name: "Chat", icon: MessageSquare, active: false },
];

export default function Sidebar({ onNavigate }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("خطا در لاگ‌اوت:", error);
      } else {
        onNavigate?.();
        router.push("/login");
        router.refresh();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full text-slate-800 dark:text-slate-200 dark:bg-black"> {/* bg مشکی در dark اضافه شد */}
      {/* لوگو – متن از parent inherit می‌کنه */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
          l
        </div>
        <span className="font-black tracking-tight text-xl">
          lessa
        </span>
      </div>

      {/* منوی اصلی – آیتم‌ها روی بک‌گراند مشکی در dark */}
      <nav className="flex-1 space-y-2">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <button
              key={it.name}
              onClick={() => onNavigate?.()}
              className={`w-full flex items-center gap-4 px-5 py-3 rounded-2xl transition-all duration-300 font-semibold text-sm group ${
                it.active
                  ? "bg-white/90 dark:bg-slate-900/80 shadow-sm text-teal-600 dark:text-teal-400"
                  : "hover:bg-white/50 dark:hover:bg-slate-900/60"
              }`}
            >
              <Icon size={18} className="text-current transition-colors duration-300" />
              <span>{it.name}</span>
            </button>
          );
        })}
      </nav>

      {/* دکمه Sign Out – روی مشکی ملایم‌تر */}
      <div className="mt-6">
        <button
          onClick={handleSignOut}
          disabled={isLoading}
          className="flex w-full items-center gap-3 px-4 py-3 rounded-2xl text-red-600 dark:text-red-400 font-bold text-sm hover:bg-red-50/60 dark:hover:bg-red-950/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LogOut size={18} className="transition-colors duration-300" />
          {isLoading ? "Signing out..." : "Sign Out"}
        </button>
      </div>
    </div>
  );
}