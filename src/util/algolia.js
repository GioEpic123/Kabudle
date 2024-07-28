//Enables 3rd party searching with Algolia

import algoliasearch from "algoliasearch";
import { RECIPE_COLLECTION } from "./constants";

// When env gets working
const client = algoliasearch(
	process.env.REACT_APP_ALGOLIA_APP_ID,
	process.env.REACT_APP_ALGOLIA_ADMIN_API_KEY
);

const index = client.initIndex(RECIPE_COLLECTION);
console.log(
	"Algolia creds: " +
		process.env.REACT_APP_ALGOLIA_APP_ID +
		" " +
		process.env.REACT_APP_ALGOLIA_ADMIN_API_KEY +
		" Index: " +
		index
);

export default index;
