"use server";
import { cookies } from "next/headers";

export async function setUserOnCookie(value: string) {
  try {
    await Promise.all([
      (
        await cookies()
      ).set("user", value.toString(), {
        maxAge: 2 * 60 * 60,
      }),
    ]);
  } catch (error) {
    console.log(error);
  }
}
