import * as fs from "fs";
import { getData } from "./utils";

const inputRaw = fs.readFileSync("input.txt", "utf8");

const sort = <T extends number>(values: T[]) => values.sort((a, b) => a - b);

const getAdapter = ({ data }: { data: ReturnType<typeof getData> }) => {
  const adapter: [number, number, number] = [0, 0, 0];
  for (let i = 1; i <= data.length - 1; i++) {
    const differenceJoltage = data[i] - data[i - 1];

    adapter[differenceJoltage - 1]++;
  }

  return adapter;
};

const solvePuzzle = ({ data }: { data: ReturnType<typeof getData> }) => {
  const maxValue = Math.max(...data);
  const adapter = getAdapter({ data: sort([...data, 0, maxValue + 3]) });

  return adapter[0] * adapter[2];
};

console.log(
  solvePuzzle({
    data: getData({ inputRaw }),
  })
);
