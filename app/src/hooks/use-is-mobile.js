/**
 * Provides a boolean rapresentation of the current view
 * if small enoug, returns true.
 *
 * The size is based on Ioni breakpoints:
 * https://ionicframework.com/docs/layout/css-utilities#ionic-breakpoints
 */

import useMedia from "use-media";

const useIsMobile = () => useMedia({ maxWidth: 576 });

export default useIsMobile;
