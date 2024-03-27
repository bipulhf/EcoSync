import * as jose from "jose";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export async function verify(token: string) {
  const decoded = await jose.jwtVerify(
    token as string,
    new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
  );
  return decoded.payload;
}

export default async function extractUserInfo() {
  const data = await verify(cookies().get("jwt")?.value as string);
  return {
    id: data.userId as string,
    name: data.name as string,
    role: data.role as string,
    photo: data.profile_photo as string,
  };
}
