import * as fs from "fs";
import { getData } from "./utils";

const inputRaw = fs.readFileSync("input.txt", "utf8");

const solvePuzzle = ({ data }: { data: ReturnType<typeof getData> }) =>
  data.filter(
    ({ policy: { max, min }, letter, corruptedPassword }) =>
      (corruptedPassword[min - 1] === letter &&
        corruptedPassword[max - 1] !== letter) ||
      (corruptedPassword[min - 1] !== letter &&
        corruptedPassword[max - 1] === letter)
  ).length;

console.log(solvePuzzle({ data: getData({ inputRaw }) }));
