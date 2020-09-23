import React from "react";
import { Route, Redirect } from "react-router";

import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet,
  IonLabel,
  IonIcon
} from "@ionic/react";

import {
  appsOutline,
  personCircleOutline,
  fingerPrintOutline,
  settingsOutline
} from "ionicons/icons";

import { ProjectProvider } from "../state/project/use-project";

// Views
import DashboardView from "../views/DashboardView";
import PropertiesView from "../views/PropertiesView";
import ResourcesView from "../views/ResourcesView";
import SettingsView from "../views/SettingsView";
import PageNotFoundView from "../views/PageNotFoundView";

const MobileProject = ({ match }) => {
  const projectId = match.params.projectId;
  return (
    <ProjectProvider projectId={projectId}>
      <IonTabs>
        <IonRouterOutlet>
          <Route
            exact
            path="/p/:projectId/dashboard"
            component={DashboardView}
          />
          <Route
            exact
            path="/p/:projectId/resources"
            component={ResourcesView}
          />
          <Route
            exact
            path="/p/:projectId/properties"
            component={PropertiesView}
          />
          <Route exact path="/p/:projectId/settings" component={SettingsView} />
          <Route
            exact
            path="/p/:projectId"
            render={() => <Redirect to={`/p/${projectId}/dashboard`} />}
          />
          <Route path="" component={PageNotFoundView} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom" style={{ marginBottom: 5 }}>
          <IonTabButton
            key={"dashboard"}
            tab={"dashboard"}
            href={`/p/${projectId}/dashboard`}
            layout="label-hide"
          >
            <IonIcon icon={appsOutline} />
            <IonLabel>dashboard</IonLabel>
          </IonTabButton>
          <IonTabButton
            key={"resources"}
            tab={"resources"}
            href={`/p/${projectId}/resources`}
            layout="label-hide"
          >
            <IonIcon icon={personCircleOutline} />
            <IonLabel>resources</IonLabel>
          </IonTabButton>
          <IonTabButton
            key={"properties"}
            tab={"properties"}
            href={`/p/${projectId}/properties`}
            layout="label-hide"
          >
            <IonIcon icon={fingerPrintOutline} />
            <IonLabel>properties</IonLabel>
          </IonTabButton>
          <IonTabButton
            key={"settings"}
            tab={"settings"}
            href={`/p/${projectId}/settings`}
            layout="label-hide"
          >
            <IonIcon icon={settingsOutline} />
            <IonLabel>settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </ProjectProvider>
  );
};

export default MobileProject;
