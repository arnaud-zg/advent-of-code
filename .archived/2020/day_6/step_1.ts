import * as fs from "fs";
import { getData } from "./utils";

const inputRaw = fs.readFileSync("input.txt", "utf8");

const getUnique = (...arrays: string[]) =>  new Set(arrays.reduce((acc, item) => `${acc}${item}`, ''))

const solvePuzzle = ({ data }: { data: ReturnType<typeof getData> }) => {
  let groupAnswers = new Set<string>();
  let count = 0;

  data.forEach((line, index, array) => {
    const isLastItem = index === array.length - 1;

    if (line === "" || isLastItem) {
      if (isLastItem) {
        groupAnswers.add(line);
      }

      const uniqueItems = getUnique(...groupAnswers);

      count += uniqueItems.size;
      groupAnswers = new Set();
    } else {
      groupAnswers.add(line);
    }
  });

  return count;
};

console.log(
  solvePuzzle({
    data: getData({ inputRaw }),
  })
);
