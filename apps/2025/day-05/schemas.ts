import { z } from "zod";

export const CHAR_SEPARATOR = "\n\n";
export const LINE_SEPARATOR = "\n";

export const IntervalSchema = z.object({
  min: z.number().positive(),
  max: z.number().positive(),
});
export type Interval = z.infer<typeof IntervalSchema>;
