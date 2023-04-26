import { Box } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

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
const apiKey = process.env.STREAMCHAT_API_KEY || "";

interface UseChatClientProps {
  userId: string;
  userToken: string;
}

const useChatClient = ({ userId, userToken }: UseChatClientProps) => {
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
const userId = "lester";
const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibGVzdGVyIn0.vl4k9H646Deg5-mAWQevIz1Mr7gm22sp1CPymE_u_bQ";

const Sidebar = () => {
  const { chatClient } = useChatClient({ userId, userToken });
  const [chatChannel, setChatChannel] =
    useState<StreamChatChannel<DefaultStreamChatGenerics>>();

  useEffect(() => {
    const initializeChannel = async () => {
      if (chatClient) {
        const channel = chatClient.channel("messaging", "new_channel", {
          // add as many custom fields as you'd like
          image: "https://www.drupal.org/files/project-images/react.png",
          name: "Talk about React",
          members: ["lester"],
        });
        await channel.watch();
        setChatChannel(channel);
      }
    };
    initializeChannel();
  }, [chatClient]);

  useEffect(() => {
    if (chatChannel) {
    }
  }, [chatChannel]);

  if (!chatClient || !chatChannel) {
    return null;
  }
  return (
    <Box id="chat-channel-container">
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
