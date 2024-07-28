//This code forces indexing the entire firebase db on algolia

// SHOULD NOT SHIP WITH THIS OUT

import { collection, getDocs } from "firebase/firestore";
import { firestoreDB } from "./DBConnect.js";
import index from "./algolia.js";
import { RECIPE_COLLECTION } from "./constants.js";

async function indexRecipes() {
	console.log("Indexing...");
	const recipesSnapshot = await getDocs(
		collection(firestoreDB, RECIPE_COLLECTION)
	);
	const recipes = recipesSnapshot.docs.map((doc) => ({
		objectID: doc.id,
		...doc.data(),
	}));

	index
		.saveObjects(recipes)
		.then(console.log("Recipes indexed to Algolia"))
		.catch((e) => {
			console.log("Error when saving: " + e);
		});
}

export default indexRecipes;
