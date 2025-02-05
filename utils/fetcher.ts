import { getTokemFromCookie } from "./getTokenFromCookie";

export const fetcher = async (...args: [RequestInfo, RequestInit?]) => {
  const token = await getTokemFromCookie();

  const [url, options] = args;
  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${token!.value}`,
    },
  }).then((res) => res.json());
};
