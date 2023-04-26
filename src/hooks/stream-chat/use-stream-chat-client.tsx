import { useEffect, useState } from "react";

import { StreamChat } from "stream-chat";

import { DefaultStreamChatGenerics } from "stream-chat-react/dist/types/types";
import { UseStreamChatClientProps } from "./stream-chat.types";

const apiKey = process.env.STREAMCHAT_API_KEY || "";

export const useStreamChatClient = ({
  userId,
  userToken,
}: UseStreamChatClientProps) => {
  const [chatClient, setChatClient] =
    useState<StreamChat<DefaultStreamChatGenerics>>();

  useEffect(() => {
    if (!userId || !userToken) {
      return;
    }
    const initializeChat = async () => {
      const client = new StreamChat(apiKey);
      await client.connectUser({ id: userId }, userToken);

      setChatClient(client);
    };

    initializeChat();
  }, [userId, userToken]);
  return {
    chatClient,
  };
};
