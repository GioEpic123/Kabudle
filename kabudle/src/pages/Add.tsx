import "../App.css";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import React from "react";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "kabudle.firebaseapp.com",
  projectId: "kabudle",
  storageBucket: "kabudle.appspot.com",
  messagingSenderId: "515753945489",
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function Add() {
  return (
    <div>
      <h1>You + Me is a hell of a recipe ~ 3 ~ : </h1>
      <p>{process.env.REACT_APP_API_KEY}</p>
      <p>{process.env.REACT_APP_APP_ID}</p>
      <a href="/">Home</a>
      <br></br>
      <a href="/favorites">Favorites</a>
    </div>
  );
}

export default Add;
