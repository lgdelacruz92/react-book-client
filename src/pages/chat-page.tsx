import React, { useEffect, useState } from "react";
import AppFirebase from "@/lib/firebase";

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Window,
} from "stream-chat-react";
import GoogleSignOutButton from "./components/google/google-signout-button";
import { createUser, getUser } from "./api/user/user";
import { createToken } from "./api/chat/chat";
import { ChatChannel, ChatUser, createChannel } from "@/services/chat";
import ChatInstance from "@/lib/stream-chat";
import "stream-chat-react/dist/css/v2/index.css";

interface ChatProps {}

const ChatPage: React.FC<ChatProps> = () => {
  const [user, setUser] = useState<AppFirebase.User | null>(null);
  const [channel, setChatChannel] = useState<ChatChannel | null>(null);

  useEffect(() => {
    const unsubscribe = AppFirebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      const initializeChat = async () => {
        const currentUser = await getUser(user.uid);
        let channelId: string;
        if (!currentUser) {
          // This means user has never connected
          // 1. create user
          const userResult = await createUser(user.uid);
          channelId = userResult.channelId;
        }

        // 2. create chat token
        const { token } = await createToken(user.uid);

        // 3. create chat user
        const chatUser = new ChatUser(user.uid);
        await chatUser.connect(token);

        channelId = currentUser.channelId;

        // 4. create channel
        const channel = await createChannel(channelId, [user.uid, "assistant"]);
        setChatChannel(channel);
      };
      initializeChat();
    }
  }, [user]);
  return (
    <div>
      <GoogleSignOutButton />
      {user && channel ? (
        <Chat client={ChatInstance} theme="messaging">
          <Channel channel={channel}>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput noFiles />
            </Window>
          </Channel>
        </Chat>
      ) : (
        <div>User is logged out</div>
      )}
    </div>
  );
};

export default ChatPage;
