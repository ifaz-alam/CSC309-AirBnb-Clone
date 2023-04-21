import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import PropertyCreationWindow from "../../components/PropertyCreationWindow";

const CreatePropertyPage = () => {
	return (
		<>
			<body className="my-background d-flex justify-content-center flex-column">
				<PropertyCreationWindow />
			</body>
		</>
	);
};

export default CreatePropertyPage;