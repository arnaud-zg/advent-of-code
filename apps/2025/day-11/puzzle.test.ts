import { describe, expect, test } from "bun:test";

import { readInput } from "@advent-of-code/utils";

import { getDifferentPaths } from "./puzzle";

describe("2025 - Day 11", () => {
  describe("Reactor", () => {
    describe("Part 1", () => {
      test("should solve the puzzle with sample", () => {
        const inputContent = readInput(2025, 11, "sample.txt");

        expect(getDifferentPaths(inputContent, "you", "out")).toBe(5);
      });

      test("should solve the puzzle with input", () => {
        const inputContent = readInput(2025, 11);

        expect(getDifferentPaths(inputContent, "you", "out")).toBe(652);
      });
    });

    describe("Part 2", () => {
      test("should solve the puzzle with sample", () => {
        const inputContent = readInput(2025, 11, "sample-2.txt");

        expect(
          getDifferentPaths(inputContent, "svr", "out", ["dac", "fft"])
        ).toBe(2);
      });

      test("should solve the puzzle with input", () => {
        const inputContent = readInput(2025, 11);

        expect(
          getDifferentPaths(inputContent, "svr", "out", ["dac", "fft"])
        ).toBe(362956369749210);
      });
    });
  });
});
