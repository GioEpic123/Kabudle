import React, { useContext } from "react";
import Navbar from "../components/Navbar.tsx";
import { UserContext } from "../util/UserContext.tsx";
import indexRecipes from "../util/forceIndexTool.js";

// Util page to force an index update

function ForceIndexPage() {
	const user = useContext(UserContext);

	return (
		<div>
			<Navbar />
			<h1>Force Index Page</h1>
			<h3>Util page forces index update</h3>
			<button onClick={indexRecipes}>index recipes</button>
		</div>
	);
}

export default ForceIndexPage;
