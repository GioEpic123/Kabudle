import "../App.css";
// ?? Idk what this does
//import { useAuthState } from "react-firebase-hooks/auth";
import React, { useContext } from "react";
import Navbar from "../components/Navbar.tsx";
import { UserContext } from "../util/UserContext.tsx";

function Favorites() {
	const user = useContext(UserContext);

	return (
		<div>
			<Navbar />
			<h1>You're my favorite ;)</h1>
			<a href="/">Home</a>
			<br></br>
			<a href="/add">Add a Recipe</a>
			{user ? (
				//user
				<div>
					<p>Hia {user.displayName}! </p>
					<p>
						We're working on getting favorites up and running for your
						faaaaavorite recipies!
					</p>
				</div>
			) : (
				//None
				<div>
					<p>Hey There!</p>
					<p>We noticed you're not logged into an account...</p>
					<p>Well, ya can't have any favorites if you're nobody, right?</p>
					<br></br>
					<p>Log in to see your favorites!</p>
				</div>
			)}
		</div>
	);
}

export default Favorites;
