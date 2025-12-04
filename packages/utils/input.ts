import fs from "fs";
import path from "path";
import { z, ZodError } from "zod";

export const readInput = (
  year: number,
  day: number,
  fileName: string = "input.txt"
) => {
  const filePath = path.resolve(
    `./apps/${year}/day-${day.toString().padStart(2, "0")}/${fileName}`
  );

  return fs.readFileSync(filePath, "utf-8").trim();
};

export const readDigits = (line: string) => {
  const digits = line
    .trim()
    .split("")
    .map((item) => Number(item));

  return digits;
};

export const getLinesFromInput = (inputContent: string) => {
  return inputContent.split("\n");
};

export const getItemsFromSeparator = (
  inputContent: string,
  separator: string = ","
) => {
  const lines = getLinesFromInput(inputContent);
  const items = lines.flatMap((line) => line.split(separator)).filter(Boolean);

  return items;
};

export const validatePuzzleInput = (inputContent: string): string => {
  const inputSchema = z.string().min(1, `Input is required`).trim();

  try {
    return inputSchema.parse(inputContent);
  } catch (err) {
    if (err instanceof ZodError) {
      console.error(
        `❌ Input is empty. Please update it before starting the challenge.`
      );
      process.exit(1);
    }

    throw err;
  }
};
