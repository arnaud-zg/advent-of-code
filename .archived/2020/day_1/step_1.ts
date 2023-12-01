import * as fs from "fs";
import { getData } from './utils'

const inputRaw = fs.readFileSync("input.txt", "utf8");

const solvePuzzle = ({
  data,
  sumResult,
}: {
  data: ReturnType<typeof getData>;
  sumResult: number;
}) => {
  for (let x of data) {
    for (let y of data) {
      if (x + y === sumResult) {
        return x * y;
      }
    }
  }
};

console.log(solvePuzzle({ data: getData({ inputRaw }), sumResult: 2020 }));
