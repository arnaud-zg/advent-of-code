import * as fs from "fs";
import { getData } from "./utils";

const inputRaw = fs.readFileSync("input.txt", "utf8");

const solvePuzzle = ({ data }: { data: ReturnType<typeof getData> }) =>
  data.filter(
    (passportInfo) =>
      passportInfo.byr &&
      passportInfo.ecl &&
      passportInfo.eyr &&
      passportInfo.hcl &&
      passportInfo.hgt &&
      passportInfo.iyr &&
      passportInfo.pid
  ).length;

console.log(
  solvePuzzle({
    data: getData({ inputRaw }),
  })
);
