// app/dashboard/page.tsx
import React from "react";
import PromoCard from "../../components/PromoCard";
import StatCard from "../../components/StatCard";
import BestSeller from "../../components/BestSeller";
import RevenueChart from "../../components/RevenueChart";

export default function DashboardPage() {
  return (
    <div className="space-y-6 lg:space-y-8">
      {/* بخش بالایی: Promo سمت چپ + آمار و نمودار سمت راست */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ستون Promo - در موبایل و تبلت full-width، در دسکتاپ یک سوم */}
        <div className="space-y-4">
          <div className="font-bold text-lg">Your Promo</div>
          <div className="grid grid-cols-1 gap-4">
            <PromoCard
              colorClass="from-purple-400 to-pink-400"
              discount="65%"
            />
            <PromoCard colorClass="from-teal-400 to-cyan-400" discount="55%" />
          </div>
        </div>

        {/* ستون اصلی (آمار + نمودار + اطلاعات اضافی + بست سلر) */}
        <div className="lg:col-span-2 space-y-6">
          {/* کارت‌های آماری بالا - responsive */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
            <StatCard label="Total sales" value="321k" />
            <StatCard label="Visitor" value="678k" />
            <StatCard label="Cvr" value="7.89" />
            <StatCard label="Total orders" value="211k" />
          </div>

          {/* بخش پایین: نمودار revenue + need more info + best seller */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Summary Revenue - در موبایل و تبلت full-width، در md+ دو سوم */}
            <div className="md:col-span-2 bg-white/60 backdrop-blur-2xl rounded-3xl p-6 shadow-sm border border-white/60 dark:border-slate-950 dark: dark:bg-slate-950">
              <div className="flex items-center justify-between mb-4">
                <div className="font-bold text-lg">Summary Revenue</div>
                <div className="text-sm text-slate-400">
                  Last update last week
                </div>
              </div>
              <RevenueChart />
              <div className="flex gap-6 mt-4 text-sm">
                <div className="text-green-600 font-semibold">+23.22%</div>
                <div className="text-red-500 font-semibold">-3.31%</div>
              </div>
            </div>

            {/* ستون راست: Need more info + Best Seller - عمودی در همه سایزها */}
            <div className="space-y-4">
              <div className="bg-white/60 backdrop-blur-2xl rounded-3xl p-6 shadow-sm border border-white/60 dark:border-slate-950 dark: dark:bg-slate-950">
                <div className="font-bold text-lg">Need more information?</div>
                <div className="text-sm text-slate-400 mt-2">
                  Present information in a visually appealing way
                </div>
                <button className="mt-6 bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-2xl shadow-lg transition">
                  See more
                </button>
              </div>

              <BestSeller />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
