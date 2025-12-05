import { z } from "zod";
import { IntervalSchema, LINE_SEPARATOR, type Interval } from "./schemas";

const parseIntervalLine = (line: string): Interval => {
  const [minRaw, maxRaw] = line.split("-");

  if (!minRaw || !maxRaw) {
    throw new Error(`Interval must define both min and max: ${line}`);
  }

  const min = Number(minRaw);
  const max = Number(maxRaw);

  IntervalSchema.parse({ min, max });

  return { min, max };
};

export const parseIntervals = z
  .string()
  .transform((value) =>
    value.trim().split(LINE_SEPARATOR).map(parseIntervalLine)
  );

const parseIngredientIdLine = (line: string) => {
  const ingredientId = Number(line);

  if (Number.isNaN(ingredientId)) {
    throw new Error(`Invalid ingredient id: ${line}`);
  }

  return ingredientId;
};

export const ingredientIdListParser = z
  .string()
  .transform((value) =>
    value.trim().split(LINE_SEPARATOR).map(parseIngredientIdLine)
  );
