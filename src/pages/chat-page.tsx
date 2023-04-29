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
import { UserResponseType, createUser, getUser } from "./api/user/user";
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
        let userResult: UserResponseType;

        // Means no user found
        if (Object.keys(currentUser).length === 0) {
          // This means user has never connected
          // 1. create user
          userResult = await createUser(user.uid);
          channelId = userResult.channelId;
        } else {
          userResult = currentUser;
        }

        // 2. create chat token
        const { token } = await createToken(userResult.userId);

        // 3. create chat user
        const chatUser = new ChatUser(userResult.userId);
        await chatUser.connect(token);

        channelId = userResult.channelId;

        // 4. create channel
        const channel = await createChannel(channelId, [
          userResult.userId,
          "assistant",
        ]);
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