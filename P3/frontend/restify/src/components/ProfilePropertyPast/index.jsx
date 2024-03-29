import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const ProfilePropertyPast = (props) => {
	const { property, picture, state, guest } = props;
	let APIURL = "http://localhost:8000";
	const navigate = useNavigate();
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
				{state ? (
					<>
						<p className="card-text">
							Guest:{" "}
							<a href={`/accounts/profile/${guest}`}> {guest}</a>{" "}
						</p>
						<p className="card-text">State: {state}</p>
					</>
				) : null}
			</div>
		</div>
	);
};

export default ProfilePropertyPast;
