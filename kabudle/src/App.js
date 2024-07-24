import Home from "./pages/Home.tsx";
import Favorites from "./pages/Favorites.tsx";
import Add from "./pages/Add.tsx";
import Recipe from "./pages/Recipe.tsx";
import { Route, Routes } from "react-router-dom";
import React from "react";

// import "dotenv/config";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/favorites" element={<Favorites />} />
				<Route path="/add" element={<Add />} />
				<Route path="/recipe">
					<Route path=":recipeID" element={<Recipe />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
