import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { GoogleSignInButtonProps } from "./google.types";
import { useRouter } from "next/router";
import AppFirebase from "@/lib/firebase";
import { Button } from "@chakra-ui/react";
import GoogleIcon from "@/icons/google-icon";

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  redirect,
}) => {
  const router = useRouter();
  const handleSignIn = async () => {
    const auth = AppFirebase.auth();
    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    try {
      const userAuth = await signInWithPopup(auth, provider);
      // send token to backend then what?
      router.push(redirect);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button rightIcon={<GoogleIcon />} onClick={handleSignIn}>
      Sign in with Google
    </Button>
  );
};

export default GoogleSignInButton;
