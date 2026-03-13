import { NextResponse } from "next/server";
import NextAuth from "next-auth";

import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((request) => {
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isLoginRoute = request.nextUrl.pathname.startsWith("/admin/login");
  const isAuthenticated = Boolean(request.auth?.user);

  if (isAdminRoute && !isLoginRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/login", request.nextUrl));
  }

  if (isLoginRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin", request.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"]
};
