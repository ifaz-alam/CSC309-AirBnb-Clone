import React from "react";
import { useAPIContext } from "../../contexts/APIContext";
import { useContext, useState } from "react";
import {
	validatePassword,
	validateUsername,
} from "../../helpers/accountValidation";
import "bootstrap/dist/css/bootstrap.min.css";

import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const LoginWindow = () => {
	const { user, setUser } = useContext(UserContext);

	const [newUser, setNewUser] = useState({
		username: "",
		password: "",
	});
	const [valid, setValid] = useState({
		username: false,
		password: false,
	});

	const [error, setError] = useState("");

	const updateUsername = (value) => {
		setNewUser({ ...newUser, username: value });
		setValid({
			...valid,
			username: validateUsername(value) ? true : false,
		});
	};

	const updatePassword = (value) => {
		setNewUser({ ...newUser, password: value });
		setValid({
			...valid,
			password: validatePassword(value) ? true : false,
		});
	};

	let navigate = useNavigate();

	const validateAll = () => {
		if (
			validateUsername(newUser.username) &&
			validatePassword(newUser.password)
		) {
			return true;
		} else {
			return false;
		}
	};

	const submitForm = async (e) => {
		e.preventDefault();
		if (validateAll()) {
			console.log("valid");

			let formatted_body = {
				username: newUser.username,
				password: newUser.password,
			};
			if (localStorage.getItem("pk")) {
				localStorage.setItem("pk", "");
			}
			if (localStorage.getItem("Authorization")) {
				localStorage.setItem("Authorization", "");
			}

			try {
				let APIURL = "http://localhost:8000";

				const login_fetch = await fetch(`${APIURL}/api/token/`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: "",
					},
					body: JSON.stringify(formatted_body),
				});

				const data2 = await login_fetch.json();

				if (login_fetch.status !== 200) {
					setError(data2.detail);
					throw new Error("Error");
				}

				const get_accounts = await fetch(
					`${APIURL}/accounts/user/get/`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							pk: "0",
							all: "true",
						}),
					}
				);

				const accounts = await get_accounts.json();

				// Iterate through accounts and get the account with the matching username
				let account = null;
				for (let i = 0; i < accounts.length; i++) {
					if (accounts[i].username === newUser.username) {
						account = accounts[i];
					}
				}

				console.log(account);

				console.log(data2);

				setUser({ ...account, Authorization: data2.access });

				if (login_fetch.ok) {
					localStorage.setItem(
						"Authorization",
						`Bearer ${data2.access}`
					);
					localStorage.setItem("username", account.username);
					localStorage.setItem("pk", account.pk);
				}

				navigate("/");
			} catch (error) {
				console.log("Error with requst");
			}
		} else {
			console.log("invalid");
		}
	};

	return (
		<>
			<div className="container d-flex flex-column justify-content-center h-100">
				<div className="row d-flex justify-content-center">
					<div className="card w-75 mb-3 mt-3 primary-card-color">
						<div className="card-body">
							<h2 className="card-title text-center mb-3">
								Sign into a{" "}
								<span className="primary-bold-color">
									Restify
								</span>{" "}
								account!
							</h2>
							<form
								className="row needs-validation"
								action="/register"
								method="POST"
								novalidate
							>
								<div className="col-md-10 offset-md-1 mb-3">
									<label
										for="username"
										className="form-label text-center w-100"
									>
										Username
									</label>
									<input
										type="text"
										className="form-control"
										id="username"
										name="user[username]"
										maxlength="19"
										required
										onChange={(e) =>
											updateUsername(e.target.value)
										}
									/>
								</div>
								<div className="col-md-10 offset-md-1 mb-3 email-feedback d-flex justify-content-center">
									{valid.username === true ? (
										<div className="good-feedback">
											{" "}
											Looks Good{" "}
										</div>
									) : (
										<div className="bad-feedback">
											{" "}
											Please enter a valid username{" "}
										</div>
									)}
								</div>
								<div className="col-md-10 offset-md-1 mb-3">
									<label
										for="password"
										className="form-label text-center w-100"
									>
										Password
									</label>
									<input
										type="password"
										className="form-control"
										id="password"
										name="user[password]"
										minlength="8"
										pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
										required
										onChange={(e) =>
											updatePassword(e.target.value)
										}
									/>
								</div>
								<div className="col-md-10 offset-md-1 mb-3 email-feedback d-flex justify-content-center">
									{valid.password === true ? (
										<div className="good-feedback">
											{" "}
											Looks Good{" "}
										</div>
									) : (
										<div className="bad-feedback">
											{" "}
											Please enter a valid password{" "}
										</div>
									)}
								</div>
								{error === "" ? (
									<></>
								) : (
									<div className="col-md-10 offset-md-1 mb-3 email-feedback d-flex justify-content-center">
										<div className="bad-feedback">
											{error}
										</div>
									</div>
								)}

								<div className="col-10 offset-1 mt-4">
									<button
										className="btn w-100 submit-button button-color"
										onClick={(e) => {
											submitForm(e);
										}}
									>
										Login
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginWindow;
