/**
 * Returns an API similar to "useState" but it maches a request
 * to serve a modal using the query's search object:
 *
 * // ?modal=foo
 * const [isOpen, setOpen] = useModal('foo')
 * -> [true, fn]
 *
 * The "setOpen" function accepts a boolan.
 * Any search params is preserved unless explicitly "reset"
 * with the second argument to "setOpen(false, true)"
 */

import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";

const isOpen = (params, target) => {
  try {
    return params.modal === target;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const useModal = (target) => {
  const history = useHistory();
  const location = useLocation();
  const params = queryString.parse(location.search);

  return [
    isOpen(params, target),
    (value, reset) => {
      history.replace(
        "?" +
          queryString.stringify({
            ...(reset ? {} : params),
            modal: value ? target : null
          })
      );
    }
  ];
};

export default useModal;
