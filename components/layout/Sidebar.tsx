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
        // می‌تونی اینجا toast یا notification نشون بدی
      } else {
        // اختیاری: سایدبار موبایل رو ببند
        onNavigate?.();

        // ریدایرکت به صفحه ورود یا home
        router.push("/login"); // یا "/" اگر بخوای به لندینگ بره
        router.refresh(); // برای اطمینان از refresh session در server components
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* لوگو */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
          l
        </div>
        <span className="font-black text-slate-800 tracking-tight text-xl">
          lessa
        </span>
      </div>

      {/* منوی اصلی */}
      <nav className="flex-1 space-y-2">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <button
              key={it.name}
              onClick={() => onNavigate?.()}
              className={`w-full flex items-center gap-4 px-5 py-3 rounded-2xl transition-all font-semibold text-sm ${
                it.active
                  ? "bg-white shadow-sm text-teal-600"
                  : "text-slate-500 hover:bg-white/40"
              }`}
            >
              <Icon size={18} />
              {it.name}
            </button>
          );
        })}
      </nav>

      {/* دکمه Sign Out */}
      <div className="mt-6">
        <button
          onClick={handleSignOut}
          disabled={isLoading}
          className="flex w-full items-center gap-3 px-4 py-3 rounded-2xl text-red-500 font-bold text-sm hover:bg-red-50/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LogOut size={18} />
          {isLoading ? "Signing out..." : "Sign Out"}
        </button>
      </div>
    </div>
  );
}
