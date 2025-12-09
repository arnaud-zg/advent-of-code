import { describe, expect, test } from "bun:test";

import { readInput } from "@advent-of-code/utils";

import { solvePuzzlePartOne, solvePuzzlePartTwo } from "./puzzle";

describe("2025 - Day 9", () => {
  describe("Movie Theater", () => {
    describe("Part 1", () => {
      test("should solve the puzzle with sample", () => {
        const inputContent = readInput(2025, 9, "sample.txt");

        expect(solvePuzzlePartOne(inputContent)).toBe(50);
      });

      test("should solve the puzzle with input", () => {
        const inputContent = readInput(2025, 9);

        expect(solvePuzzlePartOne(inputContent)).toBe(4761736832);
      });
    });

    describe("Part 2", () => {
      test("should solve the puzzle with sample", () => {
        const inputContent = readInput(2025, 9, "sample.txt");

        expect(solvePuzzlePartTwo(inputContent)).toBe(24);
      });

      test.skip("should solve the puzzle with input", () => {
        const inputContent = readInput(2025, 9);

        expect(solvePuzzlePartTwo(inputContent)).toBeUndefined();
      });
    });
  });
});
