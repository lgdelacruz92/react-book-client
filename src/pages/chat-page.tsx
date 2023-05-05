import React, { useEffect, useState } from "react";
import AppFirebase, { Persistence, getSessionKey } from "@/lib/firebase";

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Window,
} from "stream-chat-react";
import GoogleSignOutButton from "../lib/components/google/google-signout-button";
import { UserResponseType, createUser, getUser } from "../lib/api/user/user";
import { createToken } from "../lib/api/chat/chat";
import { ChatChannel, ChatUser, createChannel } from "@/services/chat.service";
import ChatInstance from "@/lib/stream-chat";
import "stream-chat-react/dist/css/v2/index.css";
import { Center, Spinner } from "@chakra-ui/react";

interface ChatProps {
  session: {
    uid: string;
  };
}

const ChatPage: React.FC<ChatProps> = ({ session }) => {
  const [channel, setChatChannel] = useState<ChatChannel | null>(null);

  useEffect(() => {
    if (session) {
      const initializeChat = async () => {
        const currentUser = await getUser(session.uid);
        let channelId: string;
        let userResult: UserResponseType;

        // Means no user found
        if (Object.keys(currentUser).length === 0) {
          // This means user has never connected
          // 1. create user
          userResult = await createUser(session.uid);
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

    return () => {
      const disconnectUser = async () => {
        await ChatInstance.disconnectUser();
      };
      disconnectUser();
    };
  }, [session]);
  return (
    <div>
      <GoogleSignOutButton />
      {session && channel ? (
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
        <Center h="100vh">
          <Spinner size="xl" color="blue.500" />
        </Center>
      )}
    </div>
  );
};

export default ChatPage;
