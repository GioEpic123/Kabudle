import { Route, Routes } from "react-router-dom";
import React from "react";

import Home from "./pages/Home.tsx";
import Favorites from "./pages/Favorites.tsx";
import Add from "./pages/Add.tsx";
import Recipe from "./pages/Recipe.tsx";
import Search from "./pages/Search.tsx";

// import "dotenv/config";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/favorites" element={<Favorites />} />
				<Route path="/add" element={<Add />} />
				<Route path="/recipe" element={<Recipe />}>
					<Route path=":recipeID" element={<Recipe />} />
				</Route>
				<Route path="/search" element={<Search />}>
					<Route path=":searchString" element={<Search />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
