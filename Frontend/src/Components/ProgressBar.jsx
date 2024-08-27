import React from "react";
import styled from "styled-components";

const ProgressBarContainer = styled.div`
	width: 100%;
	background-color: #f3f3f3;
	border-radius: 8px;
	margin: 20px 0;
	overflow: hidden;
	box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
`;

const ProgressBarFill = styled.div`
	display: flex;
	justify-content: center;
	height: 20px;
	background-color: #4caf50;
	width: ${(props) => props.width}%;
	transition: width 0.8s ease;
`;

const ProgressBarMessage = styled.span`
	color: #000;
	font-weight: bold;
	text-align: center;
	paddingleft: 20px;
`;

function ProgressBar({ progress, update }) {
	return (
		<ProgressBarContainer>
			<ProgressBarFill width={progress || 30}>
				<ProgressBarMessage>{update}</ProgressBarMessage>
			</ProgressBarFill>
		</ProgressBarContainer>
	);
}

export default ProgressBar;
