import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
	const [searchText, setSearchText] = useState("");
	const navigate = useNavigate();

	const handleChange = (e: {
		target: { value: React.SetStateAction<string> };
	}) => {
		setSearchText(e.target.value);
	};

	const performSearch = (_e: any) => {
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
			<button type="submit">Search</button>
		</form>
	);
}

export default SearchBar;
