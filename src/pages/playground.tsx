import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AppFirebase from "@/lib/firebase";
import AppStreamChat from "@/lib/stream-chat";

import {
  Attachment,
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Window,
} from "stream-chat-react";
import { DefaultStreamChatGenerics } from "stream-chat-react/dist/types/types";

import "stream-chat-react/dist/css/v2/index.css";
import GoogleSignOutButton from "./components/google/google-signout-button";
import { useRouter } from "next/router";
import {
  UseStreamChatChannelProps,
  UseStreamChatClientProps,
} from "@/hooks/stream-chat/stream-chat.types";
import { useStreamChatClient } from "@/hooks/stream-chat/use-stream-chat-client";
import { useStreamChatChannel } from "@/hooks/stream-chat/use-stream-chat-channel";
const apiKey = process.env.STREAMCHAT_API_KEY || "";

// TODO: get this from backend
// const userId = "lester2";
// const userToken =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibGVzdGVyMiJ9.AcZiVADB4RIK4eNDJ_nd1dE4rcjdG3Xu8fdk5sfqqVk";

const Playground = () => {
  const router = useRouter();
  const [user, setUser] = useState<UseStreamChatClientProps | null>();
  const [channel, setChannel] = useState<UseStreamChatChannelProps | null>();

  const { chatClient } = useStreamChatClient({ userId: user?.userId });
  const { chatChannel } = useStreamChatChannel({
    client: chatClient,
    channel: channel?.channel,
    channelOptions: channel?.channelOptions,
  });

  useEffect(() => {
    if (!AppFirebase.auth().currentUser) {
      router.push("signin");
      return;
    }

    const initializeUser = async (userId: string) => {
      if (userId.length > 0) {
        const tokenResponse = await AppStreamChat.getToken(userId);
        const { token } = await tokenResponse.json();
        setUser({
          userId: userId,
          userToken: token,
        });
      }
    };

    initializeUser(AppFirebase.auth().currentUser?.uid || "");

    // console.log(AppFirebase.auth().currentUser);
    // console.log(AppFirebase.auth().currentUser?.uid);
    // console.log(AppFirebase.auth().currentUser?.email);
  }, []);

  if (!chatClient || !chatChannel) {
    return null;
  }

  return (
    <Box id="chat-channel-container">
      <GoogleSignOutButton />
      <Chat client={chatClient} theme="messaging">
        <Channel channel={chatChannel} Attachment={Attachment}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput noFiles />
          </Window>
        </Channel>
      </Chat>
    </Box>
  );
};

export default Playground;
