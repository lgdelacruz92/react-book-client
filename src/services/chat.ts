import ChatInstance from "@/lib/stream-chat";

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

export class ChatChannel {
  channelId: string;
  constructor(channelId: string) {
    this.channelId = channelId;
  }

  async create(userIds: string[]) {
    const channel = ChatInstance.channel("messaging", this.channelId, {
      members: [...userIds],
    });
    await channel.create();
  }
}
