import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { useSelector } from "react-redux";
import NotFound from "./Pages/NotFound";
import Favorites from "./Pages/Favorites";
import Account from "./Pages/Account";
import About from "./Pages/About";

function App() {
	const user = useSelector((state) => state.user);
	const userId = user._id;

	return (
		<Router>
			<Routes>
				<Route path="dashboard" element={<Home />} />
				<Route path="/" element={<Home />} />
				<Route path={`dashboard/${userId}`} element={<Home />} />
				<Route path={`dashboard/${userId}/myAccount`} element={<Account />} />
				<Route path={`dashboard/${userId}/favorites`} element={<Favorites />} />
				<Route path={`dashboard/${userId}/about`} element={<About />} />
				<Route path={`dashboard/about`} element={<About />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route element={<NotFound />} />
			</Routes>
		</Router>
	);
}

export default App;
