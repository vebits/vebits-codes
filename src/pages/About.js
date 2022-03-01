import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Colors } from "utils/constants";

const Page = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px 0px;
  max-width: 1280px;
  width: 100%;
`;

const Paragraph = styled.p`
  max-width: 600px;
  margin: 0;
`;

function About() {
  return (
    <Page>
      <Paragraph>
        Oslo based generative artist, Vebjørn Isaksen, has an avid interest for
        computer art and algorithms. Originally a computer scientist, Vebjørn
        has recently found other ways of using his coding skills, namely for
        creating generative art.
        <br />
        <br />
        His approach to developing algorithms that eventually generate some
        output, usually consists of starting with a basic technique or idea
        followed by a lot of trial and error until something interesting
        emerges. His artwork, mostly static, is often inspired by everyday
        observations in the natural world and usually consists of a mix between
        the structural digital world and the more chaotic physical one.
        <br />
        <br />
        As a part of his artistic and learning process, Vebjørn enjoys exploring
        other’s art and try to understand the underlying algorithm or technique.
        Occasionally, he challenges himself to recreate the work with code, and
        sometimes, after some iterations, this can lead to new algorithms and
        artworks.
      </Paragraph>
    </Page>
  );
}

export default About;
