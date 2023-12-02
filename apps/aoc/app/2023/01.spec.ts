import { parseFile, getLines } from "@repo/parser";
import { getPuzzleInputPath } from "@repo/puzzles";
import {
  calculateCalibrationSum,
  calculateCalibrationSumV2,
} from "@repo/puzzles/src/2023/01/solution";

describe("Day 1: Trebuchet?!", () => {
  describe("Get sum of all of the calibration values", () => {
    it("Simple example", () => {
      expect(
        calculateCalibrationSum([
          "1abc2",
          "pqr3stu8vwx",
          "a1b2c3d4e5f",
          "treb7uchet",
        ]),
      ).toEqual(142);
    });

    it("From calibration document", () => {
      const { puzzleInputPath } = getPuzzleInputPath({ day: 1, year: 2023 });
      const { fileData } = parseFile({ filePath: puzzleInputPath });
      const { lines } = getLines({ fileData });

      expect(calculateCalibrationSum(lines)).toEqual(54940);
    });
  });

  describe("Get sum of all of the calibration values with spelled out letters", () => {
    it("Simple example", () => {
      expect(
        calculateCalibrationSumV2([
          "two1nine",
          "eightwothree",
          "abcone2threexyz",
          "xtwone3four",
          "4nineeightseven2",
          "zoneight234",
          "7pqrstsixteen",
        ]),
      ).toEqual(281);
    });

    it("From calibration document", () => {
      const { puzzleInputPath } = getPuzzleInputPath({ day: 1, year: 2023 });
      const { fileData } = parseFile({ filePath: puzzleInputPath });
      const { lines } = getLines({ fileData });

      expect(calculateCalibrationSumV2(lines)).toEqual(54208);
    });
  });
});
