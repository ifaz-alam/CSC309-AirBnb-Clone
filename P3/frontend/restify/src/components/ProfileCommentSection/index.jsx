import React, { useEffect, useState } from "react";
import Comment from "../Comment";

const ProfileCommentSection = (props) => {
	const { ParentType, ParentID } = props;
	const [comments, setComments] = useState([]);
	const [avgRating, setAvgRating] = useState(0);

	useEffect(() => {
		// fetch comments
		let APIURL = "http://localhost:8000";
		async function fetchComments() {
			let request = await fetch(
				`${APIURL}/comments/?pk=0&parent_pk=${ParentID}&parent_type=${ParentType}&all=true`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `${localStorage.getItem(
							"Authorization"
						)}`,
					},
				}
			);

			let response = await request.json();
			console.log(response);
			setComments(response);
		}
		fetchComments();
	}, []);

	return (
		<>
			{Object.keys(comments).length > 0 ? (
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
									<div className="row">
										<div className="col-12">
											<h1 className="text-center">
												Comments
											</h1>
										</div>
									</div>
									<div className="row">
										<div className="col-12">
											<div className="card">
												<div className="card-body">
													<div className="row">
														<div className="col-12">
															{comments.map(
																(comment) => {
																	return (
																		<Comment
																			key={
																				comment.pk
																			}
																			{...comment}
																		/>
																	);
																}
															)}
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<h1 className="text-center">No Comments</h1>
			)}
		</>
	);
};

export default ProfileCommentSection;
