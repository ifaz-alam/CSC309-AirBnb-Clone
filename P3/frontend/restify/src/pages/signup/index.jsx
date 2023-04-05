import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import SignupWindow from "../../components/SignupWindow";

const SignupPage = () => {
	return (
		<>
			<body className="my-background d-flex justify-content-center flex-column">
				<SignupWindow />
			</body>
		</>
	);
};

export default SignupPage;
