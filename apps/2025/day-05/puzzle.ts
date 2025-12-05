import { sum, validatePuzzleInput } from "@advent-of-code/utils";
import { ingredientIdListParser, parseIntervals } from "./parsers";
import { CHAR_SEPARATOR, type Interval } from "./schemas";

const mergeIntervals = (intervals: Interval[]): Interval[] => {
  intervals.sort((a, b) => a.min - b.min);

  let merged: Interval[] = [];
  let { min, max } = intervals[0]!;

  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i]!;

    const isOverlapping = current.min <= max;

    if (isOverlapping) {
      max = Math.max(max, current.max);

      continue;
    }

    merged.push({ min, max });
    min = current.min;
    max = current.max;
  }

  merged.push({ min, max });

  return merged;
};

export const filterFreshIngredientIds = (inputContent: string) => {
  validatePuzzleInput(inputContent);

  const [intervalsRaw, ingredientIdsRaw] = inputContent.split(CHAR_SEPARATOR);
  const intervals = parseIntervals.parse(intervalsRaw);
  const mergedIntervals = mergeIntervals(intervals);
  const ingredientIds = ingredientIdListParser.parse(ingredientIdsRaw);
  const freshIngredientIds = ingredientIds.filter((ingredientId) =>
    mergedIntervals.some(
      ({ min, max }) => ingredientId >= min && ingredientId <= max
    )
  );

  return freshIngredientIds;
};

export const countFreshIngredientIdsBasedOnRanges = (inputContent: string) => {
  validatePuzzleInput(inputContent);

  const [intervalsRaw] = inputContent.split(CHAR_SEPARATOR);
  const intervals = parseIntervals.parse(intervalsRaw);
  const mergedIntervals = mergeIntervals(intervals);
  const countFreshIngredientRanges = mergedIntervals.flatMap(
    ({ min, max }) => max - min + 1
  );

  return sum(countFreshIngredientRanges);
};
