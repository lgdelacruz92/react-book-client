export const getUser = async (userId: string) => {
  return await fetch(`${process.env.API_URL}/user/get/${userId}`);
};

export const createUser = async (userId: string) => {
  return await fetch(`${process.env.API_URL}/user/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
};
