import React from "react";
import styled from "styled-components";

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

function NotFound() {
	return (
		<NotFoundContainer>
			<NotFoundHeader>404</NotFoundHeader>
			<NotFoundTitle>Page Not Found</NotFoundTitle>
			<NotFoundMessage>
				Sorry, but the page you are looking for does not exist.
			</NotFoundMessage>
		</NotFoundContainer>
	);
}

export default NotFound;
