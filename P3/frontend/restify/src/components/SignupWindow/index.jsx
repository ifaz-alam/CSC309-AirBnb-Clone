import React, { useContext, useState } from "react";
import { useAPIContext } from "../../contexts/APIContext";
import {
	validateUsername,
	validateEmail,
	validateFirst,
	validateLast,
	validatePassword,
	validatePasswordConfirm,
	validatePhone,
} from "../../helpers/accountValidation";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const SignupWindow = () => {
	const { user, setUser } = useContext(UserContext); // Global authenticated user state
	const [newUser, setNewUser] = useState({
		username: "",
		email: "",
		phone: "",
		first: "",
		last: "",
		password: "",
		passwordConfirm: "",
	});
	const [valid, setValid] = useState({
		username: false,
		email: false,
		phone: false,
		first: false,
		last: false,
		password: false,
		passwordConfirm: false,
	});

	let navigate = useNavigate();

	const submitForm = async (e) => {
		e.preventDefault();
		if (validateAll()) {
			console.log("valid");

			let formatted_body = {
				username: newUser.username,
				email: newUser.email,
				phone_number: newUser.phone,
				first_name: newUser.first,
				last_name: newUser.last,
				password: newUser.password,
			};

			try {
				let APIURL = "http://localhost:8000";
				const response = await fetch(`${APIURL}/accounts/user/`, {
					method: "POST",

					headers: {
						"Content-Type": "application/json",
						Authorization: "",
					},
					body: JSON.stringify(formatted_body),
				});

				const data = await response.json();

				if (response.status !== 200) {
					throw new Error(data);
				}

				const response2 = await fetch(`${APIURL}/api/token/`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						username: newUser.username,
						password: newUser.password,
					}),
				});

				const data2 = await response2.json();

				setUser({ ...data, Authorization: data2.access });
				console.log(user);
				if (response2.ok) {
					localStorage.setItem(
						"Authorization",
						`Bearer ${data2.access}`
					);
					localStorage.setItem("username", data.username);
					localStorage.setItem("pk", data.pk);
				}

				navigate("/");
			} catch (error) {
				console.log("Error with requst");
			}
		} else {
			console.log("invalid");
		}
	};

	const validateAll = () => {
		if (
			validateUsername(newUser.username) &&
			validateEmail(newUser.email) &&
			validateFirst(newUser.first) &&
			validateLast(newUser.last) &&
			validatePassword(newUser.password) &&
			validatePasswordConfirm(newUser.passwordConfirm, newUser.password)
		) {
			return true;
		} else {
			return false;
		}
	};

	const updateUsername = (value) => {
		setNewUser({ ...newUser, username: value });
		setValid({
			...valid,
			username: validateUsername(value) ? true : false,
		});
	};

	const updateEmail = (value) => {
		setNewUser({ ...newUser, email: value });
		setValid({
			...valid,
			email: validateEmail(value) ? true : false,
		});
	};

	const updatePhone = (value) => {
		setNewUser({ ...newUser, phone: value });
		setValid({
			...valid,
			phone: validatePhone(value) ? true : false,
		});
	};

	const updateFirst = (value) => {
		setNewUser({ ...newUser, first: value });
		setValid({
			...valid,
			first: validateFirst(value) ? true : false,
		});
	};

	const updateLast = (value) => {
		setNewUser({ ...newUser, last: value });
		setValid({
			...valid,
			last: validateLast(value) ? true : false,
		});
	};

	const updatePassword = (value) => {
		setNewUser({ ...newUser, password: value });
		setValid({
			...valid,
			password: validatePassword(value) ? true : false,
		});
	};

	const updatePasswordConfirm = (value) => {
		setNewUser({ ...newUser, passwordConfirm: value });
		setValid({
			...valid,
			passwordConfirm: validatePasswordConfirm(value, newUser.password)
				? true
				: false,
		});
	};

	return (
		<>
			<div className="container d-flex flex-column justify-content-center h-100">
				<div className="row d-flex justify-content-center">
					<div className="card w-75 mb-3 mt-3 primary-card-color">
						<div className="card-body">
							<h2 className="card-title text-center mb-3">
								Create a{" "}
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
										for="email"
										className="form-label text-center w-100"
									>
										Email
									</label>
									<input
										type="email"
										className="form-control"
										id="email"
										name="user[email]"
										required
										autofocus
										onChange={(e) =>
											updateEmail(e.target.value)
										}
									/>
								</div>
								<div className="col-md-10 offset-md-1 mb-3 email-feedback d-flex justify-content-center">
									{valid.email === true ? (
										<div className="good-feedback">
											{" "}
											Looks Good{" "}
										</div>
									) : (
										<div className="bad-feedback">
											{" "}
											Please enter a valid email{" "}
										</div>
									)}
								</div>

								<div className="col-md-10 offset-md-1 mb-3">
									<label
										for="phone"
										className="form-label text-center w-100"
									>
										Phone Number
									</label>
									<input
										type="text"
										className="form-control"
										id="phone"
										name="user[phone]"
										required
										autofocus
										onChange={(e) =>
											updatePhone(e.target.value)
										}
									/>
								</div>
								<div className="col-md-10 offset-md-1 mb-3 email-feedback d-flex justify-content-center">
									{valid.phone === true ? (
										<div className="good-feedback">
											{" "}
											Looks Good{" "}
										</div>
									) : (
										<div className="bad-feedback">
											{" "}
											Please enter a valid email{" "}
										</div>
									)}
								</div>
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
											Please enter a valid email{" "}
										</div>
									)}
								</div>
								<div className="col-md-10 offset-md-1 mb-3">
									<label
										for="first"
										className="form-label text-center w-100"
									>
										First name
									</label>
									<input
										type="text"
										className="form-control"
										id="first"
										name="user[first]"
										maxlength="19"
										required
										onChange={(e) =>
											updateFirst(e.target.value)
										}
									/>
								</div>
								<div className="col-md-10 offset-md-1 mb-3 email-feedback d-flex justify-content-center">
									{valid.first === true ? (
										<div className="good-feedback">
											{" "}
											Looks Good{" "}
										</div>
									) : (
										<div className="bad-feedback">
											{" "}
											Please enter a valid email{" "}
										</div>
									)}
								</div>
								<div className="col-md-10 offset-md-1 mb-3">
									<label
										for="last"
										className="form-label text-center w-100"
									>
										Last name
									</label>
									<input
										type="text"
										className="form-control"
										id="last"
										name="user[last]"
										maxlength="19"
										required
										onChange={(e) =>
											updateLast(e.target.value)
										}
									/>
								</div>
								<div className="col-md-10 offset-md-1 mb-3 email-feedback d-flex justify-content-center">
									{valid.last === true ? (
										<div className="good-feedback">
											{" "}
											Looks Good{" "}
										</div>
									) : (
										<div className="bad-feedback">
											{" "}
											Please enter a valid email{" "}
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
											Please enter a valid email{" "}
										</div>
									)}
								</div>
								<div className="col-md-10 offset-md-1 mb-3">
									<label
										for="password-confirm"
										className="form-label text-center w-100"
									>
										Confirm Password
									</label>
									<input
										type="password"
										className="form-control"
										id="password-confirm"
										minlength="8"
										pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
										required
										onChange={(e) =>
											updatePasswordConfirm(
												e.target.value
											)
										}
									/>
								</div>
								<div className="col-md-10 offset-md-1 mb-3 email-feedback d-flex justify-content-center">
									{valid.passwordConfirm === true ? (
										<div className="good-feedback">
											{" "}
											Looks Good{" "}
										</div>
									) : (
										<div className="bad-feedback">
											{" "}
											Please enter a valid email{" "}
										</div>
									)}
								</div>
								<div className="col-10 offset-1 mt-4">
									<button
										className="btn w-100 submit-button button-color"
										onClick={(e) => {
											submitForm(e);
										}}
									>
										Create Account
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

export default SignupWindow;
