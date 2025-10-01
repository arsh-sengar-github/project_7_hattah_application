import { NextResponse } from "next/server";
import { USER_LOGIN, USER_HOME } from "./routes/UserRoute";
import { jwtVerify } from "jose";
import { ADMIN_DASHBOARD } from "./routes/AdminRoute";

export async function middleware(request) {
  try {
    const hasToken = request.cookies.has("access_token");
    const pathname = request.nextUrl.pathname;
    if (!hasToken) {
      if (!pathname.startsWith("/auth")) {
        return NextResponse.redirect(new URL(USER_LOGIN, request.nextUrl));
      }
      return NextResponse.next();
    }
    const access_token = request.cookies.get("access_token").value;
    const { payload } = await jwtVerify(
      access_token,
      new TextEncoder().encode(process.env.SECRET_KEY)
    );
    const role = payload.role;
    if (pathname.startsWith("/auth")) {
      return NextResponse.redirect(
        new URL(role === "admin" ? ADMIN_DASHBOARD : USER_HOME, request.nextUrl)
      );
    }
    if (pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL(USER_LOGIN, request.nextUrl));
    }
    if (pathname.startsWith("/dashboard") && role !== "user") {
      return NextResponse.redirect(new URL(USER_LOGIN, request.nextUrl));
    }
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL(USER_LOGIN, request.nextUrl));
  }
}

export const config = {
  matcher: ["/auth/:path*", "/admin/:path*", "/dashboard/:path*"],
};
