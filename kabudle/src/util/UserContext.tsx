import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import app from "../util/DBConnect.js";

export const UserContext = createContext<User | null>(null);

// Provide user to other files
// - UserProvider is a callback, taking children
export const UserProvider = ({ children }: { children: ReactNode} ) => {
	// May cause an issue, as can't assign user to null. If so, change type
	const [user, setUser] = useState<User | null>(null);

	// - Triggers whenever file is used
	useEffect(() => {
		const auth = getAuth(app);
		// - unsubscribe is also a callback
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
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
