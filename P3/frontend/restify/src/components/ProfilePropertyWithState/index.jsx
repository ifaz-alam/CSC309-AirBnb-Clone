import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { sendNotification } from "../../helpers/notifications";

const ProfilePropertyWithState = (props) => {
	const { property, picture, state, guest, reservation } = props;

	let APIURL = "http://localhost:8000";
	const [reservationState, setReservationState] = useState("pending");
	let navigate = useNavigate();
	// handle reservation requests other people sent you
	async function handleAccept() {
		let request = await fetch(`${APIURL}/reservations/`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: localStorage.getItem("Authorization"),
			},
			body: JSON.stringify({
				reservation_id: `${reservation.id}`,
				state: "approved",
			}),
		});
		console.log("Updating the reservation to be accepted:");
		let response = await request.json();
		console.log(response);

		// update the reservation state in the component state
		setReservationState("approved");

		// send the notification
		sendNotification(guest, "reservation_approved", `http://localhost:8000/accounts/profile/${guest}`);
	}

	async function handleReject() {
		let request = await fetch(`${APIURL}/reservations/`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: localStorage.getItem("Authorization"),
			},
			body: JSON.stringify({
				reservation_id: `${reservation.id}`,
				state: "denied",
			}),
		});
		console.log("Updating the reservation to be denied:");
		let response = await request.json();
		console.log(response);

		// update the reservation state in the component state
		setReservationState("denied");
	}

	// check if the reservation has been accepted or rejected and don't render the component if it has
	if (reservationState === "approved" || reservationState === "denied") {
		return null;
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
					Guest: <a href={`/accounts/profile/${guest}`}> {guest}</a>{" "}
				</p>
				<p className="card-text">
					Start Date: {reservation.start_date}
				</p>
				<p className="card-text">End Date: {reservation.end_date}</p>
				<p className="card-text">State: {reservationState}</p>
				<div className="buttons d-flex justify-content-evenly">
					<button
						className="btn btn-success"
						onClick={() => handleAccept()}
					>
						Accept
					</button>
					<button
						className="btn btn-danger"
						onClick={() => handleReject()}
					>
						Reject
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProfilePropertyWithState;
