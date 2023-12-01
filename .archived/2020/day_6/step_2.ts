import * as fs from "fs";
import { getData } from "./utils";

const inputRaw = fs.readFileSync("input.txt", "utf8");

const getIntersect = (...arrays: string[]) => {
  const referenceItem = [...new Set(arrays[0])];
  const intersect = arrays.reduce((acc, itemToCompare) => {
    const setItemToCompare = new Set(itemToCompare);

    return acc.filter((x) => setItemToCompare.has(x));
  }, referenceItem);

  return new Set(intersect)
};

const solvePuzzle = ({ data }: { data: ReturnType<typeof getData> }) => {
  let groupAnswers = new Set<string>();
  let count = 0;

  data.forEach((line, index, array) => {
    const isLastItem = index === array.length - 1;

    if (line === "" || isLastItem) {
      if (isLastItem) {
        groupAnswers.add(line);
      }

      const intersectItems = getIntersect(...groupAnswers);

      count += intersectItems.size;
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
