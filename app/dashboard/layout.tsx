// app/dashboard/layout.tsx
import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

export const metadata = {
  title: "Dashboard - lessa",
};

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
