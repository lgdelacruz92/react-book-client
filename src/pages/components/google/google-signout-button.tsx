import firebase from "firebase/compat/app";
import { useEffect, useState } from "react";

const GoogleSignOutButton = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (firebase) {
      const unsubscribe = firebase.auth().onAuthStateChanged((user: any) => {
        setUser(user);
      });
      return () => unsubscribe();
    }
  }, [firebase]);

  if (!user) {
    return <div>Please sign in</div>;
  }
  console.log({ user: user });

  return (
    <div>
      <h2>Welcome, {user.displayName}!</h2>
      <p>Email: {user.email}</p>
      <button onClick={() => firebase.auth().signOut()}>Sign out</button>
    </div>
  );
};

export default GoogleSignOutButton;
