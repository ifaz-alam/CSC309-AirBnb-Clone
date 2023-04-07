import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

const ProfileHeader = (props) => {
	const { profileAccount, setProfileAccount } = props;

	const [profilePicture, setProfilePicture] = useState();
	const [actualPicture, setActualPicture] = useState();
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
		if (profileAccount.profile_picture) {
			setProfilePicture(
				`${APIURL}${profileAccount.profile_picture.image}`
			);
		}
	}, []);

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
											<div className="add-profile-pic">
												<h3>Add a profile picture</h3>
												<form
													onSubmit={(e) =>
														handleImageUpload(e)
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
										)}
									</div>
									<div className="col-12 mt-4 mt-md-0  col-md-4 d-flex justify-content-center">
										<div>
											<h1>{profileAccount.username}</h1>
											<h3>
												{profileAccount.first_name}{" "}
												{profileAccount.last_name}
											</h3>
											<p>{profileAccount.biography}</p>
											<p>{profileAccount.phone_number}</p>
											<p>
												Rating:{" "}
												{profileAccount.guest_rating}
											</p>
										</div>
									</div>
									<div className="col-12 mt-4 mt-md-0 col-md-4 d-flex justify-content-center">
										<div>
											<h4>Contact Information</h4>
											<p>{profileAccount.phone}</p>
											<p>{profileAccount.email}</p>
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
