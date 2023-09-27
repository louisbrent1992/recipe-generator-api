import { css } from "styled-components";

export const desktop = (props) => {
	return css`
		@media only screen and (min-width: 1023px) {
			${props}
		}
	`;
};

export const tablet = (props) => {
	return css`
		@media only screen and (max-width: 1022px) {
			${props}
		}
	`;
};

export const mobile = (props) => {
	return css`
		@media only screen and (max-width: 767px) {
			${props}
		}
	`;
};

export const smallMobile = (props) => {
	return css`
		@media only screen and (max-width: 426px) {
			${props}
		}
	`;
};
