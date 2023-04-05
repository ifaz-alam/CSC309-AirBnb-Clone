import { BrowserRouter, Route, Routes } from "react-router-dom";
import { APIContext, useAPIContext } from "./contexts/APIContext";
import SignupWindow from "./components/SignupWindow";
import LoginWindow from "./components/LoginWindow";
import HomeTesting from "./components/HomeTesting";
import { useState } from "react";
import { UserContext, useUserConext } from "./contexts/UserContext";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";

function App() {
	return (
		<BrowserRouter>
			<UserContext.Provider value={useUserConext()}>
				<Routes>
					<Route path="/">
						<Route index element={<HomeTesting />} />
						<Route path="/accounts">
							<Route path="signup" element={<SignupPage />} />
							<Route path="login" element={<LoginPage />} />
						</Route>
					</Route>
				</Routes>
			</UserContext.Provider>
		</BrowserRouter>
	);
}

export default App;
