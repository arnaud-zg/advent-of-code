import fs from "node:fs";
import { ErrorWhileParsing } from "./errors";
import { FileData, Lines } from "./types";

export const parseFile = ({
  filePath,
}: {
  filePath: string;
}): { fileData: FileData } => {
  try {
    const fileData = fs.readFileSync(filePath, "utf8");

    return { fileData };
  } catch (err) {
    throw new ErrorWhileParsing(
      `A problem occurred while parsing the file ${filePath}`,
    );
  }
};

export const getLines = ({
  fileData,
}: {
  fileData: FileData;
}): { lines: Lines } => ({
  lines: fileData.split("\n"),
});
