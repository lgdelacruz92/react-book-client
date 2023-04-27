import { Box, Button } from "@chakra-ui/react";
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

import "stream-chat-react/dist/css/v2/index.css";
import GoogleSignOutButton from "./components/google/google-signout-button";
import { useRouter } from "next/router";
import { UseStreamChatClientProps } from "@/hooks/stream-chat/stream-chat.types";
import { useStreamChatClient } from "@/hooks/stream-chat/use-stream-chat-client";
import { useStreamChatChannel } from "@/hooks/stream-chat/use-stream-chat-channel";

const Playground = () => {
  const router = useRouter();
  const [user, setUser] = useState<UseStreamChatClientProps | null>();

  const { chatClient } = useStreamChatClient({
    userId: user?.userId,
    userToken: user?.userToken,
  });
  const { chatChannel } = useStreamChatChannel({
    client: chatClient,
    channel: user?.userId,
    channelOptions: {
      name: "AI-Tutor",
      members: [user?.userId || ""],
    },
  });

  useEffect(() => {
    const unsubscribe = AppFirebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        router.push("/signin");
      }
    });
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

    return unsubscribe;
  }, []);

  if (!chatClient || !chatChannel) {
    return null;
  }

  return (
    <Box id="chat-channel-container">
      <GoogleSignOutButton />
      <Button
        onClick={() => {
          if (chatChannel) {
            chatChannel.sendMessage({ text: "new message" });
          }
        }}
      >
        append a message
      </Button>
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
