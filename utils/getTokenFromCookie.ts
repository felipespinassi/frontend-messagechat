"use server";

import { cookies } from "next/headers";

export async function getTokemFromCookie() {
  const token = (await cookies()).get("accessToken");

  return token;
}
