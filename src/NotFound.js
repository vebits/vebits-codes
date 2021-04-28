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

const Title = styled.h1`
  font-size: 3.5rem;
  color: #3c3c3c;
  margin-bottom: 24px;
`;

const NotFound = () => {
  return (
    <Page>
      <Title noMargin>404 art not found.</Title>
    </Page>
  );
};

export default NotFound;
