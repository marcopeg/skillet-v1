import { isSafari, isMobile } from "react-device-detect";

const useIsUnsupportedBrowser = () => isSafari && !isMobile;

export default useIsUnsupportedBrowser;
