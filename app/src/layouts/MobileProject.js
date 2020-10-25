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
import PropertyDetailsView from "../views/PropertyDetailsView";
import PropertyEditView from "../views/PropertyEditView";
import ResourceGroupDetailsView from "../views/ResourceGroupDetailsView";
import ResourcesView from "../views/ResourcesView";
import ResourceDetailsView from "../views/ResourceDetailsView";
import ResourceEditView from "../views/ResourceEditView";
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
            path={`/p/:projectId/resources/g/:groupId`}
            component={ResourceGroupDetailsView}
          />
          <Route
            exact
            path={`/p/:projectId/resources/v/:resourceId/edit`}
            component={ResourceEditView}
          />
          <Route
            exact
            path={`/p/:projectId/resources/v/:resourceId`}
            component={ResourceDetailsView}
          />
          <Route
            exact
            path="/p/:projectId/resources"
            component={ResourcesView}
          />
          <Route
            exact
            path={`/p/:projectId/properties/v/:propertyId/edit`}
            component={PropertyEditView}
          />
          <Route
            exact
            path={`/p/:projectId/properties/v/:propertyId`}
            component={PropertyDetailsView}
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
            layout="label-hide"
            href={`/p/${projectId}/dashboard`}
            routerDirection="root"
          >
            <IonIcon icon={appsOutline} />
            <IonLabel>dashboard</IonLabel>
          </IonTabButton>
          <IonTabButton
            key={"resources"}
            tab={"resources"}
            layout="label-hide"
            href={`/p/${projectId}/resources`}
            routerDirection="root"
          >
            <IonIcon icon={personCircleOutline} />
            <IonLabel>resources</IonLabel>
          </IonTabButton>
          <IonTabButton
            key={"properties"}
            tab={"properties"}
            layout="label-hide"
            href={`/p/${projectId}/properties`}
            routerDirection="root"
          >
            <IonIcon icon={fingerPrintOutline} />
            <IonLabel>properties</IonLabel>
          </IonTabButton>
          <IonTabButton
            key={"settings"}
            tab={"settings"}
            layout="label-hide"
            href={`/p/${projectId}/settings`}
            routerDirection="root"
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
