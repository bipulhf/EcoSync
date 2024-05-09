import * as jose from "jose";
import { cookies } from "next/headers";
import { getJWT } from "./actions";

export async function verify(token: string) {
  const decoded = await jose.jwtVerify(
    token as string,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );
  return decoded.payload;
}

export default async function extractUserInfo() {
  const data = await verify((await getJWT()) as string);

  return {
    id: data.userId as string,
    name: data.name as string,
    roles: data.roles as string[],
    permissions: data.permissions as string[],
    photo: data.profile_photo as string,
    sts_id: data.sts_id as string,
    landfill_id: data.landfill_id as string,
  };
}
