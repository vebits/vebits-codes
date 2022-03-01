import Footer from "Footer";

import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

import cord1 from "assets/images/cord01-min.png";
import cord2 from "assets/images/cord02-min.png";
import cord3 from "assets/images/cord03-min.png";
import cord4 from "assets/images/cord04-min.png";

import pillars1 from "assets/images/PILLARSI-min.png";
import pillars2 from "assets/images/PILLARSII-min.png";
import pillars3 from "assets/images/PILLARSIII-min.png";

import { Colors } from "utils/constants";

const Page = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px 0px 48px 0px;

  max-width: 1280px;
  width: 100%;
`;

const H1 = styled.h1`
  font-size: 24px;
  margin: 0;
  font-weight: 400;
`;

const PGTitle = styled.h1`
  font-size: 24px;
  margin: 0;
  margin-top: 48px;
  font-weight: 400;
`;

const PGSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

const PGDescription = styled.p`
  font-size: 16px;
  margin: 0;
  font-weight: 400;
  max-width: 600px;
  margin-bottom: 24px;
`;

const PGWorks = styled.div`
  display: flex;

  > *:not(:last-child) {
    margin-right: 12px;
  }
`;

const H2 = styled.h1`
  font-size: 16px;
  margin: 0;
  font-weight: 600;
`;

const WorksSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const WorkSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`;

const WorkDescription = styled.p`
  font-size: 16px;
  margin: 0;
  font-weight: 400;
  max-width: 500px;
  margin: 12px 0px;
  font-style: italic;
`;

const WorkLink = styled.a`
  background-color: #e1dccb;
  padding: 6px 20px;
  border-radius: 6px;
  font-size: 12px;
  color: ${Colors.palette.five};
  text-decoration: none;
  align-self: flex-start;

  :hover {
    text-decoration: underline;
  }
`;

const ImagesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageLink = styled.a`
  font-size: 14px;
  color: ${Colors.palette.five};
  text-decoration: none;
  align-self: flex-start;
  margin-top: 8px;

  :hover {
    text-decoration: underline;
  }
`;

const Image = styled.img`
  width: 90%;
  object-fit: contain;
`;

const PGLink = styled(Link)`
  background-color: #e1dccb;
  padding: 6px 20px;
  border-radius: 6px;
  font-size: 12px;
  color: ${Colors.palette.five};
  text-decoration: none;
  align-self: flex-start;

  :hover {
    text-decoration: underline;
  }
`;

const Home = () => {
  return (
    <>
      <Page>
        <WorksSection>
          <H1>WORKS</H1>
          <WorkSection>
            <H2>Pillars, 2021</H2>
            <WorkDescription>
              Simple, isometric structures organized repetitiously in a grid.
              The Pillars series has a subtle expression and consists of a
              three-piece set generated by code with different colors and
              shading for each piece.
            </WorkDescription>
            <WorkLink
              href="https://foundation.app/@vebits"
              target="_blank"
              rel="noopener noreferrer"
            >
              BROWSE ON FOUNDATION
            </WorkLink>
            <ImagesContainer>
              <ImageContainer>
                <Image src={pillars1} alt="Kronen" />
                <ImageLink
                  href="https://foundation.app/@vebits/foundation/109111"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pillars I
                </ImageLink>
              </ImageContainer>
              <ImageContainer>
                <Image src={pillars2} alt="Kronen" />
                <ImageLink
                  href="https://foundation.app/@vebits/foundation/109114"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pillars II
                </ImageLink>
              </ImageContainer>
              <ImageContainer>
                <Image src={pillars3} alt="Kronen" />
                <ImageLink
                  href="https://foundation.app/@vebits/foundation/109116"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pillars III
                </ImageLink>
              </ImageContainer>
            </ImagesContainer>
          </WorkSection>
          <WorkSection>
            <H2>Cordillera, 2021</H2>
            <WorkDescription>
              Cordillera (noun): a system or group of parallel mountain ranges
              together with the intervening plateaux and other features,
              especially in the Andes or the Rockies.
            </WorkDescription>
            <WorkLink
              href="https://teia.art/vebits"
              target="_blank"
              rel="noopener noreferrer"
            >
              BROWSE ON TEIA.ART
            </WorkLink>
            <ImagesContainer>
              <ImageContainer>
                <Image src={cord1} alt="Kronen" />
                <ImageLink
                  href="https://teia.art/objkt/67002"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cordillera 01
                </ImageLink>
              </ImageContainer>
              <ImageContainer>
                <Image src={cord2} alt="Kronen" />
                <ImageLink
                  href="https://teia.art/objkt/67008"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cordillera 02
                </ImageLink>
              </ImageContainer>
              <ImageContainer>
                <Image src={cord3} alt="Kronen" />
                <ImageLink
                  href="https://teia.art/objkt/67016"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cordillera 03
                </ImageLink>
              </ImageContainer>
              <ImageContainer>
                <Image src={cord4} alt="Kronen" />
                <ImageLink
                  href="https://teia.art/objkt/67032"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cordillera 04
                </ImageLink>
              </ImageContainer>
            </ImagesContainer>
          </WorkSection>
        </WorksSection>
        <WorksSection>
          <PGTitle>PLAYGROUND</PGTitle>
          <PGSection>
            <PGDescription>
              Playground consists of unreleased work or work in progress. These
              are all interactive pieces where the viewer can generate new
              outputs by refreshing.
            </PGDescription>
            <PGWorks>
              <PGLink to="/sabers">SABERS</PGLink>
              <PGLink to="/bubba">BUBBA</PGLink>
              <PGLink to="/flow-1">FLOW 1</PGLink>
              <PGLink to="/stripes">STRIPES</PGLink>
              <PGLink to="/color-shadows">COLOR SHADOWS</PGLink>
              <PGLink to="/flow-2">FLOW 2</PGLink>
              <PGLink to="/cordillera">CORDIELLRA</PGLink>
              <PGLink to="/color-asteroids">COLOR ASTEROIDS</PGLink>
              <PGLink to="/color-circles">COLOR CIRCLES</PGLink>
            </PGWorks>
          </PGSection>
        </WorksSection>
        {/* <AboutSection>
          <Title>About.</Title>
          <Info>A collection of my generative art projects.</Info>
        </AboutSection>
        <ProjectSection>
          <Title>Projects.</Title>
          <StyledRRLink to="/sabers">001 sabers</StyledRRLink>
          <StyledRRLink to="/bubba">002 bubba</StyledRRLink>
          <StyledRRLink to="/flow-1">003 flow 1</StyledRRLink>
          <StyledRRLink to="/stripes">004 stripes</StyledRRLink>
          <StyledRRLink to="/color-shadows">005 color shadows</StyledRRLink>
          <StyledRRLink to="/flow-2">006 flow 2</StyledRRLink>
          <StyledRRLink to="/cordillera">007 cordillera</StyledRRLink>
          <StyledRRLink to="/color-asteroids">008 color asteroids</StyledRRLink>
          <StyledRRLink to="/color-circles">009 color circles</StyledRRLink>
        </ProjectSection> */}
      </Page>
    </>
  );
};

export default Home;
