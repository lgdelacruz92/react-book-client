import { apiURL } from "./apIURL";

export const get = async (url: RequestInfo | URL, options?: RequestInit) => {
  const response = await fetch(apiURL(url), options);
  return response.json();
};
