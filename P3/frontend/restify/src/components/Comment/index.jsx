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

	const getStars = (rating) => {
		if (rating === 0) {
			return (
				<>
					<span className="fa fa-star"></span>{" "}
					<span className="fa fa-star"></span>{" "}
					<span className="fa fa-star"></span>{" "}
					<span className="fa fa-star"></span>{" "}
					<span className="fa fa-star"></span>
				</>
			);
		} else if (rating === 1) {
			return (
				<>
					<span className="fa fa-star checked"></span>{" "}
					<span className="fa fa-star"></span>{" "}
					<span className="fa fa-star"></span>{" "}
					<span className="fa fa-star"></span>{" "}
					<span className="fa fa-star"></span>
				</>
			);
		} else if (rating === 2) {
			return (
				<>
					<span className="fa fa-star checked"></span>{" "}
					<span className="fa fa-star checked"></span>{" "}
					<span className="fa fa-star"></span>{" "}
					<span className="fa fa-star"></span>{" "}
					<span className="fa fa-star"></span>
				</>
			);
		} else if (rating === 3) {
			return (
				<>
					<span className="fa fa-star checked"></span>{" "}
					<span className="fa fa-star checked"></span>{" "}
					<span className="fa fa-star checked"></span>{" "}
					<span className="fa fa-star"></span>{" "}
					<span className="fa fa-star"></span>
				</>
			);
		} else if (rating === 4) {
			return (
				<>
					<span className="fa fa-star checked"></span>{" "}
					<span className="fa fa-star checked"></span>{" "}
					<span className="fa fa-star checked"></span>{" "}
					<span className="fa fa-star checked"></span>{" "}
					<span className="fa fa-star"></span>
				</>
			);
		} else if (rating === 5) {
			return (
				<>
					<span className="fa fa-star checked"></span>{" "}
					<span className="fa fa-star checked"></span>{" "}
					<span className="fa fa-star checked"></span>{" "}
					<span className="fa fa-star checked"></span>{" "}
					<span className="fa fa-star checked"></span>
				</>
			);
		}
	};

	return (
		<>
			<div className="card comment container mb-3">
				<div className="card-header row">
					<div className="col-lg-1 d-flex justify-content-center">
						<img
							className="profile-pic"
							src={
								authorAccount?.profile_picture
									? `${APIURL}${authorAccount.profile_picture.image}`
									: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pphfoundation.ca%2Fwp-content%2Fuploads%2F2018%2F05%2Fdefault-avatar.png&f=1&nofb=1&ipt=585d0ba94f18f55d1a9f4950f1a2a870987a0a5692553104b6c33600b7a884e6&ipo=images"
							}
							alt="profile-pic"
						/>
					</div>
					<div className="col d-flex justify-content-center justify-content-lg-start align-items-center">
						<h6 className="card-title d-inline me-3">
							{author_username}
						</h6>
						<div className="">{getStars(rating)}</div>
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
