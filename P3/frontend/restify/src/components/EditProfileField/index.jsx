import React, { useState } from "react";
// import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
const EditProfileField = (props) => {
	const {
		profileAccount,
		setProfileAccount,
		type,
		field,
		setToggle,
		validator,
		errorMsg,
	} = props;
	const [fieldValue, setFieldValue] = useState(profileAccount[field]);
	const [valid, setValid] = useState(true);

	const handleChange = (e) => {
		if (validator(fieldValue)) {
			setValid(true);
			setProfileAccount({ ...profileAccount, [field]: fieldValue });
			setToggle(false);
		} else {
			setValid(false);
		}
	};

	return (
		<div className="my-1 d-flex flex-column">
			<div className="input-group">
				<input
					type={type}
					className="form-control"
					onChange={(e) => setFieldValue(e.target.value)}
					value={fieldValue}
				/>
				<button
					className="btn btn-outline-secondary"
					type="button"
					onClick={(e) => {
						handleChange(e);
					}}
				>
					Submit
				</button>
				<button
					className="btn btn-outline-secondary"
					type="button"
					onClick={() => {
						setToggle(false);
					}}
				>
					Cancel
				</button>
			</div>
			{valid ? <></> : <div className="text-danger">{errorMsg}</div>}
		</div>
	);
};

export default EditProfileField;
