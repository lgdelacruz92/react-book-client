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

      if (channel) {
        const startTutoring = async () => {
          await fetch(`${process.env.API_URL}/start-tutoring`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ channel_id: channel }),
          });
        };
        startTutoring();
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
