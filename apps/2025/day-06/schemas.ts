import {
  getItemsFromSeparator,
  multiply,
  sum,
  validatePuzzleInput,
} from "@advent-of-code/utils";
import { z } from "zod";

export const LineSignSchema = z.enum(["+", "*"]);
export type LineSign = z.infer<typeof LineSignSchema>;

export const LineSchema = z.object({
  sign: LineSignSchema,
  values: z.number().array(),
});
export type Line = z.infer<typeof LineSchema>;
