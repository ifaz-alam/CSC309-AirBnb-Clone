import { BrowserRouter, Route, Routes } from "react-router-dom";
import { APIContext, useAPIContext } from "./contexts/APIContext";
import SignupWindow from "./components/SignupWindow";
import HomeTesting from "./components/HomeTesting";
import { useState } from "react";
import { UserContext, useUserConext } from "./contexts/UserContext";

function App() {
	return (
		<BrowserRouter>
			<UserContext.Provider value={useUserConext()}>
				<Routes>
					<Route path="/">
						<Route index element={<HomeTesting />} />
						<Route path="signup" element={<SignupWindow />} />
					</Route>
				</Routes>
			</UserContext.Provider>
		</BrowserRouter>
	);
}

export default App;
