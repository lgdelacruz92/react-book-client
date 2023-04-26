const StreamChat = {
  getToken: async (userid: string) => {
    return await fetch(`${process.env.API_URL}/streamchat/token`, {
      method: "POST",
      body: JSON.stringify({ user: userid }),
    });
  },
};
export default StreamChat;
