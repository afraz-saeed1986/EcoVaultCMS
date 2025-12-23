// components/PromoCard.tsx
"use client";
import React from "react";

export default function PromoCard({
  colorClass,
  discount,
}: {
  colorClass: string;
  discount: string;
}) {
  return (
    <div
      className={`rounded-3xl p-6 text-white font-bold text-sm bg-gradient-to-br ${colorClass} shadow-md`}
    >
      <div className="text-xs opacity-90">Office furniture</div>
      <div className="mt-2 text-lg">GET DISCOUNT {discount}</div>
    </div>
  );
}
