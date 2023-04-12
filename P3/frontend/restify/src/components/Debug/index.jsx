import React, { useContext, useState } from "react";
import { useAPIContext } from "../../contexts/APIContext";
import { UserContext } from "../../contexts/UserContext";

function Debug() {
    const { user, setUser } = useContext(UserContext); // Global authenticated user state
	return (
		<>
			<p><small>Current user (Clears on Reload): {user.username}</small></p>
			<p><small>Current token: {user.Authorization}</small></p>
            <p><small>Local storage user: {localStorage.getItem("username")}</small></p>
			<p><small>Local storage token: {localStorage.getItem("Authorization")}</small></p>
			<p><small>Local Storage, pk: {localStorage.getItem("pk")}</small></p>
			<p><small>Local Storage, auth: {localStorage.getItem("Authorization")}</small></p>
		</>
    );
}

export default Debug;