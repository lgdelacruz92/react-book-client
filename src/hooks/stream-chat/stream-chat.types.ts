import { StreamChat } from "stream-chat";
import { DefaultStreamChatGenerics } from "stream-chat-react/dist/types/types";

export interface UseStreamChatClientProps {
  userId?: string;
  userToken?: string;
  userInfo?: {
    userId: string;
    channelId: string;
  };
}

export interface UseStreamChatChannelProps {
  channel?: string;
  channelOptions?: Record<string, string | string[]>;
  client?: StreamChat<DefaultStreamChatGenerics>;
}
