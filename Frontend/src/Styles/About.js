import styled from "styled-components";

const PageContainer = styled.div`
	margin: 0 auto;
	padding-bottom: 50px; /* Adjusted padding for better spacing */
	color: #f5f5f5; /* Changed text color for better readability */
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
	border: 3px solid #f5f5f5; /* Added border for better separation */
	margin-bottom: 30px; /* Increased margin bottom for better separation */
	margin-top: 100px; /* Increased margin top for better separation */
`;

const Title = styled.h1`
	font-size: 28px; /* Slightly increased font size for emphasis */
	margin-bottom: 20px; /* Increased margin bottom for better separation */
	color: #16a085; /* Changed text color for better visibility */
`;

const Header = styled.strong`
	color: #16a085; /* Changed text color for better visibility */
`;

const Paragraph = styled.p`
	font-size: 18px; /* Increased font size for better readability */
	line-height: 1.6; /* Adjusted line height for better spacing */
	margin-bottom: 20px; /* Increased margin bottom for better separation */
`;

const List = styled.div`
	font-size: 18px; /* Increased font size for better readability */
	margin-left: 20px;
`;

const ListItem = styled.div`
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
	Header,
};
