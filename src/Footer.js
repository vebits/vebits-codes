import React from "react";
import styled from "styled-components";

import { Colors } from "utils/constants";

const FooterContainerTop = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 8px 12px;
  background-color: ${Colors.grey.light};
`;

const FooterContainerBottom = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 8px 12px;
  background-color: ${Colors.grey.light2};
`;

const TopFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1280px;
  width: 100%;
  min-height: 80px;
`;

const BottomFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1280px;
  min-height: 40px;
  width: 100%;
`;

function Footer() {
  return (
    <footer>
      <FooterContainerTop>
        <TopFooter>
          <span>how to:</span>
          <span>1. go to a project</span>
          <span>2. refresh to generate</span>
        </TopFooter>
      </FooterContainerTop>
      <FooterContainerBottom>
        <BottomFooter>
          <h5>copyright Vebjørn Isaksen</h5>
        </BottomFooter>
      </FooterContainerBottom>
    </footer>
  );
}

export default Footer;
