import { getTokemFromCookie } from "./getTokenFromCookie";

export const fetcher = async (...args: any) => {
  const token = await getTokemFromCookie();

  return fetch(...args, {
    headers: {
      Authorization: `Bearer ${token!.value}`,
    },
  }).then((res) => res.json());
};
