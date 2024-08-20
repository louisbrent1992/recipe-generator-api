import React from "react";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const PageContainer = styled.div`
	background-color: #f5f5f5;
	min-height: 100vh;
`;

// Styled components for the 404 page
const NotFoundContainer = styled.div`
	text-align: center;
	margin-top: 100px;
`;

const NotFoundHeader = styled.h1`
	font-size: 64px;
	color: #ff6347; /* Red color */
	margin-bottom: 10px;
`;

const NotFoundTitle = styled.h2`
	font-size: 36px;
	margin-bottom: 20px;
`;

const NotFoundMessage = styled.p`
	font-size: 18px;
`;

const HomeButton = styled.button`
	background-color: #ff6347; /* Red color */

	padding: 10px 20px;

	border-radius: 5px;
	margin-top: 20px;
`;

const HomeLink = styled.a`
	color: #f5f5f5;
	text-decoration: none;
	font-size: 18px;
`;

function NotFound() {
	return (
		<PageContainer>
			<Navbar />
			<NotFoundContainer>
				<NotFoundHeader>404</NotFoundHeader>
				<NotFoundTitle>Page Not Found</NotFoundTitle>
				<NotFoundMessage>
					Sorry, but the page you are looking for does not exist.
				</NotFoundMessage>
				<HomeButton>
					<HomeLink href="/">Go Back Home</HomeLink>
				</HomeButton>
			</NotFoundContainer>
			<Footer />
		</PageContainer>
	);
}

export default NotFound;
