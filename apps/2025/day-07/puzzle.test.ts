import { describe, expect, test } from "bun:test";

import { readInput } from "@advent-of-code/utils";

import {
  getCountQuantumTimelinesTachyonManifold,
  getSplitCountTachyonManifold,
} from "./puzzle";

describe("2025 - Day 7", () => {
  describe("Laboratories", () => {
    describe("Part 1", () => {
      test("should solve the puzzle with sample", () => {
        const inputContent = readInput(2025, 7, "sample.txt");
        const { splitCount } = getSplitCountTachyonManifold(inputContent, {
          print: false,
        });

        expect(splitCount).toBe(21);
      });

      test("should solve the puzzle with input", () => {
        const inputContent = readInput(2025, 7);
        const { splitCount } = getSplitCountTachyonManifold(inputContent);

        expect(splitCount).toBe(1658);
      });
    });

    describe("Part 2", () => {
      test("should solve the puzzle with sample", () => {
        const inputContent = readInput(2025, 7, "sample.txt");
        const { countTimeline } = getCountQuantumTimelinesTachyonManifold(
          inputContent,
          { print: false }
        );

        expect(countTimeline).toBe(40);
      });

      test("should solve the puzzle with input", () => {
        const inputContent = readInput(2025, 7);
        const { countTimeline } =
          getCountQuantumTimelinesTachyonManifold(inputContent);

        expect(countTimeline).toBe(53916299384254);
      });
    });
  });
});
