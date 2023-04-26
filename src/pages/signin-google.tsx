import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC8V5Na-9UHxgfBdDL0eGSGRglMliHdOl4",
  authDomain: "ai-tutoring-f9f53.firebaseapp.com",
  projectId: "ai-tutoring-f9f53",
  storageBucket: "ai-tutoring-f9f53.appspot.com",
  messagingSenderId: "561259345048",
  appId: "1:561259345048:web:c4e46fa1216d5a703f4ced",
  measurementId: "G-06NSQNZPGT",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  if (typeof window !== "undefined") {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  }
}

const GoogleSignInButton = ({ firebase }: { firebase: any }) => {
  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
      console.log("Successfully signed in with Google");
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handleSignIn}>Sign in with Google</button>;
};

interface GoogleAuthProps {}

const GoogleAuth: React.FC<GoogleAuthProps> = () => {
  return (
    <div>
      <GoogleSignInButton firebase={firebase} />
    </div>
  );
};

export default GoogleAuth;
