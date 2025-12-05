import { describe, expect, test } from "bun:test";

import { readInput } from "@advent-of-code/utils";

import {
  countFreshIngredientIdsBasedOnRanges,
  filterFreshIngredientIds,
} from "./puzzle";

describe("2025 - Day 5", () => {
  describe("Cafeteria", () => {
    describe("Part 1", () => {
      test("should solve the puzzle with sample", () => {
        const inputContent = readInput(2025, 5, "sample.txt");

        expect(filterFreshIngredientIds(inputContent)).toHaveLength(3);
      });

      test("should solve the puzzle with input", () => {
        const inputContent = readInput(2025, 5);

        expect(filterFreshIngredientIds(inputContent)).toHaveLength(615);
      });
    });

    describe("Part 2", () => {
      test("should solve the puzzle with sample", () => {
        const inputContent = readInput(2025, 5, "sample.txt");

        expect(countFreshIngredientIdsBasedOnRanges(inputContent)).toEqual(14);
      });

      test("should solve the puzzle with input", () => {
        const inputContent = readInput(2025, 5);

        expect(countFreshIngredientIdsBasedOnRanges(inputContent)).toEqual(
          353716783056994
        );
      });
    });
  });
});
