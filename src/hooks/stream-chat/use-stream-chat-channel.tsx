import { useEffect, useState } from "react";

import { StreamChat, Channel as StreamChatChannel } from "stream-chat";

import { DefaultStreamChatGenerics } from "stream-chat-react/dist/types/types";

interface UseStreamChatChannelProps {
  channel: string;
  channelOptions: Record<string, string | string[]>;
  client?: StreamChat<DefaultStreamChatGenerics>;
}

export const useStreamChatChannel = ({
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
