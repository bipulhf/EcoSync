import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { verify } from "./utils/verify";

export async function middleware(req: NextRequest, res: NextResponse) {
  const token =
    req.headers.get("Authorization")?.split(" ")[1] ||
    req.cookies.get("jwt")?.value;
  if (token) {
    const {
      userId,
      name,
      roles,
      permissions,
      sts_id,
      landfill_id,
      profile_photo,
    } = (await verify(token)) as {
      userId: string;
      name: string;
      roles: string[];
      permissions: string[];
      sts_id: string;
      landfill_id: string;
      profile_photo: string;
    };

    if (roles && name && permissions) {
      if (
        req.nextUrl.pathname === "/login" ||
        req.nextUrl.pathname === "/reset-password"
      ) {
        return NextResponse.redirect(new URL(`/dashboard`, req.url));
      } else {
        return NextResponse.next();
      }
    }
  } else if (
    req.nextUrl.pathname === "/" ||
    req.nextUrl.pathname === "/login" ||
    req.nextUrl.pathname === "/reset-password" ||
    req.nextUrl.pathname === "/new-password"
  ) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
