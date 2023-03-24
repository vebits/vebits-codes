import React, { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import "./utils.css";

import Home from "Home";
import About from "pages/About";
import Strata from "pages/Strata";
import Dendro from "pages/Dendro";
import Header from "Header";
import Footer from "Footer";
import NotFound from "NotFound";

import Sabers from "001 sabers/Sabers";
import Bubba from "002 bubba/Bubba";
import Flow1 from "003 flow 1/Flow1";
import Stripes from "004 stripes/Stripes";
import ColorShadows from "005 color shadows/ColorShadows";
import Flow2 from "006 flow2/Flow2";
import CordilleraWrapper from "007 cordillera/CordilleraWrapper";
import ColorAsteroidsWrapper from "008 color asteroids/confetti3";
import ColorCircles from "009 color circles/ColorCircles";
import ABWrapper from "010 strata (ab)/AB5 screening";
import Pillars from "012 pillars/Pillars";
import Cassettes from "011 isometric/Cassettes";
import Boxes from "011 isometric/Boxes";
import FriederNake from "genart history/frieder nake/FriederNake";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'IBM Plex Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  #root {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
  
  input {
    font-family: 'IBM Plex Sans', sans-serif;
  }

  a:hover, a:visited, a:link, a:active {
    text-decoration: none;
  }

  footer {
    width: 100%;
  }
`;

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/strata" element={<Strata />} />
          <Route exact path="/dendro" element={<Dendro />} />
          <Route exact path="/sabers" element={<Sabers />} />
          <Route exact path="/bubba" element={<Bubba />} />
          <Route exact path="/flow-1" element={<Flow1 />} />
          <Route exact path="/stripes" element={<Stripes />} />
          <Route exact path="/color-shadows/:id?" element={<ColorShadows />} />
          <Route exact path="/flow-2" element={<Flow2 />} />
          <Route
            exact
            path="/cordillera/:id?"
            element={<CordilleraWrapper />}
          />
          <Route
            exact
            path="/color-asteroids/:id?"
            element={<ColorAsteroidsWrapper />}
          />
          <Route exact path="/color-circles" element={<ColorCircles />} />
          <Route exact path="/ab/:id?" element={<ABWrapper />} />
          <Route exact path="/pillars" element={<Pillars />} />
          <Route exact path="/cassettes" element={<Cassettes />} />
          <Route exact path="/boxes" element={<Boxes />} />
          <Route exact path="/nake" element={<FriederNake />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
