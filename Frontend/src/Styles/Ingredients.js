import styled from "styled-components";

const StyledForm = styled.form`
	max-width: 400px;
	margin: 0 auto;
	padding: 20px;
	border: 1px solid #ccc;
	border-radius: 5px;
	background-color: #f9f9f9;
`;

const StyledIngredientContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
	position: relative;
`;

const StyledQuantityControl = styled.div`
	display: flex;
	align-items: center;
`;

const StyledQuantityButton = styled.button`
	background-color: #4caf50;
	color: #fff;
	padding: 5px 10px;
	border: none;
	border-radius: 50%;
	cursor: pointer;
	margin: 0 5px;
`;

const StyledHeading = styled.h2`
	font-size: 24px;
	margin-bottom: 10px;
`;

const StyledInput = styled.input`
	width: 100%;
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 5px;
`;

const StyledButton = styled.button`
	padding: 10px 15px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	margin-top: 10px;
`;

const StyledSubmitButton = styled(StyledButton)`
	background-color: #4caf50;
	color: #fff;
`;

const StyledRemoveButton = styled.button`
	background-color: #f44336;
	color: #fff;
	padding: 7px 13px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	position: absolute;
	margin-right: 3px;
	right: 0;
`;

export {
	StyledForm,
	StyledHeading,
	StyledInput,
	StyledButton,
	StyledSubmitButton,
	StyledRemoveButton,
	StyledIngredientContainer,
	StyledQuantityControl, // Export the new component
	StyledQuantityButton, // Export the new button component
};
