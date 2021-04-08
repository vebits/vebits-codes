import React from "react";
import styled from "styled-components";

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

const Home = () => {
  return (
    <Page>
      <Title noMargin>under construction...</Title>
    </Page>
  );
};

export default Home;
//test
