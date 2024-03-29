import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import EditProfileField from "../EditProfileField";
import {
	validateEmail,
	validatePhone,
	validateUsername,
} from "../../helpers/accountValidation";

const ProfileHeader = (props) => {
	const { profileAccount, setProfileAccount, permission } = props;

	const [profilePicture, setProfilePicture] = useState();
	const [actualPicture, setActualPicture] = useState();

	const [bioToggle, setBioToggle] = useState(false);
	const [phoneToggle, setPhoneToggle] = useState(false);
	const [emailToggle, setEmailToggle] = useState(false);

	let APIURL = "http://localhost:8000";

	const handleImageUpload = (e) => {
		e.preventDefault();
		const data = new FormData();
		data.append("image", actualPicture);
		data.append("title", `${profileAccount.username}_picture`);
		fetch(`${APIURL}/images/upload/`, {
			method: "POST",
			body: data,
		})
			.then((response) => response.json())
			.then((result) => {
				setProfilePicture(`${APIURL}${result.image}`);

				fetch(`${APIURL}/accounts/user/`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `${localStorage.getItem(
							"Authorization"
						)}`,
					},
					body: JSON.stringify({
						...profileAccount,
						password_1: "",
						password_2: "",
						profile_picture: result.pk,
					}),
				})
					.then((response) => response.json())

					.then((result) => {
						setProfileAccount({
							...profileAccount,
							result,
						});
					});
			});
	};

	useEffect(() => {
		console.log("3");

		if (profileAccount.profile_picture) {
			setProfilePicture(
				`${APIURL}${profileAccount.profile_picture.image}`
			);
		}
	}, []);

	useEffect(() => {
		console.log("2");
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
				console.log(result);
			});
	}, [profileAccount]);

	// Return a component where the profileAccount's avatar is displayed centered with bootstrap,
	// and blow it is the username, first name, last name, bio, and rating of the user
	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="card">
							<div className="card-body">
								<div className="row">
									<div className="col-12 col-md-4 d-flex justify-content-center align-items-center">
										{profilePicture ? (
											<img
												src={profilePicture}
												alt="avatar"
												className="img-fluid rounded-circle avatar"
											/>
										) : (
											<>
												{permission ? (
													<div className="add-profile-pic">
														<h3>
															Add a profile
															picture
														</h3>
														<form
															onSubmit={(e) =>
																handleImageUpload(
																	e
																)
															}
															className="d-flex flex-column"
														>
															<input
																type="file"
																name="image"
																id="image"
																className="form-control"
																onChange={(e) =>
																	setActualPicture(
																		e.target
																			.files[0]
																	)
																}
															/>
															<button
																type="submit"
																className="btn btn-primary mt-2"
															>
																Submit
															</button>
														</form>
													</div>
												) : (
													<img
														src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pphfoundation.ca%2Fwp-content%2Fuploads%2F2018%2F05%2Fdefault-avatar.png&f=1&nofb=1&ipt=585d0ba94f18f55d1a9f4950f1a2a870987a0a5692553104b6c33600b7a884e6&ipo=images"
														alt="avatar"
														className="img-fluid rounded-circle avatar"
													/>
												)}
											</>
										)}
									</div>
									<div className="col-12 mt-4 mt-md-0  col-md-4 d-flex justify-content-center">
										<div>
											<h1>{profileAccount.username}</h1>
											<h3>
												{profileAccount.first_name}{" "}
												{profileAccount.last_name}
											</h3>
											{bioToggle ? (
												<EditProfileField
													type="text"
													field="biography"
													setToggle={setBioToggle}
													profileAccount={
														profileAccount
													}
													setProfileAccount={
														setProfileAccount
													}
													validator={validateUsername}
													errorMsg="Not a valid bio"
												/>
											) : (
												<p
													onClick={() => {
														if (permission) {
															setBioToggle(true);
														}
													}}
												>
													{profileAccount.biography
														? profileAccount.biography
														: "Add a bio"}
												</p>
											)}
											<p>
												Rating:{" "}
												{profileAccount.guest_rating}
											</p>
										</div>
									</div>
									<div className="col-12 mt-4 mt-md-0 col-md-4 d-flex justify-content-center">
										<div>
											<h4>Contact Information</h4>
											{phoneToggle ? (
												<EditProfileField
													type="text"
													field="phone_number"
													setToggle={setPhoneToggle}
													profileAccount={
														profileAccount
													}
													setProfileAccount={
														setProfileAccount
													}
													validator={validatePhone}
													errorMsg="Not a valid phone number"
												/>
											) : (
												<p
													onClick={() => {
														if (permission) {
															setPhoneToggle(
																true
															);
														}
													}}
												>
													{profileAccount.phone_number
														? profileAccount.phone_number
														: "Add a phone number"}
												</p>
											)}
											{emailToggle ? (
												<EditProfileField
													type="email"
													field="email"
													setToggle={setEmailToggle}
													profileAccount={
														profileAccount
													}
													setProfileAccount={
														setProfileAccount
													}
													validator={validateEmail}
													errorMsg="Not a valid email"
												/>
											) : (
												<p
													onClick={() => {
														if (permission) {
															setEmailToggle(
																true
															);
														}
													}}
												>
													{profileAccount.email
														? profileAccount.email
														: "Add an email"}
												</p>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProfileHeader;
