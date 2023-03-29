import React, { useState } from "react";
import { useAPIContext } from "../../contexts/APIContext";
import {
	validateUsername,
	validateEmail,
	validateFirst,
	validateLast,
	validatePassword,
	validatePasswordConfirm,
} from "../../helpers/accountValidation";

const SignupWindow = () => {
	const { user, setUser } = useAPIContext(); // Global authenticated user state
	const [newUser, setNewUser] = useState({
		username: "",
		email: "",
		first: "",
		last: "",
		password: "",
		passwordConfirm: "",
	});
	const [valid, setValid] = useState({
		username: false,
		email: false,
		first: false,
		last: false,
		password: false,
		passwordConfirm: false,
	});

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
			<h1>Username: {newUser.username}</h1>
			<h1>Email: {newUser.email}</h1>
			<h1>First: {newUser.first}</h1>
			<h1>Last: {newUser.last}</h1>
			<h1>Password: {newUser.password}</h1>
			<h1>Password Confirm: {newUser.passwordConfirm}</h1>
			<h1>Email valid {valid.email ? "true" : "false"}</h1>
			<h1>username valid {valid.username ? "true" : "false"}</h1>

			<div class="container d-flex flex-column justify-content-center h-100">
				<div class="row d-flex justify-content-center">
					<div class="card w-75 mb-3 mt-3 primary-card-color">
						<div class="card-body">
							<h2 class="card-title text-center mb-3">
								Create a{" "}
								<span class="primary-bold-color">Restify</span>{" "}
								account!
							</h2>
							<form
								class="row needs-validation"
								action="/register"
								method="POST"
								novalidate
							>
								<div class="col-md-10 offset-md-1 mb-3">
									<label
										for="email"
										class="form-label text-center w-100"
									>
										Email
									</label>
									<input
										type="email"
										class="form-control"
										id="email"
										name="user[email]"
										required
										autofocus
										onChange={(e) =>
											updateEmail(e.target.value)
										}
									/>
									<div class="valid-feedback">
										Looks good!
									</div>
									<div class="invalid-feedback">
										Please enter a valid email.
									</div>
								</div>
								<div class="col-md-10 offset-md-1 mb-3">
									<label
										for="username"
										class="form-label text-center w-100"
									>
										Username
									</label>
									<input
										type="text"
										class="form-control"
										id="username"
										name="user[username]"
										maxlength="19"
										required
										onChange={(e) =>
											updateUsername(e.target.value)
										}
									/>
									<div class="valid-feedback">
										Looks good!
									</div>
									<div class="invalid-feedback">
										Please enter a username.
									</div>
								</div>
								<div class="col-md-10 offset-md-1 mb-3">
									<label
										for="first"
										class="form-label text-center w-100"
									>
										First name
									</label>
									<input
										type="text"
										class="form-control"
										id="first"
										name="user[first]"
										maxlength="19"
										required
										onChange={(e) =>
											updateFirst(e.target.value)
										}
									/>
									<div class="valid-feedback">
										Looks good!
									</div>
									<div class="invalid-feedback">
										Please enter a first name.
									</div>
								</div>
								<div class="col-md-10 offset-md-1 mb-3">
									<label
										for="last"
										class="form-label text-center w-100"
									>
										Last name
									</label>
									<input
										type="text"
										class="form-control"
										id="last"
										name="user[last]"
										maxlength="19"
										required
										onChange={(e) =>
											updateLast(e.target.value)
										}
									/>
									<div class="valid-feedback">
										Looks good!
									</div>
									<div class="invalid-feedback">
										Please enter a last name.
									</div>
								</div>
								<div class="col-md-10 offset-md-1 mb-3">
									<label
										for="password"
										class="form-label text-center w-100"
									>
										Password
									</label>
									<input
										type="password"
										class="form-control"
										id="password"
										name="user[password]"
										minlength="8"
										pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
										required
										onChange={(e) =>
											updatePassword(e.target.value)
										}
									/>
									<div class="valid-feedback">
										Looks good!
									</div>
									<div class="invalid-feedback">
										Please enter a password. Password
										requires atleast 8 characters, one
										uppercase, one lowercase, one special
										character and a number.
									</div>
								</div>
								<div class="col-md-10 offset-md-1 mb-3">
									<label
										for="password-confirm"
										class="form-label text-center w-100"
									>
										Confirm Password
									</label>
									<input
										type="password"
										class="form-control"
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
								<div class="col-10 offset-1 mt-4">
									<button
										class="btn w-100 submit-button button-color"
										type="submit"
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
