import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
	position: fixed;
	bottom: 0;
	width: 100%;
	background-color: #333;
	color: #fff;
	text-align: center;
	padding: 10px 0;

	transition: opacity 0.5s ease;
	opacity: ${(props) => (props.$isVisible ? 1 : 0)};

	@keyframes fadeInUp {
		from {
			transform: translateY(10%);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
`;

const FooterLink = styled.a`
	text-decoration: none;
	color: #fff;
	font-weight: bold;
`;

function Footer() {
	const [isFooterVisible, setFooterVisible] = useState(false);

	const handleScroll = () => {
		const scrollPosition = window.scrollY;
		const windowHeight = window.innerHeight;
		const bodyHeight = document.body.scrollHeight;

		// Check if you've scrolled to the bottom of the page
		if (scrollPosition + windowHeight >= bodyHeight) {
			setFooterVisible(true);
		} else {
			setFooterVisible(false);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<StyledFooter $isVisible={isFooterVisible}>
			<div className="container-fluid">
				<div className="row">
					<div className="col-12 text-center py-3">
						<p className="m-0">
							© 2023 <FooterLink href="#">Recipe Finder</FooterLink> - All
							Rights Reserved
						</p>
					</div>
				</div>
			</div>
		</StyledFooter>
	);
}

export default Footer;
