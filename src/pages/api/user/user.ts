import { get } from "../get";
import { post } from "../post";

export const getUser = async (userId: string) => {
  return await get(`/user/get/${userId}`);
};

export const createUser = async (userId: string) => {
  return await post("/user/create", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
};
