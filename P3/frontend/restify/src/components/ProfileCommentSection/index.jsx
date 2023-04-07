import React, { useEffect, useState } from "react";
import Comment from "../Comment";
import AddComment from "../AddComment";

const ProfileCommentSection = (props) => {
	const { ParentType, ParentID, updateRating } = props;
	const [comments, setComments] = useState([]);
	const [avgRating, setAvgRating] = useState(0);
	const [totalRating, setTotalRating] = useState(0);
	const [addCommentToggled, setAddCommentToggled] = useState(false);
	const [commentErrorText, setCommentErrorText] = useState("");

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

			//Iterate over each comment, and sum the rating
			let sum = 0;
			for (let i = 0; i < response.length; i++) {
				sum += response[i].rating;
			}
			setTotalRating(sum);
			setAvgRating(Math.round(sum / response.length));
			updateRating(Math.round(sum / response.length));
			console.log(sum / response.length);
			setComments(response);
		}
		fetchComments();
	}, []);

	const addComment = async (newComment) => {
		// add comment
		// setComments([...comments, newComment]);
		// console.log(newComment);

		let APIURL = "http://localhost:8000";
		let request = await fetch(`${APIURL}/comments/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${localStorage.getItem("Authorization")}`,
			},
			body: JSON.stringify({
				comment: newComment.comment,
				rating: newComment.rating,
				content_obj_pk: ParentID,
				content_obj_type: ParentType,
			}),
		});

		let response = await request.json();
		if (request.status !== 200) {
			setCommentErrorText(response.error);
		} else {
			setComments([...comments, response]);
			setAddCommentToggled(false);
		}
		setTotalRating(totalRating + newComment.rating);
		setAvgRating(Math.round(totalRating / comments.length));
	};

	const toggleComment = () => {
		setAddCommentToggled(!addCommentToggled);
		setCommentErrorText("");
	};

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
															<div className="w-100">
																{addCommentToggled ? (
																	<AddComment
																		toggleComment={
																			toggleComment
																		}
																		addComment={
																			addComment
																		}
																		errorText={
																			commentErrorText
																		}
																	/>
																) : (
																	<button
																		className="btn btn-primary w-100"
																		onClick={() =>
																			toggleComment()
																		}
																	>
																		Add a
																		comment
																	</button>
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
				</div>
			) : (
				<h1 className="text-center">No Comments</h1>
			)}
		</>
	);
};

export default ProfileCommentSection;
