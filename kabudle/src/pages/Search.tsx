import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Firebase
import { QuerySnapshot, DocumentData, where } from "firebase/firestore";
import { query, getFirestore, collection, getDocs } from "firebase/firestore";

import app from "../util/DBConnect.js";
import Navbar from "../components/Navbar.tsx";
import {
	SEMAPHORES,
	RECIPE_COLLECTION,
	HIGH_UNI_CHAR,
} from "../util/constants.js";

const db = getFirestore(app);

function SearchPage() {
	const params = useParams();
	const { searchString } = params;

	return (
		<div>
			<div>
				<Navbar />
				<h2>Look and see, I'm never too far :D</h2>
			</div>
			<div>
				<p>Attempting search for: {searchString}</p>
				<SearchResults searchString={searchString} />
			</div>
		</div>
	);
}

//Show results of search query when ready, show "loading" otherwise
function SearchResults(props) {
	// Variables to track API status
	const [loadState, setLoadState] = useState(SEMAPHORES.LOADING);
	const [snapshot, setSnapshot] = useState<QuerySnapshot<DocumentData> | null>(
		null
	);
	const [error, setError] = useState("");

	const navigate = useNavigate();

	//Make an API Call when page is loaded
	useEffect(() => {
		if (!props.searchString) {
			navigate("/");
			return;
		}

		const q = query(
			collection(db, RECIPE_COLLECTION),
			where("title", ">=", props.searchString),
			where("title", "<=", props.searchString + HIGH_UNI_CHAR)
		);

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
					<h2>Results: {snapshot?.docs.length}</h2>
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

export default SearchPage;
