import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import {
	ContainerFluid,
	NavItem,
	NavLink,
	NavList,
	NavbarBrand,
	NavbarCollapse,
	NavbarToggler,
	StyledNavbar,
	UserAvatar,
} from "../Styles/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../Redux/userSlice";
import { googleLogout } from "@react-oauth/google";

function Navbar() {
	const user = useSelector((state) => state.user);
	const location = useLocation(); // Get the current location

	const dispatch = useDispatch();

	const handleLogout = () => {
		googleLogout();
		dispatch(clearUser());
		window.location.href = "/";
	};

	return (
		<StyledNavbar>
			<ContainerFluid>
				<NavbarBrand href={user ? `/dashboard/${user._id}` : "/dashboard"}>
					Recipe Finder
				</NavbarBrand>
				<NavbarToggler
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</NavbarToggler>
				<NavbarCollapse id="navbarNav">
					<NavList className="navbar-nav">
						<NavItem>
							<UserAvatar
								src={
									user.avatar
										? user.avatar
										: "https://res.cloudinary.com/client-images/image/upload/v1694458634/profile_pic_placeholder_nh4oxn.jpg"
								}
								alt="User Avatar"
								href={
									user._id != null ? `/dashboard/${user._id}/myAccount` : "#"
								}
							/>
							<em>
								<NavLink
									style={{ fontWeight: "bold", textTransform: "uppercase" }}
									href={
										user._id != null ? `/dashboard/${user._id}/myAccount` : "#"
									}
									$isactive={(
										location.pathname === `/dashboard/${user._id}/myAccount`
									).toString()}
								>
									{user.name ? user.name : "guest"}
								</NavLink>
							</em>
						</NavItem>
						<NavItem
							style={{
								display: user.savedRecipes ? "block" : "none",
							}}
						>
							<NavLink
								href={
									user._id != null ? `/dashboard/${user._id}/favorites` : "#"
								}
								$isactive={(
									location.pathname === `/dashboard/${user._id}/favorites`
								).toString()}
							>
								Favorites
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink
								href={
									user._id ? `/dashboard/${user._id}/about` : "/dashboard/about"
								}
								$isactive={(
									location.pathname === `/dashboard/${user._id}/about` ||
									"/dashboard/about"
								).toString()}
							>
								About
							</NavLink>
						</NavItem>
						<NavItem>
							{user._id ? (
								<NavLink href="#" onClick={handleLogout}>
									Logout
								</NavLink>
							) : (
								<NavLink
									href="/login"
									$isactive={(location.pathname === "/login").toString()}
								>
									Login
								</NavLink>
							)}
						</NavItem>
						<NavItem>
							{!user._id && (
								<NavLink
									href="/register"
									$isactive={(location.pathname === "/register").toString()}
								>
									Register
								</NavLink>
							)}
						</NavItem>
					</NavList>
				</NavbarCollapse>
			</ContainerFluid>
		</StyledNavbar>
	);
}

export default Navbar;
