import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AppFirebase from "@/lib/firebase";

import { StreamChat, Channel as StreamChatChannel } from "stream-chat";
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
const apiKey = process.env.STREAMCHAT_API_KEY || "";

interface UseStreamChatClientProps {
  userId: string;
  userToken: string;
}

const useStreamChatClient = ({
  userId,
  userToken,
}: UseStreamChatClientProps) => {
  const [chatClient, setChatClient] =
    useState<StreamChat<DefaultStreamChatGenerics>>();

  useEffect(() => {
    const initializeChat = async () => {
      const client = new StreamChat(apiKey);
      await client.connectUser({ id: userId }, userToken);

      setChatClient(client);
    };

    initializeChat();
  }, []);
  return {
    chatClient,
  };
};

interface UseStreamChatChannelProps {
  channel: string;
  channelOptions: Record<string, string | string[]>;
  client?: StreamChat<DefaultStreamChatGenerics>;
}

const useStreamChatChannel = ({
  channel,
  channelOptions,
  client,
}: UseStreamChatChannelProps) => {
  const [chatChannel, setChatChannel] =
    useState<StreamChatChannel<DefaultStreamChatGenerics>>();

  useEffect(() => {
    const initializeChannel = async () => {
      if (client) {
        const connectedChannel = client.channel(
          "messaging",
          channel,
          channelOptions
        );
        await connectedChannel.watch();
        setChatChannel(connectedChannel);
      }
    };
    initializeChannel();
  }, [client]);

  return { chatChannel };
};

// TODO: get this from backend
const userId = "lester";
const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibGVzdGVyIn0.vl4k9H646Deg5-mAWQevIz1Mr7gm22sp1CPymE_u_bQ";

const Sidebar = () => {
  const router = useRouter();
  const [user, setUser] = useState<AppFirebase.User | null>();
  const channel = "new_channel";
  const channelOptions = {
    // add as many custom fields as you'd like
    image: "https://www.drupal.org/files/project-images/react.png",
    name: "Talk about React",
    members: ["lester"],
  };
  const { chatClient } = useStreamChatClient({ userId, userToken });
  const { chatChannel } = useStreamChatChannel({
    client: chatClient,
    channel,
    channelOptions,
  });

  useEffect(() => {
    const unsubscribe = AppFirebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    // cleanup function to unsubscribe from the listener
    return unsubscribe;
  }, []);
  if (!chatClient || !chatChannel) {
    return null;
  }

  if (!AppFirebase.auth().currentUser) {
    router.push("signin");
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

export default Sidebar;
