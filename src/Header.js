import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Colors } from "utils/constants";

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 1280px;
  width: 100%;
  padding: 48px 0px;
`;

const TitleLink = styled(Link)`
  font-size: 16px;
  margin: 0;
  font-weight: 400;
  color: ${Colors.palette.five};
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

const NavLinkContainer = styled.div`
  > *:not(:last-child) {
    margin-right: 12px;
  }
`;

const AboutLink = styled(Link)`
  font-size: 12px;
  margin: 0;
  font-weight: 400;
  color: ${Colors.palette.five};
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

const ExLink = styled.a`
  background-color: #e1dccb;
  padding: 6px 20px;
  border-radius: 6px;
  font-size: 12px;
  color: ${Colors.palette.five};
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <TitleLink to="/">VEBJØRN ISAKSEN</TitleLink>
      <NavLinkContainer>
        <AboutLink to="/about">ABOUT</AboutLink>
        <ExLink
          href="https://twitter.com/vebits"
          target="_blank"
          rel="noopener noreferrer"
        >
          TWITTER
        </ExLink>
        <ExLink
          href="https://instagram.com/vebits"
          target="_blank"
          rel="noopener noreferrer"
        >
          INSTAGRAM
        </ExLink>
      </NavLinkContainer>
    </HeaderContainer>
  );
}

export default Header;
