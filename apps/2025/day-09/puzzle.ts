import { getLinesFromInput, validatePuzzleInput } from "@advent-of-code/utils";
import { z } from "zod";

const COORDINATE_SEPARATOR = ",";
const RED_TYLE_VALUE = "#";
const EMPTY_TYLE_VALUE = ".";

const CoordinateParse = z
  .string()
  .trim()
  .transform((input) =>
    input.split(COORDINATE_SEPARATOR).map((value) => Number(value.trim()))
  )
  .pipe(z.tuple([z.number().positive(), z.number().positive()]));

const getCoordinates = (inputContent: string): [number, number][] => {
  const lines = getLinesFromInput(inputContent);
  const coordinates = lines.map((line) => CoordinateParse.parse(line));

  return coordinates;
};

const calculateRectangleArea = (
  topRow: number,
  bottomRow: number,
  leftCol: number,
  rightCol: number
) => {
  const width = bottomRow - topRow + 1;
  const height = rightCol - leftCol + 1;

  return width * height;
};

const findLargestRectangleSize = (redTiles: [number, number][]) => {
  let maxArea = 0;

  for (let i = 0; i < redTiles.length; i++) {
    for (let j = i + 1; j < redTiles.length; j++) {
      const [row1, col1] = redTiles[i]!;
      const [row2, col2] = redTiles[j]!;

      if (row1 === row2 && col1 === col2) continue;

      const topRow = Math.min(row1, row2);
      const bottomRow = Math.max(row1, row2);
      const leftCol = Math.min(col1, col2);
      const rightCol = Math.max(col1, col2);

      const area = calculateRectangleArea(topRow, bottomRow, leftCol, rightCol);

      if (area > maxArea) {
        maxArea = area;
      }
    }
  }

  return maxArea;
};

export const solvePuzzlePartOne = (inputContent: string) => {
  validatePuzzleInput(inputContent);
  const redTileCoordinates = getCoordinates(inputContent);
  const largestRectangleSize = findLargestRectangleSize(redTileCoordinates);

  return largestRectangleSize;
};

export const solvePuzzlePartTwo = (inputConte: string) => {
  return 0;
};
