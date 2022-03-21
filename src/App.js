import React, { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  useLocation,
} from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import "./utils.css";

import Home from "Home";
import About from "pages/About";
import Strata from "pages/Strata";
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
        {/* <Header /> */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/strata" component={Strata} />
          <Route exact path="/sabers" component={Sabers} />
          <Route exact path="/bubba" component={Bubba} />
          <Route exact path="/flow-1" component={Flow1} />
          <Route exact path="/stripes" component={Stripes} />
          <Route exact path="/color-shadows/:id?" component={ColorShadows} />
          <Route exact path="/flow-2" component={Flow2} />
          <Route exact path="/cordillera/:id?" component={CordilleraWrapper} />
          <Route
            exact
            path="/color-asteroids/:id?"
            component={ColorAsteroidsWrapper}
          />
          <Route exact path="/color-circles" component={ColorCircles} />
          <Route exact path="/ab/:id?" component={ABWrapper} />
          <Route exact path="/pillars" component={Pillars} />
          <Route exact path="/cassettes" component={Cassettes} />
          <Route exact path="/boxes" component={Boxes} />
          <Route exact path="/nake" component={FriederNake} />
          <Route path="/404" component={NotFound} />
          <Redirect to="/404" />
        </Switch>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
