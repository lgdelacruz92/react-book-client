import { StreamChat } from "stream-chat";
const ChatInstance = StreamChat.getInstance(
  process.env.STREAMCHAT_API_KEY || "",
  {
    timeout: 6000,
  }
);
export default ChatInstance;
