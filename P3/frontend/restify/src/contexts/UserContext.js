import { createContext, useState } from "react";

export const UserContext = createContext({
	user: {},
	setUser: () => {},
});

export function useUserConext() {
	const [user, setUser] = useState({
		Authorization: "None",
		username: "Default",
	});
	return { user, setUser };
}
