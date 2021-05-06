import React, { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  useLocation,
} from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import Home from "Home";
import NotFound from "NotFound";
import Footer from "Footer";

import Sabers from "001 sabers/Sabers";
import Bubba from "002 bubba/Bubba";
import Flow1 from "003 flow 1/Flow1";
import Stripes from "004 stripes/Stripes";
import ColorShadows from "005 color shadows/ColorShadows";
import Flow2 from "006 flow2/NaturalFlow";
import Parent from "007 cordillera/Parent";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'EB Garamond', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  input {
    font-family: 'EB Garamond', sans-serif;
  }

  a:hover, a:visited, a:link, a:active {
    text-decoration: none;
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
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/sabers" component={Sabers} />
          <Route exact path="/bubba" component={Bubba} />
          <Route exact path="/flow-1" component={Flow1} />
          <Route exact path="/stripes" component={Stripes} />
          <Route exact path="/color-shadows" component={ColorShadows} />
          <Route exact path="/flow-2" component={Flow2} />
          <Route exact path="/cordillera/:id?" component={Parent} />
          <Route path="/404" component={NotFound} />
          <Redirect to="/404" />
        </Switch>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
