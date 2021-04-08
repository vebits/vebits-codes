import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

import { Colors } from "utils/constants";

const Page = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 104px 64px;
`;

const Title = styled.h2`
  font-size: 3.5rem;
  color: #3c3c3c;
  margin-bottom: 24px;
`;

const StyledLink = css`
  text-decoration: none;
  color: ${Colors.palette.five};
  border-bottom: solid 1px ${Colors.palette.five};
  align-self: flex-start;
  padding-bottom: 4px;
  font-weight: 800;

  :hover {
    opacity: 0.7;
  }
`;

const StyledRRLink = styled(Link)`
  ${StyledLink}
`;

const Home = () => {
  return (
    <Page>
      <Title>
        <StyledRRLink to="/sabers">sabers</StyledRRLink>
      </Title>
      <Title>
        <StyledRRLink to="/bubba">bubba</StyledRRLink>
      </Title>
    </Page>
  );
};

export default Home;
