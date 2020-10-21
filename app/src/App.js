import React from "react";

import useIsMobile from "./hooks/use-is-mobile";
import useIsUnsupportedBrowser from "./hooks/use-is-unsupported-browser";
import DesktopLayout from "./layouts/DesktopLayout";
import MobileLayout from "./layouts/MobileLayout";

import Markdown from "./components/base/Markdown";

const UNSUPPORTED_MESSAGE = `
# Skillet

This browser is not supported, please use [Google Chrome][gc] or [Firefox][ff] instead.

[gc]: https://www.google.com/chrome
[ff]: https://www.mozilla.org/en-US/firefox/
`;

const App = () => {
  const isMobile = useIsMobile();
  const isUnsuported = useIsUnsupportedBrowser();

  if (isUnsuported) {
    return (
      <div style={{ width: 500, margin: "auto", marginTop: "10vh" }}>
        <Markdown source={UNSUPPORTED_MESSAGE} />
      </div>
    );
  }

  return isMobile ? <MobileLayout /> : <DesktopLayout />;
};

export default App;
