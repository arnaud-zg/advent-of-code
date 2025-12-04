import { describe, expect, test } from "bun:test";

import { getLinesFromInput, readInput } from "@advent-of-code/utils";

import {
  countAccessibleRollDiagram,
  markAccessibleRollDiagram,
  markTotalAccessibleRollDiagram,
} from "./puzzle";

describe("2025 - Day 4", () => {
  describe("Printing Department", () => {
    describe("Part 1", () => {
      test("should solve the puzzle with sample", () => {
        const inputContent = readInput(2025, 4, "sample.txt");
        const lines = getLinesFromInput(inputContent);

        expect(
          countAccessibleRollDiagram(markAccessibleRollDiagram(lines))
        ).toBe(13);
      });

      test("should solve the puzzle with input", () => {
        const inputContent = readInput(2025, 4);
        const lines = getLinesFromInput(inputContent);

        expect(
          countAccessibleRollDiagram(markAccessibleRollDiagram(lines))
        ).toBe(1424);
      });
    });

    describe("Part 2", () => {
      test("should solve the puzzle with sample", () => {
        const inputContent = readInput(2025, 4, "sample.txt");
        const lines = getLinesFromInput(inputContent);

        expect(
          countAccessibleRollDiagram(markTotalAccessibleRollDiagram(lines))
        ).toBe(43);
      });

      test("should solve the puzzle with input", () => {
        const inputContent = readInput(2025, 4);
        const lines = getLinesFromInput(inputContent);

        expect(
          countAccessibleRollDiagram(markTotalAccessibleRollDiagram(lines))
        ).toBe(8727);
      });
    });
  });
});
