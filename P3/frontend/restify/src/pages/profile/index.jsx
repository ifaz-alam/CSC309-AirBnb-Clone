import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { useParams } from "react-router-dom";
import ProfileHeader from "../../components/ProfileHeader";
import ProfileProperties from "../../components/ProfileProperties";
import ProfilePending from "../../components/ProfilePending";
import ProfileAccepted from "../../components/ProfileAccepted";
import ProfilePast from "../../components/ProfilePast";
import ProfileCommentSection from "../../components/ProfileCommentSection";
import ProfilePendingToOthers from "../../components/ProfilePendingToOthers";
import ProfileAcceptedToOthers from "../../components/ProfileAcceptedToOthers";
import ProfilePastToOthers from "../../components/ProfilePastToOthers";
import { UserContext } from "../../contexts/UserContext";

const ProfilePage = () => {
	const { profileUser } = useParams();
	const [profileAccount, setProfileAccount] = useState({});
	const { user, setUser } = useContext(UserContext); // Global authenticated user state

	const permission = localStorage.getItem('username') === profileUser;
	// console.log(`Hi, I am here! ${profileUser} ${localStorage.getItem('username')}`);

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
		if (isNaN(newRating)) {
			newRating = 0;
		}
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

	const getPending = () => {
		let pending = [];
		// Iterate through the profileAccount host_reservations and find the ones with state as PENDING
		for (let i = 0; i < profileAccount.host_reservations.length; i++) {
			if (profileAccount.host_reservations[i].state === "PENDING") {
				pending.push(profileAccount.host_reservations[i].property);
			}
		}
		return pending;
	};

	const getPendingReservations = () => {
		let pending = [];
		// Iterate through the profileAccount host_reservations and find the ones with state as PENDING
		for (let i = 0; i < profileAccount.host_reservations.length; i++) {
			if (profileAccount.host_reservations[i].state === "PENDING") {
				pending.push(profileAccount.host_reservations[i]);
			}
		}
		return pending;
	};

	const getPendingToOthers = () => {
		let pending = [];
		// Iterate through the profileAccount guest_reservations and find the ones with state as PENDING
		for (let i = 0; i < profileAccount.guest_reservations.length; i++) {
			if (profileAccount.guest_reservations[i].state === "PENDING") {
				pending.push(profileAccount.guest_reservations[i].property);
			}
		}
		return pending;
	};

	const getPendingReservationsToOthers = () => {
		let pending = [];
		// Iterate through the profileAccount guest_reservations and find the ones with state as PENDING
		for (let i = 0; i < profileAccount.guest_reservations.length; i++) {
			if (profileAccount.guest_reservations[i].state === "PENDING") {
				pending.push(profileAccount.guest_reservations[i]);
			}
		}
		return pending;
	};

	const getApproved = () => {
		let accepted = [];
		// Iterate through the profileAccount host_reservations and find the ones with state as APPROVED
		for (let i = 0; i < profileAccount.host_reservations.length; i++) {
			if (profileAccount.host_reservations[i].state === "APPROVED") {
				accepted.push(profileAccount.host_reservations[i].property);
			}
		}
		return accepted;
	};

	const getApprovedReservations = () => {
		let accepted = [];
		// Iterate through the profileAccount host_reservations and find the ones with state as APPROVED
		for (let i = 0; i < profileAccount.host_reservations.length; i++) {
			if (profileAccount.host_reservations[i].state === "APPROVED") {
				accepted.push(profileAccount.host_reservations[i]);
			}
		}
		return accepted;
	};

	const getApprovedToOthers = () => {
		let accepted = [];
		// Iterate through the profileAccount guest_reservations and find the ones with state as APPROVED
		for (let i = 0; i < profileAccount.guest_reservations.length; i++) {
			if (profileAccount.guest_reservations[i].state === "APPROVED") {
				accepted.push(profileAccount.guest_reservations[i].property);
			}
		}
		return accepted;
	};

	const getApprovedReservationsToOthers = () => {
		let accepted = [];
		// Iterate through the profileAccount guest_reservations and find the ones with state as APPROVED
		for (let i = 0; i < profileAccount.guest_reservations.length; i++) {
			if (profileAccount.guest_reservations[i].state === "APPROVED") {
				accepted.push(profileAccount.guest_reservations[i]);
			}
		}
		return accepted;
	};

	const getCompletedDeniedCancelledTerminated = () => {
		let completedDeniedCancelledTerminated = [];
		// Iterate through the profileAccount host_reservations and find the ones with state as COMPLETED, DENIED, CANCELLED, or TERMINATED
		for (let i = 0; i < profileAccount.host_reservations.length; i++) {
			if (
				profileAccount.host_reservations[i].state === "COMPLETED" ||
				profileAccount.host_reservations[i].state === "DENIED" ||
				profileAccount.host_reservations[i].state === "CANCELLED" ||
				profileAccount.host_reservations[i].state === "TERMINATED"
			) {
				completedDeniedCancelledTerminated.push(
					profileAccount.host_reservations[i].property
				);
			}
		}
		return completedDeniedCancelledTerminated;
	};

	const getCompletedDeniedCancelledTerminatedReservations = () => {
		let completedDeniedCancelledTerminated = [];
		// Iterate through the profileAccount host_reservations and find the ones with state as COMPLETED, DENIED, CANCELLED, or TERMINATED
		for (let i = 0; i < profileAccount.host_reservations.length; i++) {
			if (
				profileAccount.host_reservations[i].state === "COMPLETED" ||
				profileAccount.host_reservations[i].state === "DENIED" ||
				profileAccount.host_reservations[i].state === "CANCELLED" ||
				profileAccount.host_reservations[i].state === "TERMINATED"
			) {
				completedDeniedCancelledTerminated.push(
					profileAccount.host_reservations[i]
				);
			}
		}
		return completedDeniedCancelledTerminated;
	};

	const getCompletedDeniedCancelledTerminatedToOthers = () => {
		let completedDeniedCancelledTerminated = [];
		// Iterate through the profileAccount guest_reservations and find the ones with state as COMPLETED, DENIED, CANCELLED, or TERMINATED
		for (let i = 0; i < profileAccount.guest_reservations.length; i++) {
			if (
				profileAccount.guest_reservations[i].state === "COMPLETED" ||
				profileAccount.guest_reservations[i].state === "DENIED" ||
				profileAccount.guest_reservations[i].state === "CANCELLED" ||
				profileAccount.guest_reservations[i].state === "TERMINATED"
			) {
				completedDeniedCancelledTerminated.push(
					profileAccount.guest_reservations[i].property
				);
			}
		}
		return completedDeniedCancelledTerminated;
	};

	const getCompletedDeniedCancelledTerminatedReservationsToOthers = () => {
		let completedDeniedCancelledTerminated = [];
		// Iterate through the profileAccount guest_reservations and find the ones with state as COMPLETED, DENIED, CANCELLED, or TERMINATED
		for (let i = 0; i < profileAccount.guest_reservations.length; i++) {
			if (
				profileAccount.guest_reservations[i].state === "COMPLETED" ||
				profileAccount.guest_reservations[i].state === "DENIED" ||
				profileAccount.guest_reservations[i].state === "CANCELLED" ||
				profileAccount.guest_reservations[i].state === "TERMINATED"
			) {
				completedDeniedCancelledTerminated.push(
					profileAccount.guest_reservations[i]
				);
			}
		}
		return completedDeniedCancelledTerminated;
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
											properties={getPending()}
											reservations={getPendingReservations()}
										/>
									</div>
									<div className="mt-3">
										<ProfilePendingToOthers
											properties={getPendingToOthers()}
											reservations={getPendingReservationsToOthers()}
										/>
									</div>
									<div className="mt-3">
										<ProfileAccepted
											properties={getApproved()}
											reservations={getApprovedReservations()}
										/>
									</div>
									<div className="mt-3">
										<ProfileAcceptedToOthers
											properties={getApprovedToOthers()}
											reservations={getApprovedReservationsToOthers()}
										/>
									</div>
									<div className="mt-3">
										<ProfilePast
											properties={getCompletedDeniedCancelledTerminated()}
											reservations={getCompletedDeniedCancelledTerminatedReservations()}
										/>
									</div>
									<div className="mt-3">
										<ProfilePastToOthers
											properties={getCompletedDeniedCancelledTerminatedToOthers()}
											reservations={getCompletedDeniedCancelledTerminatedReservationsToOthers()}
										/>
									</div>
								</>
							) : (
								<></>
							)}
						</>
						<div className="mt-3">
							<ProfileCommentSection
								ParentType="Account"
								ParentID={profileAccount.pk}
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
