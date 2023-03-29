import { useState } from "react";
import { createContext } from "react";

export const APIContext = createContext({
	user: {},
	setUser: () => {},
});

export function useAPIContext() {
	const [user, setUser] = useState({ auth: "" });

	return {
		user,
		setUser,
	};
}
