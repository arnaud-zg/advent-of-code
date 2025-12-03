import { describe, expect, test } from "bun:test";

import { readInput, sum } from "@advent-of-code/utils";

import { getMaxKJoltageList } from "./puzzle";

describe("2025 - Day 3", () => {
  describe("Lobby", () => {
    describe("Part 1", () => {
      test("should solve the puzzle with sample", () => {
        const inputContent = readInput(2025, 3, "sample.txt");

        expect(sum(getMaxKJoltageList(inputContent, 2))).toBe(357);
      });

      test("should solve the puzzle with input", () => {
        const inputContent = readInput(2025, 3);

        expect(sum(getMaxKJoltageList(inputContent, 2))).toBe(16887);
      });
    });

    describe("Part 2", () => {
      test("should solve the puzzle with sample", () => {
        const inputContent = readInput(2025, 3, "sample.txt");

        expect(sum(getMaxKJoltageList(inputContent, 12))).toBe(3121910778619);
      });

      test("should solve the puzzle with input", () => {
        const inputContent = readInput(2025, 3);

        expect(sum(getMaxKJoltageList(inputContent, 12))).toBe(167302518850275);
      });
    });
  });
});
