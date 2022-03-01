import React from "react";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import ColorShadows from "005 color shadows/ColorShadows";
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

function Parent({ children }) {
  let { id } = useParams();
  console.log(id);
  return (
    <>
      <Page id={id}>
        {id ? (
          <ColorShadows id={id} />
        ) : (
          <>
            <StyledRRLink to="/">back to frontpage</StyledRRLink>
            <Info>
              <Title>color shadows</Title>
              <Date>18.04.2021</Date>
            </Info>
            <ColorShadows id={id} />
          </>
        )}
      </Page>
    </>
  );
}

export default Parent;
