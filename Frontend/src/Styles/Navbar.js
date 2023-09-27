import styled from "styled-components";
import { desktop, tablet } from "../Utilities/mobileResponse";

const StyledNavbar = styled.nav`
	background-color: #333; /* Dark background color */
	color: #fff; /* Light text color */
	width: 100%; /* Full-width */
`;

const ContainerFluid = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
`;

const NavbarContainer = styled.div`
	${tablet({
		display: "none",
	})}
`;

const NavbarBrand = styled.a`
	font-size: 24px;
	text-decoration: none;
	color: #fff; /* Text color for the brand */
	margin-right: 20px; /* Adjust margin as needed */
`;

const NavMenuContainer = styled.div`
	display: flex;
	background: hsl(0, 0%, 100% / 0.1);
	backdrop-filter: blur(0.3rem);
	flex-direction: column;
	position: absolute;
	width: 200px;
	height: 35vh;
	top: 0;
	right: 0;
	z-index: 1;
	align-items: center;
	justify-content: center;
	${desktop({
		display: "none",
	})}
`;

const IconContainer = styled.div`
	${desktop({
		display: "none",
	})}
`;

const NavList = styled.ul`
	display: flex;
	align-items: center;
	text-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
	${tablet({
		flexDirection: "column",
		alignItems: "flex-end",
	})}
`;

const NavItem = styled.li`
	display: flex;
	align-items: center;
	list-style: none;
	margin: 0 10px;
`;

const NavLink = styled.a`
	text-decoration: none;

	color: ${(props) => (props.isactive ? "#ffcc00" : "white")};

	${tablet({
		color: "#333",
	})}

	transition: color 0.3s ease; /* Smooth color transition on hover */

	&:hover {
		color: #ffcc00; /* Change text color on hover (e.g., yellow) */
	}
`;

const UserAvatar = styled.img`
	/* UserAvatar styles */
	width: 40px; /* Set a fixed width for circular shape */
	height: 40px; /* Set a fixed height for circular shape */
	border-radius: 50%; /* Create a circular shape */
	border: 2px solid #fff; /* Add a white border */
	margin-right: 10px; /* Adjust margin as needed */
	object-fit: cover; /* Scale the image to cover the entire shape */
	cursor: pointer;
`;

export {
	StyledNavbar,
	ContainerFluid,
	NavbarContainer,
	NavbarBrand,
	NavMenuContainer,
	NavItem,
	NavLink,
	NavList,
	UserAvatar,
	IconContainer,
};
