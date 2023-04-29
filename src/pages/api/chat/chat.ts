import { apiURL } from "../apIURL";
import { post } from "../post";

export const createToken = async (userId: string) => {
  return await post(apiURL(`/chat/token`), {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
};
