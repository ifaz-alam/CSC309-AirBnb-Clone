import React, { useEffect, useState } from "react";
import Comment from "../Comment";
import AddComment from "../AddComment";

const ProfileCommentSection = (props) => {
	const { ParentType, ParentID, updateRating } = props;
	const [comments, setComments] = useState([]);
	const [shownComments, setShownComments] = useState([]);
	const [avgRating, setAvgRating] = useState(0);
	const [totalRating, setTotalRating] = useState(0);
	const [addCommentToggled, setAddCommentToggled] = useState(false);
	const [commentErrorText, setCommentErrorText] = useState("");
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);

	const getComments = async () => {
		let APIURL = "http://localhost:8000";
		let request = await fetch(
			`${APIURL}/comments/?pk=0&parent_pk=${ParentID}&parent_type=${ParentType}&page=${page}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `${localStorage.getItem("Authorization")}`,
				},
			}
		);

		let response = await request.json();
		if (response.detail === "Invalid page.") {
			setHasMore(false);
			return;
		}

		console.log(response);
		setPage(page + 1);
		setShownComments([...shownComments, ...response]);
	};

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
		getComments();
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
			setShownComments([...shownComments, response]);
			setAddCommentToggled(false);
		}
		setTotalRating(totalRating + newComment.rating);
		setAvgRating(Math.round(totalRating / comments.length));
	};

	const toggleComment = () => {
		setAddCommentToggled(!addCommentToggled);
		setCommentErrorText("");
	};

	const deleteComment = async (commentID) => {
		// delete comment
		console.log(commentID);
		let APIURL = "http://localhost:8000";
		let request = await fetch(`${APIURL}/comments/`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${localStorage.getItem("Authorization")}`,
			},
			body: JSON.stringify({
				pk: commentID,
			}),
		});

		if (request.status !== 200) {
		} else {
			setComments(comments.filter((comment) => comment.pk !== commentID));
			setShownComments(
				shownComments.filter((comment) => comment.pk !== commentID)
			);
			//Iterate over each comment, and sum the rating
			let sum = 0;
			for (let i = 0; i < comments.length; i++) {
				sum += comments[i].rating;
			}
			setTotalRating(sum);
			setAvgRating(Math.round(sum / comments.length));
			updateRating(Math.round(sum / comments.length));
			updateRating(Math.round(sum / comments.length));
		}
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
															{shownComments.map(
																(comment) => {
																	return (
																		<Comment
																			key={
																				comment.pk
																			}
																			{...comment}
																			deleteComment={
																				deleteComment
																			}
																		/>
																	);
																}
															)}
															<div className="w-100 my-2">
																{hasMore ? (
																	<button
																		className="btn btn-primary w-100"
																		onClick={() =>
																			getComments()
																		}
																	>
																		Load
																		more
																		comments
																	</button>
																) : (
																	<h1 className="text-center">
																		No more
																		comments
																	</h1>
																)}
															</div>
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
				<div className="container d-flex flex-column justify-content-center">
					<div className="row w-100">
						<h1 className="text-center">No Comments</h1>
						<div className="col"></div>
					</div>
					<div className="row w-100">
						<div className="col">
							{addCommentToggled ? (
								<AddComment
									toggleComment={toggleComment}
									addComment={addComment}
									errorText={commentErrorText}
								/>
							) : (
								<button
									className="btn btn-primary w-100"
									onClick={() => toggleComment()}
								>
									Add a comment
								</button>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ProfileCommentSection;
