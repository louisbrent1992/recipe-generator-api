import React from "react";

const toggleNavbar = (isOpen, setIsOpen) => {
	setIsOpen(!isOpen);
};

export const Menu = ({ isOpen, setIsOpen }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1}
		height={40}
		stroke="#f5f5f5"
		className="w-6 h-6"
		onClick={() => toggleNavbar(isOpen, setIsOpen)}
		style={{
			position: "absolute",
			top: "0",
			right: "0",
			padding: "10px 10px 0 0",
		}}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
		/>
	</svg>
);

export const Close = ({ isOpen, setIsOpen }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		height={40}
		strokeWidth={1}
		stroke="#f5f5f5"
		className="w-6 h-6"
		onClick={() => toggleNavbar(isOpen, setIsOpen)}
		style={{
			position: "absolute",
			top: "0",
			right: "0",
			padding: "10px 10px 0 0",
		}}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M6 18L18 6M6 6l12 12"
		/>
	</svg>
);
