import { z } from "zod";

export const yearSchema = z
  .string()
  .regex(/^\d{4}$/, "Year must be a 4-digit number");

export const MAX_DAYS = 12;
export const FULL_SCORE = 1.0;
export const PARTIAL_SCORE = 0.5;
export const NO_SCORE = 0.0;
