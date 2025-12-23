// components/BestSeller.tsx
"use client";
import React from "react";

export default function BestSeller() {
  const products = [
    { name: "Wooden Chair", rating: "4.8/5", img: "/product1.png" },
    { name: "Dining Chair", rating: "4.8/5", img: "/product1.png" },
    { name: "Eames Chairs", rating: "4.8/5", img: "/product1.png" },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 shadow-md">
      <div className="font-bold mb-3">Best Seller</div>
      <div className="space-y-3">
        {products.map((p) => (
          <div key={p.name} className="flex items-center gap-3">
            <img
              src={p.img}
              alt={p.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="font-semibold text-sm">{p.name}</div>
              <div className="text-xs text-slate-400">{p.rating}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
