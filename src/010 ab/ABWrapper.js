import React from "react";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import AB from "010 ab/AB5 stretched";
import Footer from "Footer";

import { Colors } from "utils/constants";

const Page = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px 12px;
  padding: ${(props) => (props.id ? "0px" : "32px 12px")};
  background-color: white;
`;

const StyledLink = css`
  text-decoration: none;
  color: ${Colors.palette.five};
  border-bottom: solid 1px ${Colors.palette.five};
  padding-bottom: 4px;
  margin-bottom: 24px;
  font-weight: 800;

  :hover {
    opacity: 0.7;
  }
`;

const StyledRRLink = styled(Link)`
  ${StyledLink}
`;

const Info = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${(props) => (props.inverted ? "white" : Colors.palette.five)};
  margin: 0;
`;

const Date = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => (props.inverted ? "white" : Colors.palette.five)};
  margin: 0;
  margin-bottom: 24px;
`;

function ABWrapper({ children }) {
  let { id } = useParams();
  console.log(id);

  return (
    <>
      <Page id={id}>
        {id ? (
          <AB id={id} />
        ) : (
          <>
            <StyledRRLink to="/">back to frontpage</StyledRRLink>
            <Info>
              <Title>AB</Title>
              <Date>14.06.2021</Date>
            </Info>
            <AB id={id} />
            <Title>TODO:</Title>
            <ul>
              <li>
                <s>implement core algorithm</s>
              </li>
              <li>
                <s>implement ABs PRNG</s>
              </li>
              <li>
                <s>use ABs hash generator as seed</s>
              </li>
              <li>
                <s>resolution agnostic</s>
              </li>
              <li>
                <s>4:3 aspect ratio</s>
              </li>
              <li>
                <s>coloring strategy</s>
              </li>
              <li>curate/create palettes</li>
              <li>tweaking features</li>
            </ul>
          </>
        )}
      </Page>
      {id ? null : <Footer />}
    </>
  );
}

export default ABWrapper;
