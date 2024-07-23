import "../App.css";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { QuerySnapshot, DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";

import { query, getFirestore, collection, getDocs } from "firebase/firestore";

// Already Initialized SDK in another file for re-use
import app from "../DBConnect.js";
const db = getFirestore(app);

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

//Generate a list of recipes after API call returns, show "loading" otherwise
function RecipeList() {
  // Variables to track API status
  const [loadState, setLoadState] = useState(LOADING_STRING);
  const [snapshot, setSnapshot] = useState<QuerySnapshot<DocumentData> | null>(null);
  const [error, setError] = useState("");

  //Make an API Call when page is loaded
  useEffect(() => {
    const q = query(collection(db, RECIPE_COLLECTION));

    getDocs(q)
      .then((querySnapshot) => {
        //Save data and take note that we're done
        setSnapshot(querySnapshot);
        setLoadState(DONE_STRING);
      })
      .catch((err) => {
        //Save error to display to user
        setLoadState(ERROR_STRING);
        setError(err.message);
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
          <h2>Number of Recipes: {snapshot?.docs.length}</h2>
          <div>
            {snapshot?.docs.map((val, key) => {
              const data = val.data();
              return (
                <a href={`/recipe/${val.id}`}>
                <div className="recipe-listing">
                  <h3>{data.title}</h3>
                  <p>(Temp)ID: {val.id}</p>
                  <h4>{data.cookTime} minutes</h4>
                  {data.photoURL === undefined || data.photoURL === "" ? (
                    <img
                      className="listing-thumbnail"
                      src="https://cdnb.artstation.com/p/assets/images/images/011/033/539/large/cathleen-obrien-chefcat.jpg?1527528854"
                      alt="Cat Chef"
                    />
                  ) : (
                    <img
                      className="listing-thumbnail"
                      src={val.data().photoURL}
                      alt="Someone's Meal"
                    />
                  )}
                </div>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
