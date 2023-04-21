import { BrowserRouter, Route, Routes } from "react-router-dom";
import { APIContext, useAPIContext } from "./contexts/APIContext";
import SignupWindow from "./components/SignupWindow";
import LoginWindow from "./components/LoginWindow";
import Home from "./components/Home";
import { useState } from "react";
import { UserContext, useUserConext } from "./contexts/UserContext";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import ProfilePage from "./pages/profile";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import Debug from "./components/Debug";
import Gallery from "./pages/gallery";

function App() {
	return (
		<BrowserRouter>
			<link
				rel="stylesheet"
				href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
			/>

			<UserContext.Provider value={useUserConext()}>
				<NavigationBar />
				<Debug />
				<Routes>
					<Route path="/">
						<Route index element={<Home />} />
						<Route path="/accounts">
							<Route path="signup" element={<SignupPage />} />
							<Route path="login" element={<LoginPage />} />
							<Route
								path="profile/:profileUser"
								element={<ProfilePage />}
							/>
						</Route>
						<Route path="/properties">
							<Route path="gallery/:propertypk" element={<Gallery/>}/>
						</Route>
					</Route>
				</Routes>
				<Footer />
			</UserContext.Provider>
		</BrowserRouter>
	);
}

export default App;
