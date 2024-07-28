import React from "react";
import Navbar from "../components/Navbar";
import indexRecipes from "../util/forceIndexTool.js";

// Util page to force an index update

function ForceIndexPage() {
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
