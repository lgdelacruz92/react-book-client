import { apiURL } from "./apIURL";

export const post = async (url: RequestInfo | URL, options?: RequestInit) => {
  const response = await fetch(apiURL(url), {
    method: "POST",
    ...options,
  });
  return response.json();
};
