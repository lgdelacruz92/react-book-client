import "@/styles/globals.css";
import "@/styles/editor.css";

import { type AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Analytics } from "@vercel/analytics/react";
import { useEffect, useState } from "react";
import { getSessionKey } from "@/lib/firebase";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const [session, setSession] = useState<null | { uid: string }>(null);
  const router = useRouter();

  useEffect(() => {
    if (window.sessionStorage.getItem(getSessionKey())) {
      setSession(
        JSON.parse(window.sessionStorage.getItem(getSessionKey()) || "")
      );
    } else {
      router.push("/signin");
    }
  }, []);
  return (
    <ChakraProvider>
      <Component {...pageProps} session={session} />
      <Analytics />
    </ChakraProvider>
  );
}
