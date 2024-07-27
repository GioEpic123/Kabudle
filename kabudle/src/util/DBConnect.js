import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// Algolia 3rd party search:
import algoliasearch from "algoliasearch";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: "kabudle.firebaseapp.com",
	projectId: "kabudle",
	storageBucket: "kabudle.appspot.com",
	messagingSenderId: "515753945489",
	appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const firestoreDB = getFirestore(app);

//3rd party search
const client = algoliasearch("YourApplicationID", "YourAdminAPIKey");
export const index = client.initIndex("recipes");

export default app;
