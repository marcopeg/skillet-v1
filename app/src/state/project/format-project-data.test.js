import { test1, test2 } from "./format-project-data.fixture.json";
import { formatProjectData, getObsolescenceValue } from "./format-project-data";
import { normalizeScore } from "./calculate-stats";

describe("formatProjectData", () => {
  describe("formatProjectData", () => {
    const res = formatProjectData(test1);
    // console.log(res);
    // test("project", () => {
    //   expect(res).toHaveProperty("project");
    //   expect(res).toHaveProperty("settings");
    // });
  });

  describe("getObsolescenceValue", () => {
    const refDate = new Date("2020-10-05T07:24:21.687Z");
    const settings = {
      efficiency: {
        obsolescence: [
          {
            //       MS     SEC  MIN  HOUR DAYS
            elapsed: 1000 * 60 * 60 * 24 * 3,
            value: 30
          },
          {
            //       MS     SEC  MIN  HOUR DAYS
            elapsed: 1000 * 60 * 60 * 24 * 2,
            value: 20
          },
          {
            //       MS     SEC  MIN  HOUR DAYS
            elapsed: 1000 * 60 * 60 * 24 * 1,
            value: 10
          }
        ]
      }
    };
    test("it should return zero if no threshold is hit", () => {
      expect(
        getObsolescenceValue(
          new Date("2020-10-05T04:24:21.687Z"),
          settings,
          refDate
        )
      ).toBe(0);
    });
    test("it should detect the lower threshold", () => {
      // exact threshold
      expect(
        getObsolescenceValue(
          new Date("2020-10-04T04:24:21.687Z"),
          settings,
          refDate
        )
      ).toBe(10);
      // 1 micro second before the threshold
      expect(
        getObsolescenceValue(
          new Date("2020-10-04T07:24:21.688Z"),
          settings,
          refDate
        )
      ).toBe(0);
    });
    test("it should detect the middle threshold", () => {
      // exact threshold
      expect(
        getObsolescenceValue(
          new Date("2020-10-03T04:24:21.687Z"),
          settings,
          refDate
        )
      ).toBe(20);
      // 1 micro second before the threshold
      expect(
        getObsolescenceValue(
          new Date("2020-10-03T07:24:21.688Z"),
          settings,
          refDate
        )
      ).toBe(10);
    });
  });

  describe("normalizeScore", () => {
    test("should calculate the lower threshold", () => {
      expect(normalizeScore(-100, -100, 100)).toBe(0);
    });
    test("should not go below 0", () => {
      expect(normalizeScore(-120, -100, 100)).toBe(0);
    });
    test("should calculate the upper threshold", () => {
      expect(normalizeScore(100, -100, 100)).toBe(1);
    });
    test("should go above 1", () => {
      expect(normalizeScore(110, -100, 100)).toBe(1);
    });
    test("should calculate mid way", () => {
      expect(normalizeScore(0, -100, 100)).toBe(0.5);
    });
  });
});
