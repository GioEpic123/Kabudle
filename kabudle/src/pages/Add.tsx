import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

//Firebase
import { UserContext } from "../util/UserContext.tsx";
import {
	getFirestore,
	collection,
	addDoc,
	serverTimestamp,
} from "firebase/firestore";
import app from "../util/DBConnect.js";

import Navbar from "../components/Navbar.tsx";

const db = getFirestore(app);

function Add() {
	const user = useContext(UserContext);

	return (
		<div>
			<Navbar />
			<h1>Recipe Writer</h1>
			<h3>You + Me is a hell of a recipe ~ 3 ~ : </h3>
			{user ? (
				<RecipeWriter user={user} />
			) : (
				<div>
					<p>
						Hey There! It appears you'd like to contribute, but your logged
						out...
					</p>
					<p>Log in to contribute your own, delicious recipies to Kabudle!</p>
				</div>
			)}
			<div></div>
		</div>
	);
}

// Generate a form to write a recipe onto the database
function RecipeWriter({ user }) {
	const navigate = useNavigate();
	const recipeRef = collection(db, "recipe");

	//These values are set by the form on completion
	const [title, setTitle] = useState("");
	const [cookTime, setCookTime] = useState("");
	const [ingredients, setIngredients] = useState("");
	//TODO: Get steps in a list format
	const [directions, setDirections] = useState("");
	const [photoURL, setPhotoURL] = useState("");

	// --> Migrate to a state object

	// One state holds all of the form's fields
	const [formData, setFormData] = useState({
		title: "",
		cookTime: "",
		ingredients: "",
		directions: "",
		photoURL: "",
	});

	//Updates saved info on page change
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	// Writes recipe to DB on submit
	const saveUserData = async (e) => {
		e.preventDefault();

		// Photo optional
		if (
			!formData.title ||
			!formData.cookTime ||
			!formData.ingredients ||
			!formData.directions
		) {
			alert("Please fill out all required fields.");
			return;
		}

		// Writes recipe with auto-generated ID
		await addDoc(recipeRef, {
			...formData,
			createdAt: serverTimestamp(),
			creatorName: user?.displayName,
			creatorEmail: user?.email,
		});

		// Go home on completion
		navigate("/");
	};

	return (
		<div className="RecipeWriter">
			<form className="recipe-writer-form" onSubmit={saveUserData}>
				<h2>
					Please enter your recipe to be saved. Once finished, hit Submit below!
				</h2>
				<div>
					<label>Title: </label>
					<input
						name="title"
						value={formData.title}
						type="text"
						placeholder="Toast"
						onChange={handleChange}
					/>
				</div>
				<div>
					<label>Cook Time (in Minutes): </label>
					<input
						name="cookTime"
						value={formData.cookTime}
						type="text"
						placeholder="5 (do not write 'minutes')"
						onChange={handleChange}
					/>
				</div>
				<div>
					<label>Ingredients: </label>
					<input
						name="ingredients"
						value={formData.ingredients}
						type="text"
						placeholder="One slice of Bread"
						onChange={handleChange}
					/>
				</div>
				<div>
					<label>Directions: </label>
					<input
						name="directions"
						value={formData.directions}
						type="text"
						placeholder="Place in Toaster for 2 minutes. Let Cool for 2 more. Enjoy!"
						onChange={handleChange}
					/>
				</div>
				<div>
					<label>Add a photo URL to showcase your work of art! </label>
					<input
						name="photoURL"
						value={formData.photoURL}
						type="text"
						placeholder="http://photo.com"
						onChange={handleChange}
					/>
				</div>
				<div className="btns">
					<button className="submit-btn" type="submit">
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}

export default Add;
