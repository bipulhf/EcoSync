import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(req: NextRequest, res: NextResponse) {
  const token =
    req.headers.get("Authorization") || req.cookies.get("jwt")?.value;
  if (token) {
    const decoded = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
    );
    if (decoded.payload.role && decoded.payload.name) {
      if (
        req.nextUrl.pathname === "/login" ||
        req.nextUrl.pathname === "/reset-password"
      ) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      } else if (req.nextUrl.pathname.startsWith(`/${decoded.payload.role}`)) {
        return NextResponse.next();
      }
      return NextResponse.redirect(
        new URL(`/${decoded.payload.role}`, req.url)
      );
    }
  } else if (
    req.nextUrl.pathname === "/" ||
    req.nextUrl.pathname === "/login" ||
    req.nextUrl.pathname === "/reset-password"
  ) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
