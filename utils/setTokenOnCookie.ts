"use server";
import { cookies } from "next/headers";

export async function setTokenOnCookies(value: string) {
  const date = new Date().getTime();
  try {
    await Promise.all([
      (
        await cookies()
      ).set("accessToken", value, {
        maxAge: 2 * 60 * 60,
      }),
    ]);
  } catch (error) {
    console.log(error);
  }
}
