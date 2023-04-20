import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
const ProfilePropertyWithState = (props) => {
	const { property, picture, state, guest, reservation } = props;

	let APIURL = "http://localhost:8000";
	
	// handle reservation requests other people sent you
	function handleAccept() {
		async function UpdateReservationAccepted() {
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
		}
		UpdateReservationAccepted();
	}
	
	function handleReject() {
		async function UpdateReservationDenied() {
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
		}
		UpdateReservationDenied();
	}

	return (
		<div className="card">
			<img
				src={`${APIURL}${picture}`}
				alt={property.name}
				className="card-img-top"
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
				<p className="card-text">State: pending</p>
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
