export const composeUrl = (base, url) => {
  if (String(url).toLowerCase().startsWith("http")) {
    return url;
  }
  return [base, url].join("/").replace(/([^:]\/)\/+/g, "$1");
};
