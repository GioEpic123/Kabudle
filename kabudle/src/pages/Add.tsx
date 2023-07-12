import "../App.css";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import React from "react";

function Add() {
  return (
    <div>
      <h1>You + Me is a hell of a recipe ~ 3 ~ </h1>
      <a href="/">Home</a>
      <br></br>
      <a href="/favorites">Favorites</a>
    </div>
  );
}

export default Add;
