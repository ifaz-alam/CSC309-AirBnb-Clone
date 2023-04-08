import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { useParams } from "react-router-dom";
import ProfileHeader from "../../components/ProfileHeader";
import ProfileProperties from "../../components/ProfileProperties";
import ProfilePending from "../../components/ProfilePending";
import ProfileAccepted from "../../components/ProfileAccepted";
import ProfilePast from "../../components/ProfilePast";
import ProfileCommentSection from "../../components/ProfileCommentSection";

const ProfilePage = () => {
	const { profileUser } = useParams();
	const [profileAccount, setProfileAccount] = useState({});
	const permission = localStorage.getItem("username") === profileUser;

	// const testing = {
	// 	username: "Xenon",
	// 	avatar: "https://img.ecartelera.com/noticias/58800/58887-m.jpg",
	// 	first_name: "Austin",
	// 	last_name: "Blackman",
	// 	bio: "I am a software engineer",
	// 	rating: "5",
	// 	phone: "123-456-7890",
	// 	email: "austin@gmail.com",
	// };
	let APIURL = "http://localhost:8000";

	useEffect(() => {
		// fetch user profile
		let APIURL = "http://localhost:8000";
		async function fetchProfile() {
			let request = await fetch(`${APIURL}/accounts/user/get/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					pk: "0",
					all: "true",
				}),
			});

			let response = await request.json();

			// Iterate through the response and find the user with the username
			// that matches the profileUser parameter
			let account = null;
			for (let i = 0; i < response.length; i++) {
				if (response[i].username === profileUser) {
					account = response[i];
				}
			}
			if (account === null) {
				setProfileAccount({ username: "User not found" });
			} else {
				setProfileAccount(account);
			}
		}
		fetchProfile();
	}, []);

	const updateRating = (newRating) => {
		setProfileAccount({
			...profileAccount,
			guest_rating: newRating,
		});
		console.log(profileAccount);

		fetch(`${APIURL}/accounts/user/`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${localStorage.getItem("Authorization")}`,
			},
			body: JSON.stringify({
				...profileAccount,
				password_1: "",
				password_2: "",
			}),
		})
			.then((response) => response.json())

			.then((result) => {
				console.log("Success:", result);
			});
	};

	return (
		<>
			{Object.keys(profileAccount).length > 0 ? (
				profileAccount.username === "User not found" ? (
					<div>Account not found</div>
				) : (
					<>
						<div className="mt-3">
							<ProfileHeader
								profileAccount={profileAccount}
								setProfileAccount={setProfileAccount}
								permission={permission}
							/>
						</div>
						<div className="mt-3">
							<ProfileProperties
								properties={profileAccount.properties}
							/>
						</div>
						<>
							{permission ? (
								<>
									<div className="mt-3">
										<ProfilePending
											properties={
												profileAccount.properties
											}
										/>
									</div>
									<div className="mt-3">
										<ProfileAccepted
											properties={
												profileAccount.properties
											}
										/>
									</div>
									<div className="mt-3">
										<ProfilePast
											properties={
												profileAccount.properties
											}
										/>
									</div>
								</>
							) : (
								<></>
							)}
						</>
						<div className="mt-3">
							<ProfileCommentSection
								ParentType="Property"
								ParentID="1"
								updateRating={updateRating}
							/>
						</div>
					</>
				)
			) : (
				<div>Loading</div>
			)}
		</>
	);
};

export default ProfilePage;
