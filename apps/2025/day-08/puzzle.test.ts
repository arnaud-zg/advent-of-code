import { describe, expect, test } from "bun:test";

import { readInput } from "@advent-of-code/utils";

import { solvePuzzle } from "./puzzle";

describe("2025 - Day 8", () => {
  describe("Playground", () => {
    describe("Part 1", () => {
      test("should solve the puzzle with sample", () => {
        const inputContent = readInput(2025, 8, "sample.txt");

        expect(solvePuzzle(inputContent)).toBe(40);
      });

      test("should solve the puzzle with input", () => {
        const inputContent = readInput(2025, 8);

        expect(solvePuzzle(inputContent)).toBeUndefined();
      });
    });

    describe.skip("Part 2", () => {
      test.skip("should solve the puzzle with sample", () => {
        const inputContent = readInput(2025, 8, "sample.txt");

        expect(solvePuzzle(inputContent)).toBeUndefined();
      });

      test.skip("should solve the puzzle with input", () => {
        const inputContent = readInput(2025, 8);

        expect(solvePuzzle(inputContent)).toBeUndefined();
      });
    });
  });
});
