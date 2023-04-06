import React, { useEffect, useState } from "react";
import ProfileProperty from "../ProfileProperty";

const ProfileAccepted = (props) => {
	const { properties } = props;

	const [images, setImages] = useState([]);

	useEffect(() => {
		// Get the images
		let APIURL = "http://localhost:8000";
		async function fetchImages() {
			let request = await fetch(`${APIURL}/images/`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			let response = await request.json();
			setImages(response);
			// console.log(images.forEach((image) => console.log(image.pk)));
			// console.log(images.filter((image) => 1 === image.pk));
		}
		fetchImages();
		// console.log(properties);

		// For each property, inspect the image value, and loop through each image, inspecting the pk. If they match, assign the image
		// to the property
	}, []);

	// Loop through each property in the properties array and return a ProfileProperty component
	return (
		<>
			{Object.keys(images).length > 0 ? (
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
									<div className="row">
										<div className="col-12">
											<h1 className="text-center">
												Accepted Stays TODO
											</h1>
										</div>
									</div>
									<div className="row">
										{properties?.map((property, index) => (
											<div
												className="col-12 col-md-4 mt-4"
												key={index}
											>
												<ProfileProperty
													property={property}
													picture={
														images.filter(
															(imageOBJ) =>
																property.images ===
																imageOBJ.pk
														)[0].image
													}
												/>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
									<div className="row">
										<div className="col-12">
											<h1 className="text-center">
												Accepted Stays TODO
											</h1>
										</div>
									</div>
									<div className="row d-flex justify-content-center align-items-center">
										No Properties
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ProfileAccepted;
