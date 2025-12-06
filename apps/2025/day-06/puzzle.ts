import {
  getItemsFromSeparator,
  getLinesFromInput,
  multiply,
  sum,
  validatePuzzleInput,
} from "@advent-of-code/utils";
import { LineSignSchema, type Line, type LineSign } from "./schemas";

type ExtractFrom2DStrategy = (items2D: string[][]) => {
  sign: "+" | "*";
  values: number[];
}[];

const extractFrom2D: ExtractFrom2DStrategy = (items2D) => {
  if (items2D.length === 0) {
    return [];
  }

  const lines = items2D[items2D.length - 1]!.reduce<Line[]>(
    (acc, item, index) => {
      const sign = LineSignSchema.parse(item);
      const allItemsExpectLast = items2D.slice(0, -1);
      const values = allItemsExpectLast.map((items) => Number(items[index]));

      return [...acc, { sign, values }];
    },
    []
  );

  return lines;
};

type ComputeMathWorksheetStrategy = (
  sign: "+" | "*",
  values: number[]
) => number;

export const computeMathWorksheet = (sign: LineSign, values: number[]) => {
  switch (sign) {
    case "*":
      return multiply(values);
    case "+":
      return sum(values);

    default:
      throw new Error(`Not supported sign '${sign}'`);
  }
};

export const computeMathWorksheetRightToLeftInColumn = (
  sign: LineSign,
  values: number[]
) => {
  const stringValues = values.map((value) => value.toString());
  const maxLength = Math.max(...stringValues.map((s) => s.length));

  const paddedValues = values.map((value) => {
    if (sign === "*") {
      return value.toString().padStart(maxLength, "0");
    } else if (sign === "+") {
      return value.toString().padEnd(maxLength, "0");
    }

    return value.toString();
  });

  const processedValues: number[] = [];

  for (let index = maxLength - 1; index >= 0; index--) {
    const columnDigits = paddedValues
      .map((items) => items[index])
      .filter((char) => char !== "0")
      .join("");

    if (columnDigits) {
      processedValues.push(Number(columnDigits));
    }
  }

  switch (sign) {
    case "*":
      return multiply(processedValues);
    case "+":
      return sum(processedValues);
    default:
      throw new Error(`Not supported sign '${sign}'`);
  }
};

export const getMathWorksheetSolutions = (
  inputContent: string,
  computeMathWorksheetStrategy: ComputeMathWorksheetStrategy
) => {
  validatePuzzleInput(inputContent);

  const items = getItemsFromSeparator(inputContent, " ");
  const lines = extractFrom2D(items);
  const mathWorksheetSolutions = lines.map(({ sign, values }) =>
    computeMathWorksheetStrategy(sign, values)
  );

  return mathWorksheetSolutions;
};

const collectDigitFromColumn = (lines: string[], column: number) => {
  let thisDigit = "";

  for (let row = 0; row < lines.length - 1; row++) {
    const char = lines[row]!.charAt(column);

    if (char !== " ") {
      thisDigit = `${thisDigit}${char}`;
    }
  }

  return thisDigit;
};

const getOperatorFromColumn = (lines: string[], column: number) => {
  return lines[lines.length - 1]!.charAt(column);
};

export const getMathWorksheetSolutionsRightToLeft = (inputContent: string) => {
  validatePuzzleInput(inputContent);

  const lines = getLinesFromInput(inputContent);
  const results: number[] = [];
  let digits: string[] = [];

  for (let column = lines[0]!.length - 1; column >= 0; column--) {
    const thisDigit = collectDigitFromColumn(lines, column);

    if (thisDigit) {
      digits.push(thisDigit);
    }

    const operator = getOperatorFromColumn(lines, column);

    if (operator === "*" || operator === "+") {
      const values = digits.map((d) => Number(d));
      const sign = LineSignSchema.parse(operator);

      const subTotal = computeMathWorksheet(sign, values);

      results.push(subTotal);

      digits = [];
      column--;
    }
  }

  return results;
};
