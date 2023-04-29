import { Center } from "@chakra-ui/react";
import GoogleSignInButton from "./components/google/google-signin-button";

const SignIn = () => {
  return (
    <Center height="100vh">
      <GoogleSignInButton redirect="chat" />
    </Center>
  );
};

export default SignIn;
