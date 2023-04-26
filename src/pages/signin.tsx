import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import GoogleSignInButton from "./components/google/google-signin-button";
import GoogleSignOutButton from "./components/google/google-signout-button";

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDERID,
  appId: process.env.FIREBASE_APPID,
  measurementId: process.env.FIREBASE_MEASUREMENTID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  if (typeof window !== "undefined") {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  }
}

const SignIn = () => {
  return (
    <div>
      <GoogleSignInButton />
      <GoogleSignOutButton />
    </div>
  );
};

export default SignIn;
