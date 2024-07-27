import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//Firebase
import {
	getDoc,
	getFirestore,
	doc,
	DocumentSnapshot,
	DocumentData,
} from "firebase/firestore";
import app from "../util/DBConnect.js";

import {
	SEMAPHORES,
	RECIPE_COLLECTION,
	PLACEHOLDER_FOOD,
} from "../util/constants.js";
import Navbar from "../components/Navbar.tsx";
import "../styles/styles.css";

const db = getFirestore(app);

function Recipe() {
	const params = useParams();
	const { recipeID } = params;

	return (
		<div className="custom-cursor">
			<Navbar />
			<br></br>
			<PopulateRecipe recipeID={recipeID} />
		</div>
	);
}

// Shows the recipe's Page if it exists, and displays a 404 otherwise
function PopulateRecipe(props) {
	const [loadState, setLoadState] = useState(SEMAPHORES.LOADING);
	const [docSnap, setDocSnap] = useState<DocumentSnapshot<DocumentData> | null>(
		null
	);
	const [error, setError] = useState("");

	// Get doc using API
	useEffect(() => {
		if (!props.recipeID) {
			setLoadState(SEMAPHORES.ERROR);
			setError("No recipe string provided!");
			return;
		}
		const docRef = doc(db, RECIPE_COLLECTION, props.recipeID);
		getDoc(docRef)
			.then((docSnap) => {
				setDocSnap(docSnap);
				setLoadState(SEMAPHORES.DONE);
			})
			.catch((err) => {
				setLoadState(SEMAPHORES.ERROR);
				setError(err);
			});
	});

	// If an error was reached, display the error message
	if (loadState === SEMAPHORES.ERROR) {
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
			{loadState === SEMAPHORES.LOADING ? (
				<h2>Loading</h2>
			) : (
				<div>
					{!docSnap?.exists() ? (
						<h1>Doc Doesn't Exist!</h1>
					) : (
						(() => {
							// Self-invoking function to safely access docSnap data
							const data = docSnap.data();
							return (
								<div className="recipe-listing">
									<img
										className="recipe-page-photo"
										src={
											data.photoURL === null ? PLACEHOLDER_FOOD : data.photoURL
										}
										alt={
											data.photoURL === null
												? "No Image :("
												: data.title + " photo."
										}
									/>
									<span className="recipe-columns">
										<h2>{data.title}</h2>
										{/* To-do - Change input from one text block to multiple ones */}
										<h3>{data.cookTime} minutes</h3>
										<h4>
											Created by:{" "}
											{data.creatorName ?? "Unanmed (old entries only)"}
										</h4>
										<br></br>
										<h4>Ingredients:</h4>
										<p>{data.ingredients}</p>
										<br></br>
										<h4>Directions:</h4>
										<p>{data.directions}</p>
										<br></br>
										<p>Comments: Coming soon!</p>
									</span>
								</div>
							);
						})()
					)}
				</div>
			)}
		</div>
	);
}

export default Recipe;
