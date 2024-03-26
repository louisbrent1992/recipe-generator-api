import styled from "styled-components";

const PageContainer = styled.div`
	margin: 0 auto;
	padding-bottom: 50px; /* Adjusted padding for better spacing */
`;

const BodyContainer = styled.div`
	max-width: 800px;
	margin: 0 auto;
	padding: 20px;
`;

const HeaderImage = styled.img`
	width: 100%;
	max-height: 300px;
	object-fit: cover;
	border-radius: 10px; /* Increased border radius for a softer look */
	margin-bottom: 30px; /* Increased margin bottom for better separation */
`;

const Title = styled.h1`
	font-size: 28px; /* Slightly increased font size for emphasis */
	margin-bottom: 20px; /* Increased margin bottom for better separation */
`;

const Paragraph = styled.p`
	font-size: 18px; /* Increased font size for better readability */
	line-height: 1.6; /* Adjusted line height for better spacing */
	margin-bottom: 20px; /* Increased margin bottom for better separation */
`;

const List = styled.ul`
	font-size: 18px; /* Increased font size for better readability */
	margin-left: 20px;
`;

const ListItem = styled.li`
	margin-bottom: 15px; /* Increased margin bottom for better separation */
`;

export {
	PageContainer,
	BodyContainer,
	HeaderImage,
	Title,
	Paragraph,
	List,
	ListItem,
};
