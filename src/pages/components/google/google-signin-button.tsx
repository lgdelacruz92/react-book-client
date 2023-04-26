import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const GoogleSignInButton = () => {
  const handleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      console.log("Successfully signed in with Google", { credential });
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handleSignIn}>Sign in with Google</button>;
};

export default GoogleSignInButton;
