import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: "kabudle.firebaseapp.com",
	projectId: "kabudle",
	storageBucket: "kabudle.appspot.com",
	messagingSenderId: "515753945489",
	appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);

export default app;
