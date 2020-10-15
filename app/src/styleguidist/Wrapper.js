import React from "react";
import RsgWrapper from "react-styleguidist/lib/client/rsg-components/Wrapper/Wrapper";
import { MemoryRouter as Router } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import "../vapor";
import "../index.css";

/* Styleguidist overrides to make the Styleguide scrollable */
import "./Wrapper.css";

const Wrapper = ({ children, ...rest }) => (
  <RsgWrapper {...rest}>
    <Router>{children}</Router>
  </RsgWrapper>
);

export default Wrapper;
