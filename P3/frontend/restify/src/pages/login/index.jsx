import React from "react";
import LoginWindow from "../../components/LoginWindow";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
const LoginPage = () => {
  return (
    <>
      <body className="my-background d-flex justify-content-center flex-column">
        <LoginWindow />
      </body>
    </>
  );
};

export default LoginPage;
