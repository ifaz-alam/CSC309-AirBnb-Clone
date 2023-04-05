import React, { useContext, useState } from "react";
import { useAPIContext } from "../../contexts/APIContext";
import { UserContext } from "../../contexts/UserContext";

const HomeTesting = () => {
	const { user, setUser } = useContext(UserContext); // Global authenticated user state
	return (
		<>
			<h1>Testing Window</h1>
			<p>Current user: {user.username}</p>
			<p>Current token: {user.Authorization}</p>
			<p>Local Storage, pk: {localStorage.getItem("pk")}</p>
			<p>Local Storage, auth: {localStorage.getItem("Authorization")}</p>
		</>
	);
};

export default HomeTesting;
