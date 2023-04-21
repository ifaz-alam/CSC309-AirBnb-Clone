import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
const ProfilePropertyAcceptedToOthers = (props) => {
	const { property, picture, state, owner, reservation } = props;

	const [toggled, setToggled] = useState(false);
	const navigate = useNavigate();
	let APIURL = "http://localhost:8000";

	const handleTerminate = () => {
		console.log("Reject");
	};

	return (
		<div className="card">
			<img
				src={`${APIURL}${picture}`}
				alt={property.name}
				className="card-img-top"
				onClick={() => navigate(`/properties/gallery/${property.id}`)}
				onMouseOver={(e) => (e.currentTarget.style.cursor = "pointer")}
			/>
			<div className="card-body">
				<h5 className="card-title">{property.name}</h5>
				<p className="card-text">
					Guest: <a href={`/accounts/profile/${owner}`}> {owner}</a>{" "}
				</p>
				<p className="card-text">
					Start Date: {reservation.start_date}
				</p>
				<p className="card-text">End Date: {reservation.end_date}</p>
				<p className="card-text">State: pending</p>
				<div className="buttons d-flex justify-content-evenly">
					<button
						className="btn btn-danger"
						onClick={() => handleTerminate()}
					>
						TERMINATE
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProfilePropertyAcceptedToOthers;
