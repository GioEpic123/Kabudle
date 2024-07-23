import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../util/DBConnect.js"; // Make sure this file correctly initializes your Firebase app

function Navbar() {

  const handleGoogleSignIn = () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // User is signed in.
        const user = result.user;
        console.log("User signed in:", user);
      })
      .catch((error) => {
        // Handle Errors
        console.error("Error signing in:", error);
      });
  };

  return (
    <span>
      <h1>The Kitten Kabudle</h1>
      <p>This is a temporary Navbar</p>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </span>
  );
}

export default Navbar;
