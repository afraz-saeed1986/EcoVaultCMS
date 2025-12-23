// utils/supabase/middleware.ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  // ۱. ایجاد پاسخ اولیه
  let supabaseResponse = NextResponse.next({
    request,
  });

  // ۲. ایجاد کلاینت Supabase مخصوص Middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // اصلاح شده برای رفع خطای Argument of type...
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set({ name, value, ...options });
          });

          supabaseResponse = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set({ name, value, ...options });
          });
        },
      },
    }
  );

  // ۳. دریافت اطلاعات کاربر (این مرحله برای رفرش کردن توکن حیاتی است)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ۴. منطق محافظت از مسیرها (Route Protection)
  const isLoginPage = request.nextUrl.pathname.startsWith("/login");
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");
  const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");

  // اگر کاربر لاگین نکرده و می‌خواهد به داشبورد برود -> به لاگین هدایت شود
  if (!user && isDashboardPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // اگر کاربر لاگین کرده و می‌خواهد به صفحه لاگین برود -> به داشبورد هدایت شود
  if (user && isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
