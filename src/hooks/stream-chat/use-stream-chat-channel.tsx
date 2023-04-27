import { useEffect, useState } from "react";

import { StreamChat, Channel as StreamChatChannel } from "stream-chat";

import { DefaultStreamChatGenerics } from "stream-chat-react/dist/types/types";
import { UseStreamChatChannelProps } from "./stream-chat.types";

export const useStreamChatChannel = ({
  channel,
  channelOptions,
  client,
}: UseStreamChatChannelProps) => {
  const [chatChannel, setChatChannel] =
    useState<StreamChatChannel<DefaultStreamChatGenerics>>();

  useEffect(() => {
    if (!client || !channelOptions || !channel) {
      return;
    }
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

    return () => {
      if (chatChannel) {
        const stopWatching = async () => {
          await chatChannel.stopWatching();
        };

        stopWatching();
      }
    };
  }, [client, channelOptions, channel]);

  return { chatChannel };
};
