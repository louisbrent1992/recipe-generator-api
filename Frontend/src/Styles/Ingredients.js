import styled from "styled-components";
import { smallMobile } from "../Utilities/mobileResponse";

const FormContainer = styled.div`
	max-width: 400px;
	margin: 0 auto;
	margin-top: 100px;
`;

const StyledForm = styled.form`
	width: 100%;
	margin: 0 auto;
	padding: 20px;
	border: 1px solid #ccc;
	border-radius: 5px;
	background-color: #f9f9f9;
	${smallMobile({
		maxWidth: "90%",
	})}
`;

const StyledIngredientContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
	position: relative;
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

const StyledAddInput = styled(StyledInput)`
	margin-top: 10px;
`;

const ButtonsContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const StyledButton = styled.button`
	border: none;
	padding: 10px 20px;
	width: 130px;
	border-radius: 5px;
	cursor: pointer;
	margin-top: 10px;
	background-color: #ccc;
	text-align: center;
`;

const StyledSubmitButton = styled(StyledButton)`
	background-color: #4caf50;
	color: #fff;
`;

const StyledRemoveButton = styled(StyledButton)`
	background-color: #f44336;
	color: #fff;
	padding: 7px 13px;
	width: 100px;
	position: absolute;
	margin-right: 3px;
	margin-top: 0;
	right: 0;
`;

const StyledAddButton = styled(StyledButton)`
	background-color: #ccc;
	padding: 7px 13px;
	width: 100px;
	position: absolute;
	right: 0;
	margin-right: 3px;
`;

export {
	StyledForm,
	StyledHeading,
	StyledInput,
	StyledAddInput,
	ButtonsContainer,
	StyledButton,
	StyledAddButton,
	StyledSubmitButton,
	StyledRemoveButton,
	StyledIngredientContainer,
	FormContainer,
};
