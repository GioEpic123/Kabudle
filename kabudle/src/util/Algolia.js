import algoliasearch from "algoliasearch/lite";

const client = algoliasearch(
	process.env.ALGOLIA_APP_ID,
	process.env.ALGOLIA_ADMIN_API_KEY
);
const index = client.initIndex("recipes");

export default index;
