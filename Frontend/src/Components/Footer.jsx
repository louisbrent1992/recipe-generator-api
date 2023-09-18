import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
	position: fixed;
	bottom: 0;
	width: 100%;
	background-color: #333;
	color: #fff;
	text-align: center;
	padding: 10px 0;
`;

const FooterLink = styled.a`
	text-decoration: none;
	color: #fff;
	font-weight: bold;
`;

function Footer() {
	return (
		<StyledFooter>
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
