import styled from "styled-components";

const StyledNavbar = styled.nav`
	background-color: #333; /* Dark background color */
	color: #fff; /* Light text color */
	width: 100%; /* Full-width */
`;

const ContainerFluid = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 20px;
`;

const NavbarBrand = styled.a`
	font-size: 24px;
	text-decoration: none;
	color: #fff; /* Text color for the brand */
	margin-right: 20px; /* Adjust margin as needed */
`;

const NavbarToggler = styled.button`
	background-color: transparent;
	border: none;
	cursor: pointer;
`;

const NavbarCollapse = styled.div`
	display: flex;
`;

const NavList = styled.ul`
	display: flex;
	align-items: center;
`;

const NavItem = styled.li`
	display: flex;
	align-items: center;
	list-style: none;
	margin: 0 10px;
`;

const NavLink = styled.a`
	text-decoration: none;
	color: #fff; /* Default text color */
	/* Adjust margin as needed for spacing */
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
	NavbarBrand,
	NavbarToggler,
	NavbarCollapse,
	NavItem,
	NavLink,
	NavList,
	UserAvatar,
};
