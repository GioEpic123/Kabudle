import React, { useContext } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import app from '../util/DBConnect';
import { UserContext } from '../util/UserContext.tsx';

function Navbar() {
  const user = useContext(UserContext);
  const auth = getAuth(app);

  const handleGoogleSignIn = () => {
    
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('User signed in:', result.user);
      })
      .catch((error) => {
        console.error('Error signing in:', error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
        // Do something after sign-out?
    })
    .catch((error) => {
        console.error("Error signing out:", error);
    })
  }

  return (
    <span>
      <h1>The Kitten Kabudle</h1>
      <p>This is a temporary Navbar</p>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}!</p>
          {/* Dumb workaround for null url, use a fallback or som */}
          <img src={user.photoURL === null ? undefined : user.photoURL} alt="Profile" />
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      )}
    </span>
  );
}

export default Navbar;
