import { apiURL } from "../apIURL";
import { post } from "../post";

export const createToken = async (userId: string) => {
  return await post(`/chat/token`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
};
