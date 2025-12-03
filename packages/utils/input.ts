import fs from "fs";
import path from "path";

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
