import React from "react";

const IonWrapper = ({ children, bordered, ...props }) => {
  const style = {
    ...props,
    ...(bordered ? { border: "10px solid #ddd" } : {})
  };
  return <div style={{ display: "block", ...style }}>{children}</div>;
};

export default IonWrapper;
