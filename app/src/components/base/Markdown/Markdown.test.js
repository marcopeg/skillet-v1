import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Markdown from "./Markdown";

describe("components", () => {
  describe("Markdown", () => {
    let container = null;
    beforeEach(() => {
      // setup a DOM element as a render target
      container = document.createElement("div");
      document.body.appendChild(container);
    });

    afterEach(() => {
      // cleanup on exiting
      unmountComponentAtNode(container);
      container.remove();
      container = null;
    });

    const renderTest = src =>
      act(() => {
        render(<Markdown source={src} />, container);
      });

    test("it should render an hello world", () => {
      renderTest("hello world");
      expect(container.textContent).toBe("hello world");
      expect(container.innerHTML).toContain("ion-text");
    });

    test('it should render an external link with "target=_blank"', () => {
      renderTest("http://google.com [a link](https://github.com)");
      expect(container.innerHTML).toContain('target="_blank"');

      const blanks = container.innerHTML.match(/target="_blank"/g) || [];
      expect(blanks.length).toBe(2);
    });

    test('it should render an internal link withour "target=_blank"', () => {
      renderTest("[link1](/foobar) [link2](./foobar)");
      expect(container.innerHTML).not.toContain('target="_blank"');

      const blanks = container.innerHTML.match(/target="_blank"/g) || [];
      expect(blanks.length).toBe(0);
    });

    test("it should render link references", () => {
      renderTest(`
[External link][1]
[Internal link][2]

[1]: http://google.com "External link"
[2]: /internal "Internal link"
`);

      expect(container.innerHTML).toContain('target="_blank"');
      const blanks = container.innerHTML.match(/target="_blank"/g) || [];
      expect(blanks.length).toBe(1);
    });
  });
});
