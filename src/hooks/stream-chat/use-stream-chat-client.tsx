import { useEffect, useState } from "react";

import { StreamChat } from "stream-chat";

import { DefaultStreamChatGenerics } from "stream-chat-react/dist/types/types";

const apiKey = process.env.STREAMCHAT_API_KEY || "";

interface UseStreamChatClientProps {
  userId: string;
  userToken: string;
}

export const useStreamChatClient = ({
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
