import * as fs from "fs";
import { getData } from "./utils";

const inputRaw = fs.readFileSync("input.txt", "utf8");

const solvePuzzle = ({ data }: { data: ReturnType<typeof getData> }) =>
  data.filter(({ policy: { max, min }, letter, corruptedPassword }) => {
    const mapCount = new Map();

    corruptedPassword.split("").forEach((character) => {
      mapCount.set(character, (mapCount.get(character) || 0) + 1);
    });

    const letterOccurs = mapCount.get(letter);

    return min <= letterOccurs && max >= letterOccurs;
  }).length;

console.log(solvePuzzle({ data: getData({ inputRaw }) }));
