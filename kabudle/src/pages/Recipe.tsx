import "../App.css";
import { useNavigate, useParams } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import React, { useEffect, useState } from "react";
import {
  getDoc,
  getFirestore,
  collection,
  doc,
  where,
  QuerySnapshot,
  DocumentSnapshot,
} from "firebase/firestore";

import app from "../DBConnect.js";
import CatAnimation from "./CatAnimation.tsx";

const db = getFirestore(app);

const LOADING_STRING = "loading";
const ERROR_STRING = "error";
const RECIPE_STRING = "recipe";
const DONE_STRING = "done";

function Recipe() {
  const params = useParams();
  const { recipeID } = params;
  //   const [ recipeID, setRecipeID ] = useState("");
  //   setRecipeID(params.recipeID ?? "");

  return (
    <div className="custom-cursor">
      <h1>Recipe Page for {recipeID} </h1>
      <a href="/">Home</a>
      <br></br>
      <a href="/add">Add a Recipe</a>
      <br></br>
      <PopulateRecipe recipeID={recipeID} />
      <CatAnimation />
    </div>
  );
}

// Shows the recipe's Page if it exists, and displays a 404 otherwise
function PopulateRecipe(props) {
  const [loadState, setLoadState] = useState(LOADING_STRING);
  const [docSnap, setDocSnap] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const docRef = doc(db, RECIPE_STRING, props.recipeID);
    getDoc(docRef)
      .then((docSnap) => {
        setDocSnap(docSnap);
        setLoadState(DONE_STRING);
      })
      .catch((err) => {
        setLoadState(ERROR_STRING);
        setError(err);
      });
  });

  // If an error was reached, display the error message
  if (loadState === ERROR_STRING) {
    return (
      <div>
        <h2>Error Loading Recipe Page:</h2>
        <p>{error}</p>
      </div>
    );
  }

  //Show a loading screen while API loads, then show recipe page
  return (
    <div>
      {loadState === LOADING_STRING ? (
        <h2>Loading</h2>
      ) : (
        <div>
          {!docSnap.exists() ? (
            <h1>Doc Doesn't Exist!</h1>
          ) : (
            <div>
              <h2>{docSnap.data().title}</h2>
              {/* To:do - Change input from one text block to multiple ones */}
              <h3>{docSnap.data().cookTime} minutes</h3>
              <br></br>
              <h4>Ingredients:</h4>
              <p>{docSnap.data().ingredients}</p>
              <br></br>
              <h4>Directions:</h4>
              <p>{docSnap.data().directions}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Recipe;
