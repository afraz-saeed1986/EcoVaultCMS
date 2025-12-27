// app/page.tsx
import { createClient } from "@/lib/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight, LayoutDashboard, ShieldCheck } from "lucide-react";

export default async function Home() {
  const supabase = await createClient();
  await supabase.auth.signOut(); // Ensure any existing session is cleared

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-purple-100 relative overflow-hidden flex items-center justify-center p-6">
      {/* Orbiting blur effects for a modern, eco-friendly feel */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-teal-300/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-300/20 rounded-full blur-3xl animate-ping" />
      </div>

      <div className="max-w-4xl w-full relative z-10 text-center space-y-12">
        {/* Large glassmorphic logo */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-3xl flex items-center justify-center text-white font-black text-5xl shadow-2xl backdrop-blur-md border border-white/20">
            E
          </div>
        </div>

        {/* Hero title with gradient text */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight dark:text-slate-900">
          EcoVault{" "}
          <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            CMS
          </span>
        </h1>

        <div className="flex flex-col items-center">
          <p className="text-xl md:text-2xl text-slate-600 max-w-2xl leading-relaxed">
            The most modern way to manage your eco-friendly products and
            inventory in one place – sustainable, secure, and smart.
          </p>
        </div>

        {/* CTA section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 text-white">
          <Link
            href="/login"
            className="group bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-10 py-5 rounded-3xl font-bold text-lg shadow-xl transition-all duration-300 flex items-center gap-3 transform hover:scale-105"
          >
            Get Started
            <ArrowRight
              size={24}
              className="group-hover:translate-x-2 transition-transform duration-300 text-white"
            />
          </Link>

          <div className="flex items-center gap-3 text-slate-500 text-lg">
            <ShieldCheck size={24} className="text-teal-500" />
            Secure & Sustainable Infrastructure
          </div>
        </div>

        {/* Dashboard mockup – glassmorphic and interactive */}
        <div className="mt-20 relative mx-auto max-w-3xl">
          <div className="absolute inset-0 bg-gradient-to-t from-teal-100/50 via-transparent to-transparent rounded-3xl" />
          <div className="relative bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl p-4 shadow-2xl scale-95 hover:scale-100 transition-transform duration-500">
            <div className="bg-white/80 rounded-3xl h-80 md:h-96 flex items-center justify-center flex-col gap-4">
              <LayoutDashboard size={80} className="text-teal-400/70" />
              <span className="text-slate-500 font-semibold text-lg">
                Modern Dashboard Preview
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
