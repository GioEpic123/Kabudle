import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
	const [searchText, setSearchText] = useState("");
	const navigate = useNavigate();

	const handleChange = (e) => {
		setSearchText(e.target.value);
	};

	const performSearch = (e) => {
		//navigate to search page
		navigate(`/search/${searchText}`);
	};

	return (
		<form className="search-bar" onSubmit={performSearch}>
			<input
				value={searchText}
				type="text"
				placeholder="Search..."
				onChange={handleChange}
			/>
			<button type="submit">Search me!</button>
		</form>
	);
}

export default SearchBar;
