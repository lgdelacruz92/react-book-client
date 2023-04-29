import React, { useEffect } from "react";
import AppFirebase from "@/lib/firebase";
import { useRouter } from "next/router";
import GoogleSignOutButton from "./components/google/google-signout-button";
import { createUser, getUser } from "./api/user/user";

interface ChatProps {}

const Chat: React.FC<ChatProps> = () => {
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = AppFirebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        router.push("/signin");
      } else {
        const initializeChat = async () => {
          const currentUser = await getUser(user.uid);
          if (!currentUser) {
            // This means user has never connected
            // 1. create user
            const newUser = await createUser(user.uid);

            // 2. connect user to chat
          } else {
            // no problem keep chatting
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
