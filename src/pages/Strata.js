import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import s152000000 from "assets/images/152000000.png";
import s152000001 from "assets/images/152000001.png";
import s152000003 from "assets/images/152000003.png";
import s152000005 from "assets/images/152000005.png";
import s152000006 from "assets/images/152000006.png";
import s152000008 from "assets/images/152000008.png";
import s152000009 from "assets/images/152000009.png";
import s152000010 from "assets/images/152000010.png";
import s152000012 from "assets/images/152000012.png";
import s152000014 from "assets/images/152000014.png";
import s152000016 from "assets/images/152000016.png";
import s152000018 from "assets/images/152000018.png";
import s152000019 from "assets/images/152000019.png";
import s152000022 from "assets/images/152000022.png";
import s152000023 from "assets/images/152000023.png";
import s152000024 from "assets/images/152000024.png";
import s152000025 from "assets/images/152000025.png";
import s152000026 from "assets/images/152000026.png";
import s152000027 from "assets/images/152000027.png";
import s152000030 from "assets/images/152000030.png";
import s152000032 from "assets/images/152000032.png";
import s152000034 from "assets/images/152000034.png";
import s152000035 from "assets/images/152000035.png";
import s152000039 from "assets/images/152000039.png";
import s152000041 from "assets/images/152000041.png";
import s152000043 from "assets/images/152000043.png";
import s152000044 from "assets/images/152000044.png";
import s152000045 from "assets/images/152000045.png";
import s152000046 from "assets/images/152000046.png";
import s152000047 from "assets/images/152000047.png";
import s152000048 from "assets/images/152000048.png";
import s152000049 from "assets/images/152000049.png";
import s152000052 from "assets/images/152000052.png";
import s152000054 from "assets/images/152000054.png";
import s152000055 from "assets/images/152000055.png";
import s152000056 from "assets/images/152000056.png";
import s152000058 from "assets/images/152000058.png";
import s152000059 from "assets/images/152000059.png";
import s152000060 from "assets/images/152000060.png";
import s152000061 from "assets/images/152000061.png";
import s152000062 from "assets/images/152000062.png";
import s152000063 from "assets/images/152000063.png";

import { Colors } from "utils/constants";

const Page = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px 0px 256px 0px;
  max-width: 1280px;
  width: 100%;
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

const Section = styled.section`
  display: flex;
  margin-top: 24px;
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
`;

const ImageRow = styled.div`
  display: flex;
  margin-top: 24px;

  > *:not(:last-child) {
    margin-right: 24px;
  }
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 700px;
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

function Strata() {
  return (
    <Page>
      <H1>STRATA</H1>
      <Section>
        <FlexColumn>
          <H2>BACKGROUND</H2>
          <Paragraph className="mb">
            Strata is a long form generative art series consisting of 650
            editions releasing March 11 2022 on{" "}
            <TextLink
              href="https://www.artblocks.io/project/276"
              target="_blank"
              rel="noopener noreferrer"
            >
              Art Blocks
            </TextLink>
            . The project, in its entirety, is stored immutably on the Ethereum
            blockchain. This write-up dives into how the Strata algorithm works
            and provides an overview of the different features.
            <br />
            <br />
            Strata explores the field of geology and more specifically rock
            layering. In the physical world, layered rocks form when particles
            settle from water or air. These layers of sedimentary rock are
            called strata. In the digital world, the Strata algorithm generates
            layer upon layer of colors to draw the impression of rock layering.
            Each token hash decides the path Strata takes through the generative
            space to the final output.
          </Paragraph>
          <H2>FINE ART PRINTS</H2>
          <Paragraph>
            Holders of a Strata token are eligible to purchase a print
            corresponding to the token number a holder owns. All prints are
            artist signed, numbered and printed on archival quality paper. The
            paper used is the popular{" "}
            <TextLink
              href="https://www.hahnemuehle.com/en/digital-fineart/fineart-media/matt-fineart-smooth/p/Product/show/8/1.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hahnemühle Photo Rag
            </TextLink>
            , which is 308 gsm, 100% cotton and acid- and lignin-free. After
            testing several diffrent papers, this paper was found, with its
            characteristic, beautiful defined felt structure, to display Strata
            best. The prints will ship unframed and two sizes will be available:
          </Paragraph>
          {RenderFeatures(["20x25cm", "40x50cm"])}
          <Paragraph>
            <TextLink
              href="https://www.katevassgalerie.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kate Vass Gallery
            </TextLink>{" "}
            is responsible for taking print orders, so please head over there if
            you would like a print of your Strata.
          </Paragraph>
        </FlexColumn>
        <ImageContainer>
          <Image src={s152000054} width={80} loading="lazy" alt="Kronen" />
          <ImageLink
            href="https://artist-staging.artblocks.io/token/152000054"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ropsten test mint #54
          </ImageLink>
        </ImageContainer>
      </Section>
      <Section>
        <FeatureColumn>
          <H2>VIEW</H2>
          <Paragraph className="max-w">
            This feature decides how to outputs should be displayed. There are
            five different views:
          </Paragraph>
          {RenderFeatures([
            "Cross section 1 and 2",
            "Mountainside 1 and 2",
            "Mountain peak",
          ])}
          <Paragraph className="max-w">
            The cross section view is like a vertical cut of a mountain while
            the mountainside views show whole mountains. These two extreme
            points are by design and encourages the viewer to imagine the space
            between.
          </Paragraph>
          {RenderImageRow([
            {
              src: s152000061,
              num: "061",
              imageText: "Cross section 1 - Ropsten test mint #61",
            },
            {
              src: s152000044,
              num: "044",
              imageText: "Cross section 2 - Ropsten test mint #44",
            },
            {
              src: s152000043,
              num: "043",
              imageText: "Mountainside 1 - Ropsten test mint #43",
            },
            {
              src: s152000014,
              num: "014",
              imageText: "Mountainside 2 - Ropsten test mint #14",
            },
          ])}
        </FeatureColumn>
      </Section>
      <Section>
        <FeatureColumn>
          <H2>DENSITY</H2>
          <Paragraph className="max-w">
            Density decides the overall number of layers. High density results
            in thin layers while low density produce thick layers. This feature
            has five different outcomes:
          </Paragraph>
          {RenderFeatures(["Very low", "Low", "Medium", "High", "Very high"])}
          {RenderImageRow([
            {
              src: s152000032,
              num: "032",
              imageText: "Very low - Ropsten test mint #32",
            },
            {
              src: s152000026,
              num: "026",
              imageText: "Medium - Ropsten test mint #26",
            },
            {
              src: s152000012,
              num: "012",
              imageText: "Very high - Ropsten test mint #12",
            },
          ])}
        </FeatureColumn>
      </Section>
      <Section>
        <FeatureColumn>
          <H2>DIRECTION</H2>
          <Paragraph className="max-w">
            Direction is self-explanatory, a peak can either occur on the left
            or right side or both. The direction will be both if{" "}
            <span className="it">symmetric</span> is applied and some of the
            them can resemble a valley.
          </Paragraph>
          {RenderFeatures(["Left to right", "Right to left", "Both"])}
          {RenderImageRow([
            {
              src: s152000049,
              num: "049",
              imageText: "Left to right - Ropsten test mint #49",
            },
            {
              src: s152000045,
              num: "045",
              imageText: "Right to left - Ropsten test mint #45",
            },
            {
              src: s152000027,
              num: "027",
              imageText: "Both - Ropsten test mint #27",
            },
          ])}
        </FeatureColumn>
      </Section>
      <Section>
        <FeatureColumn>
          <H2>Surface</H2>
          <Paragraph className="max-w">
            Surface can change the overall expression of an output
            significantly. <span className="it">Standard</span> has organic
            curves while <span className="it">even</span> is more straight
            lines. Lastly, an <span className="it">uneven</span> surface
            consists of more less smooth layers.
          </Paragraph>
          {RenderFeatures(["Standard", "Even", "Uneven"])}
          {RenderImageRow([
            {
              src: s152000003,
              num: "003",
              imageText: "Standard - Ropsten test mint #3",
            },
            {
              src: s152000058,
              num: "058",
              imageText: "Even - Ropsten test mint #58",
            },
            {
              src: s152000041,
              num: "041",
              imageText: "Uneven - Ropsten test mint #41",
            },
          ])}
        </FeatureColumn>
      </Section>
      <Section>
        <FeatureColumn>
          <H2>COLORING STRATEGY</H2>
          <Paragraph className="max-w">
            How does Strata decide which color to apply to each layer? The most
            straight forward is probably <span className="it">random</span>,
            where each layer is applied a random color from the palette.{" "}
            <span className="it">Sequential</span> starts with the first color
            in the palette, then the second and so on until there are no more
            layers to color. <span className="it">Group</span> is similar to
            sequential, but applies the same color multiple times before
            switching. Every now and then, a random color occurs inbetween the
            grouping of colors.
          </Paragraph>
          {RenderFeatures(["Group", "Sequential", "Random", "None"])}
          {RenderImageRow([
            {
              src: s152000016,
              num: "016",
              imageText: "Group - Ropsten test mint #16",
            },
            {
              src: s152000039,
              num: "039",
              imageText: "Sequential - Ropsten test mint #39",
            },
            {
              src: s152000048,
              num: "048",
              imageText: "Random - Ropsten test mint #48",
            },
          ])}
        </FeatureColumn>
      </Section>
      <Section>
        <FeatureColumn>
          <H2>COLOR CHANGE</H2>
          <Paragraph className="max-w">
            A color change can happen in two ways,{" "}
            <span className="it">discrete</span> or{" "}
            <span className="it">blend</span>. With{" "}
            <span className="it">discrete</span>, which produce a structured
            expression, it is easy to separate the layers and see where one
            starts and ends. However, that is not the case for{" "}
            <span className="it">blend</span> as each layer have a set opacity
            between 0.1 and 0.9. This gives the impression of the colors
            blending into each other and produce a harmonious and soothing
            result.
          </Paragraph>
          {RenderFeatures(["Discrete", "Blend"])}
          {RenderImageRow([
            {
              src: s152000046,
              num: "046",
              imageText: "Discrete - Ropsten test mint #46",
            },
            {
              src: s152000008,
              num: "008",
              imageText: "Blend - Ropsten test mint #8",
            },
          ])}
        </FeatureColumn>
      </Section>
      <Section>
        <FeatureColumn>
          <H2>PALETTE COMPOSITION</H2>
          <Paragraph className="max-w">
            Strata starts with choosing a color palette with a given size,
            usually five. This features decides which of those colors that
            should be used in the final output. <span className="it">Full</span>{" "}
            means that the palette as a whole is used, but the palette can also
            consist of derived palettes. This means that Strata chooses one or
            two colors to use, which results in the{" "}
            <span className="it">Derived (duo)</span> and{" "}
            <span className="it">Derived (single)</span> options for this
            feature.
            <br />
            <br />
            For the single option, Strata know which color that can be used
            based on the background to overcome the problem of choosing a color
            with poor contrast. I am by no means an expert in this area, so
            please reach out if you find some pieces hard to see. I want my work
            to accessible to all.
          </Paragraph>
          {RenderFeatures([
            "Full",
            "Derived (duo)",
            "Derived (single)",
            "None",
          ])}
          <Paragraph className="max-w">
            Each palette consists of at most four background colors Strata can
            chose from. Below is three different ones from the{" "}
            <span className="it">Magma</span> palette.
          </Paragraph>
          {RenderImageRow([
            {
              src: s152000018,
              num: "018",
              imageText: "Full - Ropsten test mint #18",
            },
            {
              src: s152000055,
              num: "055",
              imageText: "Derived (duo) - Ropsten test mint #55",
            },
            {
              src: s152000035,
              num: "035",
              imageText: "Derived (single) - Ropsten test mint #35",
            },
          ])}
        </FeatureColumn>
      </Section>
      <Section>
        <FeatureColumn>
          <H2>PALETTES</H2>
          <Paragraph className="max-w">
            Strata can choose between 16 different palettes. Most of the names
            are inspired by terms in geology, while others are named after my
            own perception when seeing them. Sunken, for example‚ is from taken
            from the video game Valheim and more specifically the{" "}
            <TextLink
              href="https://valheim.fandom.com/wiki/Sunken_Crypts"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sunken Crypts
            </TextLink>{" "}
            (I am still terrified by them).
            <br />
            <br />
            "Earthy" is probably the best way to describe the overall theme for
            the palettes, although some do have more cheerful colors, for
            example the <span className="it">Kayenta</span> palette.
            <br />
            <br />
            These are the palettes sort alphabetically:
          </Paragraph>
          {RenderFeatures([
            "Basalt",
            "Blue mineral",
            "Cañón",
            "Gneiss",
            "Green mineral",
            "Jade",
            "Kayenta",
            "Lava",
            "Limestone",
            "Magma",
            "Moonshine",
            "Obsidian",
            "Pink opal",
            "Redwall",
            "Sandstone",
            "Sunken",
          ])}
          {RenderImageRow([
            {
              src: s152000009,
              num: "009",
              imageText: "Basalt - Ropsten test mint #9",
            },
            {
              src: s152000056,
              num: "056",
              imageText: "Blue mineral - Ropsten test mint #56",
            },
            {
              src: s152000006,
              num: "006",
              imageText: "Cañón - Ropsten test mint #6",
            },
            {
              src: s152000034,
              num: "034",
              imageText: "Gneiss - Ropsten test mint #34",
            },
          ])}
          {RenderImageRow([
            {
              src: s152000024,
              num: "024",
              imageText: "Green mineral - Ropsten test mint #24",
            },
            {
              src: s152000005,
              num: "005",
              imageText: "Jade - Ropsten test mint #5",
            },
            {
              src: s152000000,
              num: "000",
              imageText: "Kayenta - Ropsten test mint #0",
            },
            {
              src: s152000047,
              num: "047",
              imageText: "Lava - Ropsten test mint #47",
            },
          ])}
          {RenderImageRow([
            {
              src: s152000025,
              num: "025",
              imageText: "Limestone - Ropsten test mint #25",
            },
            {
              src: s152000001,
              num: "001",
              imageText: "Magma - Ropsten test mint #1",
            },
            {
              src: s152000059,
              num: "059",
              imageText: "Moonshine - Ropsten test mint #59",
            },
            {
              src: s152000019,
              num: "019",
              imageText: "Obsidian - Ropsten test mint #19",
            },
          ])}
          {RenderImageRow([
            {
              src: s152000022,
              num: "022",
              imageText: "Pink opal - Ropsten test mint #22",
            },
            {
              src: s152000062,
              num: "062",
              imageText: "Redwall - Ropsten te62 mint #55",
            },
            {
              src: s152000030,
              num: "030",
              imageText: "Sandstone - Ropsten test mint #30",
            },
            {
              src: s152000060,
              num: "060",
              imageText: "Sunken - Ropsten test mint #60",
            },
          ])}
        </FeatureColumn>
      </Section>
      <Section>
        <FeatureColumn>
          <H2>BOOLEAN FEATURES</H2>
          <Paragraph className="max-w">
            There are four features that takes a boolean value and they are
            listed below. <span className="it">Symmetric</span> actually takes
            three values, but the reason for that is because there are two
            diffrent variations of symmetry. One is{" "}
            <span className="it">near perfect</span> while the other is{" "}
            <span className="it">close enough</span>.
            <br />
            <br />
            Each layer can be <span className="it">outlined</span> which I find
            interesting as it gives the artwork a cartoonish characteristic.
            <br />
            <br />
            The credit for the <span className="it">
              Overhanging cliff
            </span>{" "}
            feature goes to{" "}
            <TextLink
              href="https://twitter.com/zjorge"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jorge Ledzema
            </TextLink>
            . While showing him some early outputs of the Strata algorithm he
            sent me one back where he had rotate it upside down and said I
            needed to include that.
            <br />
            <br />
            <span className="it">No fill</span> means exactly that, no layers
            are filled with colors and only the outline is present.
          </Paragraph>
          {RenderFeatures([
            "Symmetric",
            "Outlined",
            "Overhanging cliff",
            "No fill",
          ])}
          {RenderImageRow([
            {
              src: s152000063,
              num: "063",
              imageText: "Symmetric - Ropsten test mint #63",
            },
            {
              src: s152000023,
              num: "023",
              imageText: "Outlined - Ropsten test mint #23",
            },
            {
              src: s152000052,
              num: "052",
              imageText: "Overhanging cliff - Ropsten test mint #52",
            },
            {
              src: s152000010,
              num: "010",
              imageText: "No fill - Ropsten test mint #10",
            },
          ])}
        </FeatureColumn>
      </Section>
      <Section>
        <FeatureColumn>
          <H2>CLOSING THOUGHTS</H2>
          <Paragraph className="max-w">
            If you made it all the way down here, thank you for your interest in
            my work. I really appreciate everyone taking time to study it and
            hope you enjoyed this write-up.
            <br />
            <br />
            If you mint or collect a Strata, I will be forever grateful. For
            more updates on Strata-related things or generative art in general,
            please visit my Twitter{" "}
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

export default Strata;
