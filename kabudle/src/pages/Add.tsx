import "../App.css";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useState, useEffect } from "react";

import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

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
const db = getFirestore(app);

function Add() {
  return (
    <div>
      <div>
        <h1>Welcome to the Recipe Writer!</h1>
        <h2>You + Me is a hell of a recipe ~ 3 ~ : </h2>
        <a href="/">Home</a>
        <br></br>
        <a href="/favorites">Favorites</a>
      </div>
      <div>
        <RecipeWriter />
      </div>
    </div>
  );
}

// Generate a form to write a recipe onto the database
function RecipeWriter() {
  const navigate = useNavigate();

  //These values are set by the form on completion
  const [title, setTitle] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [ingredients, setIngredients] = useState("");
  //TODO: Get steps in a list format
  const [directions, setDirections] = useState("");

  //Reference to the "recipe" collection
  const recipeRef = collection(db, "recipe");

  //When form is submitted, it calls this function to write the recipe to db
  const saveUserData = async (e) => {
    // Prevent page refresh when form is submitted
    e.preventDefault();

    //TODO: Get User Email & Name to add to recipe page

    //Creates the recipe on the "recipe" collection auto-generating an ID
    await addDoc(recipeRef, {
      createdAt: serverTimestamp(),
      ID: "anonymous",
      title: title,
      cookTime: cookTime,
      ingredients: ingredients,
      directions: directions,
    });

    //On completion, navigate the user to the home page
    navigate("/");
  };

  //Return the form to input user data

  return (
    <div className="RecipeWriter">
      <form className="recipe-writer-form" onSubmit={saveUserData}>
        <h2>
          Please enter your recipe to be saved. Once finished, hit Submit below!
        </h2>
        <div>
          <label>Title: </label>
          <input
            value={title}
            type="text"
            placeholder="Toast"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Cook Time (Minutes): </label>
          <input
            value={cookTime}
            type="text"
            placeholder="5 minutes"
            onChange={(e) => setCookTime(e.target.value)}
          />
        </div>
        <div>
          <label>Ingredients: </label>
          <input
            value={ingredients}
            type="text"
            placeholder="One slice of Bread"
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>
        <div>
          <label>Directions: </label>
          <input
            value={directions}
            type="text"
            placeholder="Place in Toaster for 2 minutes. Let Cool for 2 more. Enjoy!"
            onChange={(e) => setDirections(e.target.value)}
          />
        </div>
        <div className="btns">
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Add;
