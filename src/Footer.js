import React from "react";
import styled from "styled-components";

import { Colors } from "utils/constants";

const BottomFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  width: 100%;
  background-color: #e1dccb;
`;

const FooterText = styled.span`
  font-size: 12px;
  margin: 0;
  font-weight: 400;
`;

function Footer() {
  return (
    <footer>
      <BottomFooter>
        <FooterText>
          COPYRIGHT © VEBJØRN ISAKSEN. ALL RIGHTS RESERVED.
        </FooterText>
      </BottomFooter>
    </footer>
  );
}

export default Footer;
