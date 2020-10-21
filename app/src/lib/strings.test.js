import { composeUrl } from "./strings";

describe("lib", () => {
  describe("strings", () => {
    describe("composeUrl", () => {
      test("it should concatenate base and uri", () => {
        const res = composeUrl("http://google.com", "foobar");
        expect(res).toBe("http://google.com/foobar");
      });

      test("it should deduplicate slashes", () => {
        const res = composeUrl("http://google.com/", "/foobar");
        expect(res).toBe("http://google.com/foobar");
      });

      test("it should ignore base for full urls", () => {
        const res = composeUrl("http://google.com/", "https://foobar");
        expect(res).toBe("https://foobar");
      });
    });
  });
});
