import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import NotFound from "./Pages/NotFound";
import Favorites from "./Pages/Favorites";
import Account from "./Pages/Account";
import About from "./Pages/About";

function App() {
	return (
		<Router>
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route path="/dashboard" element={<Home />} />
				<Route path="/dashboard/:userId" element={<Home />} />
				<Route path="/dashboard/:userId/myAccount" element={<Account />} />
				<Route path="/dashboard/:userId/favorites" element={<Favorites />} />
				<Route path="/dashboard/:userId/about" element={<About />} />
				<Route path="/dashboard/about" element={<About />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
}

export default App;
