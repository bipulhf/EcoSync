import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { verify } from "./utils/verify";

export async function middleware(req: NextRequest, res: NextResponse) {
  const token =
    req.headers.get("Authorization") || req.cookies.get("jwt")?.value;
  if (token) {
    const { name, role } = await verify(token);
    if (role && name) {
      if (
        req.nextUrl.pathname === "/login" ||
        req.nextUrl.pathname === "/reset-password"
      ) {
        return NextResponse.redirect(new URL(`/${role}`, req.url));
      } else if (
        req.nextUrl.pathname.startsWith(`/${role}`) ||
        req.nextUrl.pathname === "/profile"
      ) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL(`/${role}`, req.url));
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
