import { Center, Heading, useBreakpointValue } from "@chakra-ui/react";
import GoogleSignInButton from "../lib/components/google/google-signin-button";

const SignIn = () => {
  const layout = useBreakpointValue({ base: "vertical", md: "horizontal" });
  return (
    <Center
      padding="2rem"
      display="flex"
      flexDirection={layout === "horizontal" ? "row" : "column"}
      height="100vh"
    >
      <Heading textAlign="center" m="1rem">
        Sign in to your google account, you must...
      </Heading>
      <GoogleSignInButton redirect="chat-page" />
    </Center>
  );
};

export default SignIn;
