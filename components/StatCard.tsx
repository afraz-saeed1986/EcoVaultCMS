// components/StatCard.tsx
"use client";
import React from "react";

export default function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-md text-center font-bold text-slate-700 dark:bg-slate-950 dark:text-white">
      <div className="text-2xl">{value}</div>
      <div className="text-sm text-slate-400">{label}</div>
    </div>
  );
}
