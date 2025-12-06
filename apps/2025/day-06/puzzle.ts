import {
  getItemsFromSeparator,
  multiply,
  sum,
  validatePuzzleInput,
} from "@advent-of-code/utils";
import { z } from "zod";

const LineSignSchema = z.enum(["+", "*"]);

const LineSchema = z.object({
  sign: LineSignSchema,
  values: z.number().array(),
});
type Line = z.infer<typeof LineSchema>;

type ExtractFrom2DStrategy = (items2D: string[][]) => {
  sign: "+" | "*";
  values: number[];
}[];

export const extractFrom2DLeftToRight: ExtractFrom2DStrategy = (items2D) => {
  if (items2D.length === 0) {
    return [];
  }

  const lines = items2D[items2D.length - 1]!.reduce<Line[]>(
    (acc, item, index) => {
      const lineSign = LineSignSchema.parse(item);

      index;
      const allItemsExpectLast = items2D
        .slice(0, -1)
        .map((items) => Number(items[index]));

      return [
        ...acc,
        {
          sign: lineSign,
          values: allItemsExpectLast,
        },
      ];
    },
    []
  );

  return lines;
};

export const extractFrom2DRightToLeft: ExtractFrom2DStrategy = (items2D) => {
  if (items2D.length === 0) {
    return [];
  }

  return [];
};

export const getMathWorksheetSolutions = (
  inputContent: string,
  extractFrom2DArrayStrategy: ExtractFrom2DStrategy
) => {
  validatePuzzleInput(inputContent);

  const items = getItemsFromSeparator(inputContent, " ");
  const lines = extractFrom2DArrayStrategy(items);

  const mathWorksheetSolutions = lines.map(({ sign, values }) => {
    switch (sign) {
      case "*":
        return multiply(values);
      case "+":
        return sum(values);

      default:
        throw new Error(`Not supported sign '${sign}'`);
    }
  });

  return mathWorksheetSolutions;
};
