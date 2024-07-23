import React, { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../util/DBConnect.js";

export const UserContext = createContext(null);

// Provide user to other files
// - UserProvider is a callback, taking children
export const UserProvider = ({ children }) => {
	// May cause an issue, as can't assign user to null. If so, change type
	const [user, setUser] = useState(null);

	// - Triggers whenever file is used
	useEffect(() => {
		const auth = getAuth(app);
		// - unsubscribe is also a callback
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user){
				setUser(user);
			}else{
				setUser(null)
			}
		});
		// Cleanup subscription on unmount
		return () => unsubscribe();

	}, []);

	return (
		<UserContext.Provider value={user}>
			{children}
		</UserContext.Provider>
	);
};
