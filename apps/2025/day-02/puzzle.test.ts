import { describe, expect, test } from "bun:test";

import { getItemsFromSeparator, readInput, sum } from "@advent-of-code/utils";

import {
  filterInvalidProductIdsRanges,
  isRepeatedSequencePattern,
  isRepeatedSequenceTwice,
} from "./puzzle";

describe("2025 - Day 2", () => {
  describe("Gift Shop", () => {
    describe("Part 1", () => {
      test("should solve the puzzle with sample", () => {
        const inputContent = readInput(2025, 2, "sample.txt");
        const idsRanges = getItemsFromSeparator(inputContent).flat();

        expect(
          sum(filterInvalidProductIdsRanges(idsRanges, isRepeatedSequenceTwice))
        ).toBe(1227775554);
      });

      test("should solve the puzzle with input", () => {
        const inputContent = readInput(2025, 2);
        const idsRanges = getItemsFromSeparator(inputContent).flat();

        expect(
          sum(filterInvalidProductIdsRanges(idsRanges, isRepeatedSequenceTwice))
        ).toBe(18893502033);
      });
    });

    describe("Part 2", () => {
      test("should solve the puzzle with sample", () => {
        const inputContent = readInput(2025, 2, "sample.txt");
        const idsRanges = getItemsFromSeparator(inputContent).flat();

        expect(
          sum(
            filterInvalidProductIdsRanges(idsRanges, isRepeatedSequencePattern)
          )
        ).toBe(4174379265);
      });

      test("should solve the puzzle with input", () => {
        const inputContent = readInput(2025, 2);
        const idsRanges = getItemsFromSeparator(inputContent).flat();

        expect(
          sum(
            filterInvalidProductIdsRanges(idsRanges, isRepeatedSequencePattern)
          )
        ).toBe(26202168557);
      });
    });
  });
});
