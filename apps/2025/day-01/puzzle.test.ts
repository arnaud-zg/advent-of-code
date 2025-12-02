import { describe, expect, test } from "bun:test";

import { getLinesFromInput, readInput } from "@advent-of-code/utils";

import { countAllZeroHits, countEndPositionZeros } from "./puzzle";

describe("2025 - Day 1", () => {
  describe("Secret Entrance", () => {
    describe("Part 1", () => {
      test("should solve the puzzle with sample", () => {
        const inputContent = readInput(2025, 1, "sample.txt");
        const lines = getLinesFromInput(inputContent);

        expect(countEndPositionZeros(lines)).toBe(3);
      });

      test("should solve the puzzle with input", () => {
        const inputContent = readInput(2025, 1);
        const lines = getLinesFromInput(inputContent);

        expect(countEndPositionZeros(lines)).toBe(1071);
      });
    });

    describe("Part 2", () => {
      test("should solve the puzzle with sample", () => {
        const inputContent = readInput(2025, 1, "sample.txt");
        const lines = getLinesFromInput(inputContent);

        expect(countAllZeroHits(lines)).toBe(6);
      });

      test("should solve the puzzle with input", () => {
        const inputContent = readInput(2025, 1);
        const lines = getLinesFromInput(inputContent);

        expect(countAllZeroHits(lines)).toBe(6700);
      });
    });
  });
});
