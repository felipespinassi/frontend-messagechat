"use server";

import { cookies } from "next/headers";

export async function getUserFromCookie() {
  const user = (await cookies()).get("user");

  return user?.value ? JSON.parse(user.value) : null;
}
