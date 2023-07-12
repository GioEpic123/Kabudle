import "../App.css";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import React from "react";

function Home() {
  return (
    <div>
      <h1>Sucessfully made it home!</h1>
      <a href="/favorites">Favorites</a>
      <br></br>
      <a href="/add">Add a Recipe</a>
    </div>
  );
}

export default Home;
