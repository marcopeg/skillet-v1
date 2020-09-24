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
  IonTitle,
  IonButtons,
  IonButton
} from "@ionic/react";

import {
  chevronBackOutline,
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
                <IonButtons slot="start">
                  <IonButton
                    routerLink="/"
                    routerAnimation="none"
                    routerDirection="none"
                  >
                    <IonIcon slot="start" icon={chevronBackOutline} />
                  </IonButton>
                </IonButtons>
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
                      routerLink={`/p/${projectId}/dashboard`}
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
                      routerLink={`/p/${projectId}/resources`}
                      lines="none"
                      detail={false}
                    >
                      <IonIcon slot="start" icon={personCircleOutline} />
                      <IonLabel>Resources</IonLabel>
                    </IonItem>
                    <IonItem
                      routerLink={`/p/${projectId}/properties`}
                      lines="none"
                      detail={false}
                    >
                      <IonIcon slot="start" icon={fingerPrintOutline} />
                      <IonLabel>Properties</IonLabel>
                    </IonItem>
                    <IonItem
                      routerLink={`/p/${projectId}/settings`}
                      lines="none"
                      detail={false}
                    >
                      <IonIcon slot="start" icon={settingsOutline} />
                      <IonLabel>Settings</IonLabel>
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
              path="/p/:projectId/properties/v/:propertyId"
              component={PropertyDetailsView}
            />
            <Route
              exact
              path="/p/:projectId/properties"
              component={PropertiesView}
            />
            <Route
              exact
              path="/p/:projectId/settings"
              component={SettingsView}
            />
            <Route
              exact
              path="/p/:projectId"
              render={() => <Redirect to={`/p/${projectId}/dashboard`} />}
            />
            <Route path="" component={PageNotFoundView} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonPage>
    </ProjectProvider>
  );
};

export default DesktopLayout;
