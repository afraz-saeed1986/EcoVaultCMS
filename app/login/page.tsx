"use client";
import { useState } from "react";
import { createClient } from "@/lib/client";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Loader2,
  User,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setError(error.message);
      else {
        router.push("/dashboard");
        router.refresh();
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });
      if (error) setError(error.message);
      else setError("Success! Check your email.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#9ee7e2] via-[#c8e6e9] to-[#d6c9f5] relative overflow-hidden font-sans">
      {/* دایره‌های معلق پس‌زمینه (Background Blobs) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-[100px] animate-pulse delay-700"></div>

      <div className="max-w-md w-full relative z-10 px-6">
        {/* کارت اصلی با افکت شیشه‌ای */}
        <div className="bg-white/70 backdrop-blur-2xl rounded-[3rem] p-10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-white/60 relative overflow-hidden">
          {/* نوار نئونی بالا */}
          <div className="absolute top-0 left-10 right-10 h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.8)]"></div>

          {/* نوار نئونی پایین */}
          <div className="absolute bottom-0 left-10 right-10 h-[3px] bg-gradient-to-r from-transparent via-purple-400 to-transparent shadow-[0_0_15px_rgba(192,132,252,0.8)]"></div>

          {/* Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold text-3xl mb-4 shadow-xl shadow-cyan-100 border-2 border-white/50">
              G
            </div>
            <div className="text-center">
              <span className="text-[10px] font-bold text-teal-600 uppercase tracking-[0.3em]">
                Is Login
              </span>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">
                EcoVault CMS
              </h1>
              <p className="text-slate-500 text-xs mt-2 font-medium">
                Welcome back! Please enter your details.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 rounded-xl bg-red-50/50 border border-red-100 text-red-500 text-[11px] font-bold text-center">
                {error}
              </div>
            )}

            {!isLogin && (
              <div className="space-y-1 group">
                <label className="text-[10px] font-black text-slate-600 uppercase ml-1">
                  Full Name
                </label>
                <div className="relative group">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors"
                    size={16}
                  />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-white/40 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-teal-500/10 focus:border-teal-400 outline-none transition-all text-sm"
                    placeholder="Enter full name"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1 group">
              <label className="text-[10px] font-black text-slate-600 uppercase ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors"
                  size={16}
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-white/40 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-teal-500/10 focus:border-teal-400 outline-none transition-all text-sm text-slate-700"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="space-y-1 group">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black text-slate-600 uppercase">
                  Password
                </label>
                <button
                  type="button"
                  className="text-[10px] font-bold text-teal-600 hover:text-teal-700"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors"
                  size={16}
                />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-white/40 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-teal-500/10 focus:border-teal-400 outline-none transition-all text-sm dark:text-slate-900"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-teal-200/50 transition-all flex items-center justify-center gap-2 mt-4 active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <ShieldCheck size={18} />
                  <span>Sign Admin Account</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Section */}
          <div className="mt-10 pt-6 border-t border-slate-100 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="group flex items-center justify-center gap-1 mx-auto text-xs font-bold text-slate-500 hover:text-teal-600 transition-colors"
            >
              {isLogin ? "Don't have an account?" : "Already joined EcoVault?"}
              <span className="text-teal-600 flex items-center">
                {isLogin ? "Sign Up" : "Log In"}
                <ChevronRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Label */}
        <div className="flex items-center justify-center gap-2 mt-8 opacity-40">
          <div className="h-[1px] w-8 bg-slate-400"></div>
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
            Secure Access Point
          </span>
          <div className="h-[1px] w-8 bg-slate-400"></div>
        </div>
      </div>
    </div>
  );
}
