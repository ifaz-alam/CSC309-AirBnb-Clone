import React, { useState } from "react";

const AddComment = (props) => {
	const { toggleComment, addComment, errorText } = props;

	const [comment, setComment] = useState("");
	const [rating, setRating] = useState(0);

	const handleSubmit = (e) => {
		// console.log(comment, rating);
		addComment({ comment: comment, rating: rating });
	};

	return (
		<div>
			<h1 className="text-center">Add Comment</h1>
			<input
				type="text"
				name="comment"
				id="comment"
				className="form-control"
				onChange={(e) => setComment(e.target.value)}
			/>
			<div className="row mt-2">
				<div className="col-12 col-md-2">Rating:</div>
				<div className="col-12 col-md-10">
					<div className="mx-1 d-inline">
						<input
							type="radio"
							name="rating"
							id="rating0"
							className="form-check-input"
							value={0}
							onChange={(e) => setRating(e.target.value)}
						/>
						<label htmlFor="rating0" className="mx-1">
							0
						</label>
					</div>
					<div className="mx-1 d-inline">
						<input
							type="radio"
							name="rating"
							id="rating1"
							className="form-check-input"
							value={1}
							onChange={(e) => setRating(e.target.value)}
						/>
						<label htmlFor="rating1" className="mx-1">
							1
						</label>
					</div>
					<div className="mx-1 d-inline">
						<input
							type="radio"
							name="rating"
							id="rating2"
							className="form-check-input"
							value={2}
							onChange={(e) => setRating(e.target.value)}
						/>
						<label htmlFor="rating2" className="mx-1">
							2
						</label>
					</div>
					<div className="mx-1 d-inline">
						<input
							type="radio"
							name="rating"
							id="rating3"
							className="form-check-input"
							value={3}
							onChange={(e) => setRating(e.target.value)}
						/>
						<label htmlFor="rating3" className="mx-1">
							3
						</label>
					</div>
					<div className="mx-1 d-inline">
						<input
							type="radio"
							name="rating"
							id="rating4"
							className="form-check-input"
							value={4}
							onChange={(e) => setRating(e.target.value)}
						/>
						<label htmlFor="rating4" className="mx-1">
							4
						</label>
					</div>
					<div className="mx-1 d-inline">
						<input
							type="radio"
							name="rating"
							id="rating5"
							className="form-check-input"
							value={5}
							onChange={(e) => setRating(e.target.value)}
						/>
						<label htmlFor="rating5" className="mx-1">
							5
						</label>
					</div>
				</div>
			</div>
			{errorText ? <div className="text-danger">{errorText}</div> : null}
			<div className="d-flex justify-content-evenly mt-3">
				<button
					onClick={() => toggleComment()}
					className="btn btn-danger w-25"
				>
					Cancel
				</button>
				<button
					onClick={() => handleSubmit()}
					className="btn btn-primary w-25"
				>
					Add Comment
				</button>
			</div>
		</div>
	);
};

export default AddComment;
