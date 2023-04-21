import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { sendNotification } from "../../helpers/notifications";

// Pending requests that you as a user sent to other people
const ProfilePropertyToOthers = (props) => {
	const { property, picture, state, owner, reservation } = props;

	const [toggled, setToggled] = useState(false);
	const navigate = useNavigate();
	let APIURL = "http://localhost:8000";

	const handleReject = async () => {
		// change the state to be cancelled
		let request = await fetch(`${APIURL}/reservations/`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: localStorage.getItem("Authorization"),
			},
			body: JSON.stringify({
				reservation_id: `${reservation.id}`,
				state: "cancelled",
			}),
		});
		let response = await request.json();
		console.log(response);

		console.log("Reject");
		sendNotification(
			owner,
			"cancellation_request",
			`http://localhost:3000/accounts/profile/${owner}`
		);
		// send the notification
		setToggled(true);
		

		
	};
	if (toggled) {
		return (
			<div className="card">
				<div className="card-body d-flex justify-content-center align-items-center">
					<h5 className="card-title">Cancelled</h5>
				</div>
			</div>
		)
	}
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
					Owner: <a href={`/accounts/profile/${owner}`}> {owner}</a>{" "}
				</p>
				<p className="card-text">
					Start Date: {reservation.start_date}
				</p>
				<p className="card-text">End Date: {reservation.end_date}</p>
				<p className="card-text">State: {reservation.state}</p>
				<div className="buttons d-flex justify-content-evenly">
					<button
						className="btn btn-danger"
						onClick={() => handleReject()}
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProfilePropertyToOthers;
