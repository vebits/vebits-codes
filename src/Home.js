import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

import { Colors } from "utils/constants";

const Page = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;

  align-items: center;
  padding: 104px 64px;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  color: ${Colors.palette.five};
  margin: 0;
  margin-bottom: 24px;
`;

const AboutSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 48px;
`;

const Info = styled.p`
  font-size: 1rem;
  margin: 0;
`;

const ProjectSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledLink = css`
  text-decoration: none;
  font-size: 2.5rem;
  margin-bottom: 12px;
  color: ${Colors.palette.five};
  border-bottom: solid 1px ${Colors.palette.five};
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
      <AboutSection>
        <Title>About.</Title>
        <Info>A collection of my generative art projects.</Info>
      </AboutSection>
      <ProjectSection>
        <Title>Projects.</Title>
        <StyledRRLink to="/sabers">sabers</StyledRRLink>
        <StyledRRLink to="/bubba">bubba</StyledRRLink>
      </ProjectSection>
    </Page>
  );
};

export default Home;
