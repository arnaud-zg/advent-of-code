import path from "node:path";

type Day = 1;
type Year = 2023;

type PuzzleConfig = {
  day: Day;
  year: Year;
};

export const getPuzzleInputPath = ({ day, year }: PuzzleConfig) => {
  return {
    puzzleInputPath: path.join(
      __dirname,
      "src",
      `${year}`,
      `${day}`.padStart(2, "0"),
      "input.txt",
    ),
  };
};
