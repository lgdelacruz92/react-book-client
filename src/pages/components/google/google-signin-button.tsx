import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { GoogleSignInButtonProps } from "./google.types";
import { useRouter } from "next/router";

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  redirect,
}) => {
  const router = useRouter();
  const handleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    try {
      await signInWithPopup(auth, provider);
      router.push(redirect);
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handleSignIn}>Sign in with Google</button>;
};

export default GoogleSignInButton;
