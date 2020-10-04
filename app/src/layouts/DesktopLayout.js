import React from "react";
import { Route, Switch } from "react-router";

import DesktopProject from "./DesktopProject";
import ProjectsList from "../views/ProjectsList";
import PageNotFoundView from "../views/PageNotFoundView";

const DesktopLayout = () => (
  <Switch>
    <Route exact path="/" component={ProjectsList} />
    <Route path="/p/:projectId" component={DesktopProject} />
    <Route path="" component={PageNotFoundView} />
  </Switch>
);

export default DesktopLayout;
