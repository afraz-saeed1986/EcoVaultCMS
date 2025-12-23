// app/layout.tsx
import "./globals.css";
import { ThemeProvider } from "next-themes"; // اضافه کن
import { ReactNode } from "react";

export const metadata = {
  title: "EcoVault CMS",
  description: "Modern eco-friendly product management",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* suppressHydrationWarning برای جلوگیری از warning در dark mode */}
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light" // default light mode
          enableSystem // auto-detect prefers-color-scheme
          enableColorScheme
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
