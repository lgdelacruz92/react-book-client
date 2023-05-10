import "@/styles/globals.css";
import "@/styles/editor.css";

import { type AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Analytics } from "@vercel/analytics/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "@/services/session.service";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const { uid } = getSession();
    if (!uid) {
      router.push("/signin");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Component {...pageProps} />
        <Analytics />
      </ChakraProvider>
    </QueryClientProvider>
  );
}
