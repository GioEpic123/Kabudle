import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.tsx";

// Firebase
import { QuerySnapshot, DocumentData } from "firebase/firestore";
import { query, getFirestore, collection, getDocs } from "firebase/firestore";

import app, { firestoreDB } from "../util/DBConnect.js";
import { SEMAPHORES, RECIPE_COLLECTION } from "../util/constants.js";

function Home() {
	return (
		<div>
			<Navbar />
			<h1>Home</h1>
			<h3>I'm always home when I'm with you ^3^</h3>
			<RecipeList />
		</div>
	);
}

//Generate a list of recipes after API call returns, show "loading" otherwise
function RecipeList() {
	// Variables to track API status
	const [loadState, setLoadState] = useState(SEMAPHORES.LOADING);
	const [snapshot, setSnapshot] = useState<QuerySnapshot<DocumentData> | null>(
		null
	);
	const [error, setError] = useState("");

	//Make an API Call when page is loaded
	useEffect(() => {
		const q = query(collection(firestoreDB, RECIPE_COLLECTION));

		getDocs(q)
			.then((querySnapshot) => {
				//Save data and take note that we're done
				setSnapshot(querySnapshot);
				setLoadState(SEMAPHORES.DONE);
			})
			.catch((err) => {
				//Save error to display to user
				setLoadState(SEMAPHORES.ERROR);
				setError(err.message);
			});
	}, []);

	// If an error was reached, display the error message
	if (loadState === SEMAPHORES.ERROR) {
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
			{loadState === SEMAPHORES.LOADING ? (
				<h2>Loading</h2>
			) : (
				<div>
					<h2>Number of Recipes: {snapshot?.docs.length}</h2>
					<div>
						{snapshot?.docs.map((val, key) => {
							const data = val.data();
							return (
								<a href={`/recipe/${val.id}`}>
									<div className="recipe-tile">
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
