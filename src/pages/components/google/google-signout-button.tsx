import AppFirebase from "@/lib/firebase";

const GoogleSignOutButton = () => {
  return (
    <div>
      <button onClick={() => AppFirebase.auth().signOut()}>Sign out</button>
    </div>
  );
};

export default GoogleSignOutButton;
