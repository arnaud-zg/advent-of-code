import { getLinesFromInput, readDigits } from "@advent-of-code/utils";
import { z } from "zod";

const PositiveNumberSchema = z
  .number({ error: "Number must be positive" })
  .positive();

const findMaxKDigits = (line: string, k: number) => {
  const kNum = PositiveNumberSchema.parse(k);
  const digits = readDigits(line);
  const lineLength = line.length;

  let digitToRemove = lineLength - kNum;
  let stack: number[] = [];

  for (const digit of digits) {
    while (digitToRemove > 0 && stack[stack.length - 1]! < digit) {
      stack.pop();
      digitToRemove--;
    }

    stack.push(digit);
  }

  const result = stack.slice(0, k).join("");

  return Number(result);
};

export const getMaxKJoltageList = (inputContent: string, k: number) => {
  const lines = getLinesFromInput(inputContent);

  const maxJoltageList = lines.map((line) => findMaxKDigits(line, k));

  return maxJoltageList;
};
