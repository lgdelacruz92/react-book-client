import React, { useEffect } from "react";
import AppFirebase from "@/lib/firebase";
import { useRouter } from "next/router";
import GoogleSignOutButton from "./components/google/google-signout-button";
import { createUser, getUser } from "./api/user/user";
import { createToken } from "./api/chat/chat";
import { ChatChannel, ChatUser } from "@/services/chat";

interface ChatProps {}

const Chat: React.FC<ChatProps> = () => {
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = AppFirebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        router.push("/signin");
      } else {
        const initializeChat = async () => {
          console.log(user);
          const currentUser = await getUser(user.uid);
          if (!currentUser) {
            // This means user has never connected
            // 1. create user
            const { channelId } = await createUser(user.uid);

            // 2. create chat token
            const { token } = await createToken(user.uid);

            // 3. creat chat user
            const chatUser = new ChatUser(user.uid);
            await chatUser.connect(token);

            // 4. create channel
            const channel = new ChatChannel(channelId);
            await channel.create([user.uid, "assistant"]);
            console.log(channel);
          }
        };
        initializeChat();
      }
    });

    return unsubscribe;
  }, []);
  return (
    <div>
      <GoogleSignOutButton />
    </div>
  );
};

export default Chat;
