const StreamChat = {
  getToken: async (userid: string) => {
    return await fetch(`${process.env.API_URL}/streamchat/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: userid }),
    });
  },
};
export default StreamChat;
