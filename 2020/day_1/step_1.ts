import * as fs from "fs";

type Data = number[];

const inputRaw = fs.readFileSync("input.txt", "utf8");

const getData = ({ inputRaw }: { inputRaw: string }) =>
  inputRaw.split("\n").map((value) => Number(value));

const solvePuzzle = ({
  data,
  sumResult,
}: {
  data: Data;
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
