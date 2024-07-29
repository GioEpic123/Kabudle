import functions from "firebase-functions";
import admin from "firebase-admin";
import algoliasearch from "algoliasearch";

admin.initializeApp();

//May change to "recipes"
const RECIPE_INDEX_NAME = "recipe";

const algoliaEnv = functions.config().algolia;
const algoliaClient = algoliasearch(algoliaEnv.app_id, algoliaEnv.admin_key);
const index = algoliaClient.initIndex(RECIPE_INDEX_NAME);

// Exported function syncs firebase data to algolia on each write (create, update, delete)
export const syncFireStoreToAlgola = functions.firestore
	.document("recipe/{docId}")
	.onWrite(async (change, context) => {
		const objectId = context.params.docId;
		// Sync changes if doc exists, delete if otherwise
		try {
			if (change.after.exists) {
				await index.saveObject({ ...change.after.data(), objectID: objectId });
			} else {
				await index.deleteObject(objectId);
			}
		} catch (error) {
			console.error("Error syncing Firestore with Algolia: " + error);
		}
	});
