import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Colors } from "utils/constants";

import dendro1 from "assets/images/dendro01.png";
import dendro4 from "assets/images/dendro04.png";
import dendro5 from "assets/images/dendro05.png";
import dendro6 from "assets/images/dendro06.png";
import curve from "assets/images/curve.png";
import sub from "assets/images/sub.jpg";

const Page = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px 0px 256px 0px;
  max-width: 1280px;
  width: 100%;

  @media (max-width: 1280px) {
    padding: 24px 12px 256px 12px;
  }
`;

const H1 = styled.h1`
  font-size: 24px;
  margin: 0;
  font-weight: 400;
`;

const H2 = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  margin-bottom: 12px;
`;

const H3 = styled.h3`
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  margin-bottom: 12px;
`;

const Section = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;

  @media (max-width: 768px) {
    flex-direction: column;

    > *:last-child {
      margin-top: 24px;
    }
  }
`;

const Paragraph = styled.p`
  font-size: 16px;
  margin: 0;
  font-weight: 400;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
`;

const ImageLink = styled.a`
  font-size: 14px;
  color: ${Colors.palette.five};
  text-decoration: none;
  margin-top: 8px;

  :hover {
    text-decoration: underline;
  }
`;

const Image = styled.img`
  width: ${(props) => (props.width ? `${props.width}%` : "100%")};
  object-fit: contain;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const ImageText = styled.p`
  font-size: 14px;
  color: ${Colors.palette.five};
  align-self: flex-start;
  margin-top: 8px;
`;

const ImageRow = styled.div`
  display: flex;
  margin-top: 24px;

  > *:not(:last-child) {
    margin-right: 24px;
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;

    > *:not(:last-child) {
      margin-right: 0px;
      margin-bottom: 24px;
    }
  }
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  margin-right: 12px;
`;

const FeatureColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextLink = styled.a`
  font-size: 16px;
  font-weight: 500;
  color: ${Colors.palette.five};
  text-decoration: none;
  margin-top: 8px;

  :hover {
    text-decoration: underline;
  }
`;

const RenderFeatures = (features) => (
  <ul>
    {features.map((f, key) => (
      <li key={key} className="bold-500">
        {f}
      </li>
    ))}
  </ul>
);

const RenderImageRow = (images) => (
  <ImageRow>
    {images.map((i) => (
      <ImageContainer key={i.num}>
        <Image src={i.src} loading="lazy" alt={i.imageText} />
        <ImageLink
          href={`https://artist-staging.artblocks.io/token/152000${i.num}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {i.imageText}
        </ImageLink>
      </ImageContainer>
    ))}
  </ImageRow>
);

function Dendro() {
  return (
    <Page>
      <H1>DENDRO</H1>
      <Section>
        <FlexColumn>
          <H2>BACKGROUND</H2>
          <Paragraph className="mb">
            Dendro is a long form generative art series consisting of 275
            editions releasing April XX 2023 on{" "}
            <TextLink
              href="https://www.artblocks.io/project/276"
              target="_blank"
              rel="noopener noreferrer"
            >
              Art Blocks
            </TextLink>
            . The project, in its entirety, is stored immutably on the Ethereum
            blockchain. This write-up dives into how the Dendro algorithm works
            and provides an overview of the different features.
            <br />
            <br />
            Dendro is a generative art project inspired by the beauty of tree
            rings. Each year, trees add a new ring to their trunks, recording
            their growth and responding to the changing seasons and
            environmental conditions. These rings tell a story of the tree's
            life. By replicating these patterns, the project captures the
            rhythmic and organic qualities of nature.
            <br />
            <br />
            In this project, I wanted to explore the aesthetic and conceptual
            possibilities of tree rings through code-based art. I used a
            generative algorithm to simulate the growth of virtual trees,
            generating patterns that resemble the annual rings of real trees,
            but with a twist. Instead of using traditional circular or oval
            shapes, I experimented with different geometric forms and noise. I
            also played with colors and instead of using earthy and realistic
            colours, the palettes are inspired by the richness and diversity of
            the natural world.
            <br />
            <br />
            The algorithm works by starting with the outer most ring, which over
            time grows towards an arbitrary chose center according to certain
            rules and parameters. Each iteration adds a new layer of shapes
            inside the previous one, mimicking the accumulation of tree rings. I
            introduced random mutations and variations, which introduce
            unexpected and unpredictable outputs, evoking the unpredictability
            of natural processes.
            <br />
            <br />
            Each artwork is inviting the viewer to contemplate the complexity
            and diversity of nature. I hope that this project will inspire
            others to explore the wonders of nature and to experiment with
            code-based art as a means of expression and exploration.
          </Paragraph>
        </FlexColumn>
        <ImageContainer>
          <Image src={dendro1} width={100} loading="lazy" />
          <ImageText>Out-of-band #3</ImageText>
        </ImageContainer>
      </Section>
      <Section>
        <FlexColumn>
          <H2>SOME PHILOSOPHICAL THOUGHTS</H2>
          <Paragraph className="mb">
            During the course of this project, I have acquired a significant
            amount of knowledge on trees and have developed a basic
            understanding of the insights that can be obtained from studying
            tree rings. This field, known as dendrochronology, involves the
            examination of tree rings to gather a wide range of information not
            only about the tree itself but also about the various factors that
            have influenced it over time. What follow is more or less some
            philosophical thoughts about everything surrounding this project.
          </Paragraph>
          <H3>TIME</H3>
          <Paragraph className="mb">
            Tree time refers to the way in which trees experience and measure
            time, which is vastly different from how humans do. Trees grow and
            age slowly, sometimes over hundreds or even thousands of years, and
            their development occurs on a timescale that is much longer than
            that of humans or many other organisms. This means that trees can
            provide a physical record of their own growth and the environmental
            conditions they have experienced over time, and in doing so, they
            can give us a glimpse into the natural history of the planet. Tree
            rings, for example, can tell us about climate patterns, fire
            history, and even the social and economic conditions of the time in
            which the tree grew.
            <br />
            <br />
            Human time, on the other hand, is marked by the passage of days,
            weeks, months, and years, and it is subject to all sorts of cultural
            and social conventions. We experience time through the rhythms of
            daily life, the milestones of aging, and the significant events that
            shape our personal and collective histories. Unlike tree time, human
            time can feel both fleeting and infinite, depending on our
            perspective and the events we are experiencing. Our experience of
            time is also influenced by our cultural backgrounds, as different
            cultures have their own ways of measuring and valuing time.
            <br />
            <br />
            Blockchain time is a newer concept that refers to the way that
            transactions are recorded and validated on a blockchain network.
            Unlike traditional financial systems, which rely on a centralized
            authority to verify and process transactions, blockchains use a
            decentralized network of nodes to maintain a secure and tamper-proof
            ledger of all transactions. This ledger is maintained indefinitely,
            creating a kind of eternal record of every transaction that has ever
            occurred on the blockchain. Blockchain time is not subject to the
            same physical limitations as tree time or the same cultural and
            social conventions as human time, and it represents a fundamentally
            different way of measuring and valuing information.
            <br />
            <br />
            Overall, these three different times - tree time, human time, and
            blockchain time - reflect the complex ways in which time is
            experienced, measured, and valued in our world. Each type of time
            has its own unique characteristics and can provide us with insights
            into different aspects of our natural and social environments. By
            exploring these different types of time in art and other creative
            endeavors, we can deepen our understanding of the world around us
            and our place within it.
            <br />
            <br />
            <H3>WHY THIS PROJECT?</H3>
            To begin, I'd like to discuss the things that inspire me. From an
            early age, I've been captivated by the natural world, and as I began
            creating generative art, I sought out patterns and ideas from
            nature. My initial exploration of this concept was through my
            long-form generative project,{" "}
            <TextLink
              href="https://www.artblocks.io/project/276"
              target="_blank"
              rel="noopener noreferrer"
            >
              Strata
            </TextLink>
            . As I approached my next project, I still felt compelled to draw
            inspiration from nature, as well as from other nature-inspired
            generative works that were already out there such as{" "}
            <TextLink
              href="https://www.artblocks.io/collections/curated/projects/0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270/53"
              target="_blank"
              rel="noopener noreferrer"
            >
              Subscapes by Matt DesLauriers
            </TextLink>
            ,{" "}
            <TextLink
              href="https://knownorigin.io/gallery/35200-curvescape-4217716"
              target="_blank"
              rel="noopener noreferrer"
            >
              Curvescape by Kjetil Golid
            </TextLink>
            ,{" "}
            <TextLink
              href="https://www.artblocks.io/collections/curated/projects/0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270/233"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chimera by mpkoz
            </TextLink>
            ,{" "}
            <TextLink
              href="https://www.artblocks.io/collections/curated/projects/0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270/284"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ancient Courses of Fictional Rivers by Robert Hodgin
            </TextLink>
            , and many more.
            <br />
            <br />
            Technically, Dendro explores the patterns of tree rings and I found
            it interesting to explore the intersection between art and science.
            While the technical aspect of the project may not be groundbreaking,
            the use of generative art techniques to create colorful and vivid
            animations of the rings is visually engaging and beautiful.
            <br />
            <br />
            Conceptually, this project is innovative in its approach to using
            tree rings as a source of inspiration for artistic expression. By
            highlighting the patterns found within the rings, I am able to
            create a thought-provoking body of work that challenges the viewer's
            perceptions of both art and science. This intersection between the
            two fields provides a fascinating perspective that encourages
            exploration and experimentation.
            <br />
            <br />
            Aesthetically, I wanted to use color and animation to represent the
            natural world. The vibrant colors and dynamic movements of the
            images create, from my perspective, a visually stunning and
            captivating experience that showcases the beauty and complexity of
            nature. The animations bring the images to life and add an element
            of surprise and delight that I hope capture the viewer's attention.
            <br />
            <br />
            While Dendro may not be groundbreaking from a technical standpoint,
            its conceptual and aesthetic innovation make it a unique and
            exciting addition to the world of generative art. By exploring the
            intersection between art and science, we can push the boundaries of
            what we consider to be art, and opening up new avenues for creative
            expression and exploration.
          </Paragraph>
        </FlexColumn>
        <div>
          <ImageContainer>
            <Image src={curve} width={100} loading="lazy" />
            <ImageText>Inspiration, Curvescape by Kjetil Golid</ImageText>
          </ImageContainer>
          <ImageContainer>
            <Image src={sub} width={100} loading="lazy" />
            <ImageText>Inspiration, Subscapes by Matt DesLauriers</ImageText>
          </ImageContainer>
        </div>
      </Section>
      <Section>
        <ImageContainer>
          <Image src={dendro4} width={100} loading="lazy" />
          <ImageText>Out-of-band #4</ImageText>
        </ImageContainer>
        <ImageContainer>
          <Image src={dendro5} width={100} loading="lazy" />
          <ImageText>Out-of-band #5</ImageText>
        </ImageContainer>
        <ImageContainer>
          <Image src={dendro6} width={100} loading="lazy" />
          <ImageText>Out-of-band #6</ImageText>
        </ImageContainer>
      </Section>
      <Section>
        <FeatureColumn>
          <H2>CLOSING THOUGHTS</H2>
          <Paragraph className="max-w">
            Thank you for taking the time to read through my upcoming project. I
            am truly grateful for your interest and I hope you found this
            write-up enjoyable. Once all the mints are (hopefully) sold out, I
            plan on updating this site with images of the mints and providing a
            detailed overview of the features. So please stay tuned for that!
            <br />
            <br />
            For more updates on Dendro-related things, some sneak peaks of
            Goerli mints or generative art in general, please visit my Twitter{" "}
            <TextLink
              href="https://twitter.com/vebits"
              target="_blank"
              rel="noopener noreferrer"
            >
              @vebits
            </TextLink>
            .
          </Paragraph>
        </FeatureColumn>
      </Section>
    </Page>
  );
}

export default Dendro;
