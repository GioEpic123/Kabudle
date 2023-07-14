import "../App.css";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useEffect, useState } from "react";

import app from "../DBConnect.js";
import { query, getFirestore, collection, getDocs } from "firebase/firestore";

// Constant strings for use in react "useState" hooks (like semaphores)
const LOADING_STRING = "loading";
const ERROR_STRING = "error";
const RECIPE_COLLECTION = "recipe";
const DONE_STRING = "done";

// Main function returned by Home.tsx
function Home() {
  return (
    <div>
      <div>
        <h1>The Kitten Kabudle</h1>
        <h2>I'm always home when I'm with you ^3^</h2>
        <a href="/favorites">Favorites</a>
        <br></br>
        <a href="/add">Add a Recipe</a>
      </div>
      <div>
        <RecipeList />
      </div>
    </div>
  );
}

const db = getFirestore(app);

//Generate a list of recipes after API call returns, show "loading" otherwise
function RecipeList() {
  // Variables to track API status
  const [loadState, setLoadState] = useState(LOADING_STRING);
  const [snapshot, setSnapshot] = useState({});
  const [error, setError] = useState("");

  //Make an API Call when page is loaded
  useEffect(() => {
    const q = query(collection(db, RECIPE_COLLECTION));

    getDocs(q)
      .then((querySnapshot) => {
        setSnapshot(querySnapshot);
        setLoadState(DONE_STRING);
        console.log(querySnapshot);
      })
      .catch((err) => {
        setLoadState(ERROR_STRING);
        setError(err);
      });
  }, []);

  // If an error was reached, display the error message
  if (loadState === ERROR_STRING) {
    return (
      <div>
        <h2>Error Loading recipes:</h2>
        <p>{error}</p>
      </div>
    );
  }

  //Show a loading screen while API loads, then show recipe list
  return (
    <div>
      {loadState === LOADING_STRING ? (
        <h2>Loading</h2>
      ) : (
        <div>
          <h2>Number of Recipes: {snapshot.docs.length}</h2>
          <div>
            {snapshot.docs.map((val, key) => {
              return (
                <div className="recipe-listing">
                  <h3>{val.data().title}</h3>
                  <h4>{val.data().cookTime} minutes</h4>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
