import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
const ProfilePropertyAccepted = (props) => {
	const { property, picture, state, guest, reservation } = props;

	const [terminated, setTerminated] = useState(false);
	const navigate = useNavigate();
	let APIURL = "http://localhost:8000";

	const handleTerminate = async () => {
		console.log("Terminate accepted request");
		let request = await fetch(`${APIURL}/reservations/`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: localStorage.getItem("Authorization"),
			},
			body: JSON.stringify({
				reservation_id: `${reservation.id}`,
				state: "terminated",
			}),
		});
		let response = await request.json();
		console.log(response);
		setTerminated(true);
	};

	const handleUndo = async () => {
		console.log("Terminate accepted request");
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
		let response = await request.json();
		console.log(response);
		setTerminated(false);
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
					Guest: <a href={`/accounts/profile/${guest}`}> {guest}</a>{" "}
				</p>
				<p className="card-text">
					Start Date: {reservation.start_date}
				</p>
				<p className="card-text">End Date: {reservation.end_date}</p>
				<p className="card-text">State: pending</p>
				<div className="buttons d-flex justify-content-evenly">
					{!terminated ? (
						<button
							className="btn btn-danger"
							onClick={() => handleTerminate()}
						>
							Terminate
						</button>
					) : (
						<button
							className="btn btn-warning"
							onClick={() => handleUndo()}
						>
							Undo
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProfilePropertyAccepted;
