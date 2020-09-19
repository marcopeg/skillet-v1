import React from "react";

import useIsMobile from "./hooks/use-is-mobile";
import DesktopLayout from "./layouts/DesktopLayout";
import MobileLayout from "./layouts/MobileLayout";

const App = () => {
  const isMobile = useIsMobile();
  return isMobile ? <MobileLayout /> : <DesktopLayout />;
};

export default App;
