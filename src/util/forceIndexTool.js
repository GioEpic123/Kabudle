//This code forces indexing the entire firebase db on algolia

// SHOULD NOT SHIP WITH THIS OUT

import { collection, getDocs } from "firebase/firestore";
import { firestoreDB } from "./DBConnect.js";
import index from "./algolia.js";

async function indexRecipes() {
	const recipesSnapshot = await getDocs(collection(firestoreDB, "recipes"));
	const recipes = recipesSnapshot.docs.map((doc) => ({
		objectID: doc.id,
		...doc.data(),
	}));

	await index.saveObjects(recipes);
	console.log("Recipes indexed to Algolia");
}

export default indexRecipes;
