import React from "react";
import {
	ContainerFluid,
	NavItem,
	NavLink,
	NavList,
	NavbarBrand,
	NavbarCollapse,
	NavbarToggler,
	StyledNavbar,
	UserAvatar, // Import UserAvatar component
} from "../Styles/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../Redux/userSlice";
import { googleLogout } from "@react-oauth/google";

function Navbar() {
	const user = useSelector((state) => state.user);

	const dispatch = useDispatch();

	const handleLogout = () => {
		googleLogout();
		dispatch(clearUser());
		window.location.href = "/";
	};

	return (
		<StyledNavbar>
			<ContainerFluid>
				<NavbarBrand href={user ? `/dashboard/${user._id}` : `/dashboard`}>
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
							{/* UserAvatar component with user's avatar */}
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
							>
								Favorites
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="#">About</NavLink>
						</NavItem>
						<NavItem>
							{user._id ? (
								<NavLink href="#" onClick={handleLogout}>
									Logout
								</NavLink>
							) : (
								<NavLink href="/login">Login</NavLink>
							)}
						</NavItem>
						<NavItem>
							{!user._id && <NavLink href="/register">Register</NavLink>}
						</NavItem>
					</NavList>
				</NavbarCollapse>
			</ContainerFluid>
		</StyledNavbar>
	);
}

export default Navbar;
