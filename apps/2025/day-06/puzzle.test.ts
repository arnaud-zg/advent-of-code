import { describe, expect, test } from "bun:test";

import { readInput, sum } from "@advent-of-code/utils";

import {
  getMathWorksheetSolutions,
  extractFrom2DLeftToRight,
  extractFrom2DRightToLeft,
} from "./puzzle";

describe("2025 - Day 6", () => {
  describe("Trash Compactor", () => {
    describe("Part 1", () => {
      test("should solve the puzzle with sample", () => {
        const inputContent = readInput(2025, 6, "sample.txt");

        expect(
          sum(getMathWorksheetSolutions(inputContent, extractFrom2DLeftToRight))
        ).toBe(4277556);
      });

      test("should solve the puzzle with input", () => {
        const inputContent = readInput(2025, 6);

        expect(
          sum(getMathWorksheetSolutions(inputContent, extractFrom2DLeftToRight))
        ).toBe(6378679666679);
      });
    });

    describe("Part 2", () => {
      test("should solve the puzzle with sample", () => {
        const inputContent = readInput(2025, 6, "sample.txt");

        expect(
          sum(getMathWorksheetSolutions(inputContent, extractFrom2DRightToLeft))
        ).toBe(3263827);
      });

      test.skip("should solve the puzzle with input", () => {
        const inputContent = readInput(2025, 6);

        expect(
          getMathWorksheetSolutions(inputContent, extractFrom2DRightToLeft)
        ).toBeUndefined();
      });
    });
  });
});
