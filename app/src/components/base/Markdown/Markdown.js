import React from "react";
import ReactMarkdown from "react-markdown";
import { IonText } from "@ionic/react";

// Implements `target="_blank"` only for external links
// https://github.com/remarkjs/react-markdown/issues/12#issuecomment-464095373
// https://github.com/remarkjs/react-markdown/issues/12#issuecomment-329845068
const renderExternalLink = ({ children, ...props }) => {
  const hrefProps = props.href.toLowerCase().startsWith("http")
    ? {
        ...props,
        target: "_blank",
        rel: "noopener noreferrer"
      }
    : props;

  return <a {...hrefProps}>{children}</a>;
};

// Use all returns as <br>
// https://github.com/remarkjs/react-markdown/issues/233#issuecomment-469890211
const returnAsBr = str =>
  typeof str === "string" ? str.replace(/\n/g, "  \n") : str;

const renderers = {
  link: renderExternalLink,
  linkReference: renderExternalLink
};

const Markdown = ({ source, children, ...props }) => (
  <IonText {...props}>
    <ReactMarkdown renderers={renderers}>
      {returnAsBr(source || children)}
    </ReactMarkdown>
  </IonText>
);

export default Markdown;
