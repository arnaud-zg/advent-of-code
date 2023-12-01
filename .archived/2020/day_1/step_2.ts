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
      for (let z of data) {
        if (x + y + z === sumResult) {
          return x * y * z;
        }
      }
    }
  }
};

console.log(solvePuzzle({ data: getData({ inputRaw }), sumResult: 2020 }));
