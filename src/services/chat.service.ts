import ChatInstance from "@/lib/stream-chat";
import { Channel } from "stream-chat";

export class ChatUser {
  userId: string;
  constructor(userId: string) {
    this.userId = userId;
  }

  async connect(token: string): Promise<void> {
    await ChatInstance.connectUser(
      {
        id: this.userId,
      },
      token
    );
  }
}

export type ChatChannel = Channel;

export const createChannel = async (channelId: string, userIds: string[]) => {
  const channel = ChatInstance.channel("messaging", channelId, {
    members: [...userIds],
  });
  await channel.create();
  return channel;
};
