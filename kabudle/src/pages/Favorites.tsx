import "../App.css";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// ?? Idk what this does
//import { useAuthState } from "react-firebase-hooks/auth";
import React from "react";
import Navbar from "../components/Navbar.tsx"


function Favorites() {
  return (
    <div>
      <Navbar/>
      <h1>You're my favorite ;)</h1>
      <a href="/">Home</a>
      <br></br>
      <a href="/add">Add a Recipe</a>
      <p>This is intended to be a user favorite's page. It will be blocked behind auth</p>
      <p> and display a similar scroll of recipes as our home page. </p>
    </div>
  );
}

export default Favorites;
