import "../App.css";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import React from "react";

function Favorites() {
  return (
    <div>
      <h1>You're my favorite ;)</h1>
      <a href="/">Home</a>
      <br></br>
      <a href="/add">Add a Recipe</a>
    </div>
  );
}

export default Favorites;
