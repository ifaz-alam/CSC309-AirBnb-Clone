import React, { useEffect, useState } from "react";

// import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// import css
import "./style.css";

const Comment = (props) => {
	const { author, author_username, comment, parent, pk, rating, replies } =
		props;

	const [authorAccount, setAuthorAccount] = useState();
	let APIURL = "http://localhost:8000";

	useEffect(() => {
		fetch(`http://localhost:8000/accounts/user/?pk=${author}&all=false/`)
			.then((response) => response.json())
			.then((result) => {
				setAuthorAccount(result);
			});
	}, []);

	return (
		<>
			<div className="card comment container mb-3">
				<div className="card-header row">
					<div className="col-lg-1 d-flex justify-content-center">
						<img
							className="profile-pic"
							src={
								authorAccount
									? `${APIURL}${authorAccount.profile_picture.image}`
									: ""
							}
							alt="profile-pic"
						/>
					</div>
					<div className="col d-flex justify-content-center justify-content-lg-start align-items-center">
						<h6 className="card-title d-inline me-3">
							{author_username}
						</h6>
						<div className="">
							<span className="fa fa-star checked"></span>
							<span className="fa fa-star checked"></span>
							<span className="fa fa-star checked"></span>
							<span className="fa fa-star checked"></span>
							<span className="fa fa-star"></span>
						</div>
					</div>
				</div>
				<div className="card-body">
					<p>{comment}</p>
				</div>
			</div>
		</>
	);
};

export default Comment;
