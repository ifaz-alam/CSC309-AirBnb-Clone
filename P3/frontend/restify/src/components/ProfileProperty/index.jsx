import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const ProfileProperty = (props) => {
	const { property, picture, state, owner } = props;
	let APIURL = "http://localhost:8000";
	let navigate = useNavigate();

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
							Owner:{" "}
							<a href={`/accounts/profile/${owner}`}> {owner}</a>{" "}
						</p>
						<p className="card-text">State: {state}</p>
					</>
				) : null}
			</div>
		</div>
	);
};

export default ProfileProperty;
