import "@/styles/globals.css";
import "@/styles/editor.css";

import { type AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Analytics } from "@vercel/analytics/react";
import { useEffect, useState } from "react";
import { getSessionKey } from "@/lib/firebase";
import { useRouter } from "next/router";
import { getUser } from "@/services/user.service";
import { getSession } from "@/services/session.service";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const { uid } = getSession();
    if (!uid) {
      router.push("/signin");
    }
  }, []);

  return (
    <ChakraProvider>
      <Component {...pageProps} />
      <Analytics />
    </ChakraProvider>
  );
}
