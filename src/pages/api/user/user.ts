import { get } from "../get";
import { post } from "../post";

export const getUser = async (userId: string): Promise<UserResponseType> => {
  const userJson = await get(`/user/get/${userId}`);
  return { ...userJson };
};

export interface UserResponseType {
  userId: string;
  channelId: string;
  authUserId: string;
}

export const createUser = async (userId: string): Promise<UserResponseType> => {
  const userJson = await post("/user/create", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });

  return {
    ...userJson,
  };
};
