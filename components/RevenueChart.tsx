// components/RevenueChart.tsx
"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { date: "2 Dec", value: 120 },
  { date: "3 Dec", value: 200 },
  { date: "4 Dec", value: 150 },
  { date: "5 Dec", value: 320 }, // peak
  { date: "6 Dec", value: 210 },
  { date: "7 Dec", value: 240 },
];

export default function RevenueChart() {
  return (
    <div
      style={{ width: "100%", height: 180 }}
      className="dark:  dark:bg-slate-900"
    >
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="4 0" stroke="#f1f5f9" />
          <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 12 }} />
          <YAxis hide />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#06b6d4"
            strokeWidth={3}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
