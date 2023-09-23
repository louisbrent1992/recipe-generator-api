import styled from "styled-components";

const PageContainer = styled.div`
	margin: 0 auto;
	padding-bottom: 100px;
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
	border-radius: 5px;
	margin-bottom: 20px;
`;

const Title = styled.h1`
	font-size: 24px;
	margin-bottom: 10px;
`;

const Paragraph = styled.p`
	font-size: 16px;
	margin-bottom: 10px;
`;

const List = styled.ul`
	font-size: 16px;
	margin-left: 20px;
`;

const ListItem = styled.li`
	margin-bottom: 10px;
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
