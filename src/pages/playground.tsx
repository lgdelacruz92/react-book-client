import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { StreamChat } from "stream-chat";
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

const chatClient = new StreamChat("nf84egcdpf3m");
const userToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoid2VhdGhlcmVkLW1vcm5pbmctMSJ9.yeOriF7jOZlrPpFpF5S1zZUg7GiEVwbU5vCRxq5ql_k";

chatClient.connectUser(
  {
    id: "weathered-morning-1",
    name: "weathered-morning-1",
    image:
      "https://getstream.io/random_png/?id=weathered-morning-1&name=weathered-morning-1",
  },
  userToken
);

const channel = chatClient.channel("messaging", "custom_channel_id", {
  // add as many custom fields as you'd like
  image: "https://www.drupal.org/files/project-images/react.png",
  name: "Talk about React",
  members: ["weathered-morning-1"],
});

const Sidebar = () => {
  return (
    <Box>
      <Chat client={chatClient} theme="messaging light">
        <Channel channel={channel} Attachment={Attachment}>
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
