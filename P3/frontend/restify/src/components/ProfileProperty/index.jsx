import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfileProperty = (props) => {
	const { property, picture } = props;
	console.log(picture);
	let APIURL = "http://localhost:8000";

	return (
		<div className="card">
			<img
				src={`${APIURL}${picture}`}
				alt={property.name}
				className="card-img-top"
			/>
			<div className="card-body">
				<h5 className="card-title">{property.name}</h5>
			</div>
		</div>
	);
};

export default ProfileProperty;
