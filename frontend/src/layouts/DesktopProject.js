import React from "react";
import { Route, Redirect } from "react-router";

import {
  IonPage,
  IonSplitPane,
  IonList,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonMenu,
  IonContent,
  IonRouterOutlet,
  IonMenuToggle,
  IonIcon,
  IonLabel,
  IonHeader,
  IonFooter,
  IonToolbar,
  IonTitle
} from "@ionic/react";

import {
  homeOutline,
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
import ResourcesView from "../views/ResourcesView";
import SettingsView from "../views/SettingsView";
import PageNotFoundView from "../views/PageNotFoundView";

// Components
import GithubIssue from "../components/GithubIssue";

const DesktopLayout = ({ match }) => {
  const projectId = match.params.projectId;

  return (
    <ProjectProvider projectId={projectId}>
      <IonPage>
        <IonSplitPane contentId="desktop-project" when="md">
          <IonMenu contentId="desktop-project" type="overlay">
            <IonHeader>
              <IonToolbar>
                <IonTitle>SkillMatrix</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonList id="inbox-list">
                <IonMenuToggle key={"desktop-main-menu"} autoHide={false}>
                  <IonItemGroup>
                    <IonItemDivider>
                      <IonLabel>Data Visualization</IonLabel>
                    </IonItemDivider>
                    <IonItem
                      routerLink={`${match.url}/dashboard`}
                      routerDirection={"root"}
                      lines="none"
                      detail={false}
                    >
                      <IonIcon slot="start" icon={appsOutline} />
                      <IonLabel>Dashboard</IonLabel>
                    </IonItem>
                  </IonItemGroup>
                  <IonItemGroup>
                    <IonItemDivider>
                      <IonLabel>Edit Skill Matrix Structure</IonLabel>
                    </IonItemDivider>
                    <IonItem
                      routerLink={`${match.url}/resources`}
                      routerDirection={"root"}
                      lines="none"
                      detail={false}
                    >
                      <IonIcon slot="start" icon={personCircleOutline} />
                      <IonLabel>Resources</IonLabel>
                    </IonItem>
                    <IonItem
                      routerLink={`${match.url}/properties`}
                      routerDirection={"root"}
                      lines="none"
                      detail={false}
                    >
                      <IonIcon slot="start" icon={fingerPrintOutline} />
                      <IonLabel>Properties</IonLabel>
                    </IonItem>
                    <IonItem
                      routerLink={`${match.url}/settings`}
                      routerDirection={"root"}
                      lines="none"
                      detail={false}
                    >
                      <IonIcon slot="start" icon={settingsOutline} />
                      <IonLabel>Settings</IonLabel>
                    </IonItem>
                    <IonItemDivider>
                      <IonLabel>Other</IonLabel>
                    </IonItemDivider>
                    <IonItem
                      routerLink="/"
                      routerDirection={"root"}
                      lines="none"
                      detail={false}
                    >
                      <IonIcon slot="start" icon={homeOutline} />
                      <IonLabel>Go to projects list</IonLabel>
                    </IonItem>
                  </IonItemGroup>
                </IonMenuToggle>
              </IonList>
            </IonContent>
            <IonFooter>
              <GithubIssue />
            </IonFooter>
          </IonMenu>
          <IonRouterOutlet id="desktop-project">
            <Route
              exact
              path={`/p/:projectId/dashboard`}
              component={DashboardView}
            />
            <Route
              exact
              path={`/p/:projectId/resources`}
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
              path={`/p/:projectId/properties`}
              component={PropertiesView}
            />
            <Route
              exact
              path={`/p/:projectId/settings`}
              component={SettingsView}
            />
            <Route
              exact
              path={`${match.url}`}
              render={() => <Redirect to={`${match.url}/dashboard`} />}
            />
            <Route path="" component={PageNotFoundView} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonPage>
    </ProjectProvider>
  );
};

export default DesktopLayout;
