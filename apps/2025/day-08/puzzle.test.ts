import { describe, expect, test } from "bun:test";

import { readInput } from "@advent-of-code/utils";

import { calculateLargestCircuits, calculateLastMergeProduct } from "./puzzle";

describe("2025 - Day 8", () => {
  describe("Playground", () => {
    describe("Part 1", () => {
      test("should solve the puzzle with sample", () => {
        const inputContent = readInput(2025, 8, "sample.txt");

        expect(calculateLargestCircuits(inputContent, 10)).toBe(40);
      });

      test("should solve the puzzle with input", () => {
        const inputContent = readInput(2025, 8);

        expect(calculateLargestCircuits(inputContent, 1000)).toBe(175440);
      });
    });

    describe("Part 2", () => {
      test("should solve the puzzle with sample", () => {
        const inputContent = readInput(2025, 8, "sample.txt");

        expect(calculateLastMergeProduct(inputContent)).toBe(25272);
      });

      test("should solve the puzzle with input", () => {
        const inputContent = readInput(2025, 8);

        expect(calculateLastMergeProduct(inputContent)).toBe(3200955921);
      });
    });
  });
});
