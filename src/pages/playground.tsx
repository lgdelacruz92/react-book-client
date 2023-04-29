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
import { createUser, getUser } from "@/services/user";

const Playground = () => {
  const router = useRouter();
  const [user, setUser] = useState<UseStreamChatClientProps | null>();

  const { chatClient } = useStreamChatClient({
    userId: user?.userId,
    userToken: user?.userToken,
  });
  const { chatChannel } = useStreamChatChannel({
    client: chatClient,
    channel: user?.userInfo?.channelId,
    channelOptions: {
      name: "AI-Tutor",
      members: [user?.userId || ""],
    },
  });

  useEffect(() => {
    const unsubscribe = AppFirebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        router.push("/signin");
      } else {
        const initializeUser = async (userId: string) => {
          if (userId.length > 0) {
            const getUserResponse = await getUser(userId);
            let userInfo = await getUserResponse.json();

            if (Object.keys(userInfo).length === 0) {
              const createUserReponse = await createUser(userId);
              userInfo = await createUserReponse.json();
            }
            const tokenResponse = await AppStreamChat.getToken(userId);
            const { token } = await tokenResponse.json();
            setUser({
              userId: userId,
              userToken: token,
              userInfo,
            });
          }
        };
        const userId = AppFirebase.auth().currentUser?.uid || "";
        if (userId.length > 0) {
          console.log("initializing and rendering");
          initializeUser(userId);
        }
      }
    });

    return unsubscribe;
  }, []);

  if (!chatClient || !chatChannel) {
    return null;
  }

  return (
    <Box id="chat-channel-container">
      <GoogleSignOutButton />
      <Chat client={chatClient} theme="messaging">
        <Channel channel={chatChannel}>
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
