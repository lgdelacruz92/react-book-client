import "@/styles/globals.css";
import "@/styles/editor.css";

import { type AppProps } from "next/app";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
