import {
  appsOutline,
  homeOutline,
  personCircleOutline,
  logInOutline,
  fingerPrintOutline
} from "ionicons/icons";

const useMenu = () => [
  // Public Items
  {
    label: "Home",
    path: "/",
    icon: homeOutline,
    isPublic: true,
    isTab: false,
    isSidebar: false,
    isDashboard: false,
    isActive: (location) => location.pathname === "/"
  },
  {
    label: "Privacy Policy",
    path: "/privacy",
    icon: fingerPrintOutline,
    isPublic: true,
    isTab: false,
    isSidebar: false,
    isDashboard: false,
    isActive: (location) => location.pathname === "/privacy"
  },
  {
    label: "Login",
    path: "/login",
    icon: logInOutline,
    isPublic: true,
    isTab: false,
    isSidebar: false,
    isDashboard: false,
    isActive: (location) => location.pathname === "/login"
  },

  // Private Items
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: appsOutline,
    isPublic: false,
    isTab: true,
    isSidebar: true,
    isDashboard: false,
    isActive: (location) => location.pathname.includes("/dashboard")
  },
  {
    label: "Profile",
    path: "/me",
    icon: personCircleOutline,
    isPublic: false,
    isTab: true,
    isSidebar: true,
    isDashboard: true,
    isActive: (location) => location.pathname.includes("/me")
  }
];

export default useMenu;
