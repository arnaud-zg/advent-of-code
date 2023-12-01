import * as fs from "fs";
import { getData } from "./utils";

const inputRaw = fs.readFileSync("input.txt", "utf8");

const getCombinationsForData = ({
  data,
}: {
  data: ReturnType<typeof getData>;
}) => {
  const combinations = new Map<string, { values: number[] }>();

  for (let i = 0; i < data.length - 1; i++) {
    for (let j = i + 1; j < data.length; j++) {
      const values = [Number(data[i]), Number(data[j])];

      combinations.set(`${data[i]},${data[j]}`, { values });
    }
  }

  return combinations;
};

const findInvalidLine = ({
  data,
  preamble,
}: {
  data: ReturnType<typeof getData>;
  preamble: number;
}) => {
  for (
    let preambleIndex = preamble;
    preambleIndex <= data.length - 1;
    preambleIndex++
  ) {
    const slicedData = data.slice(preambleIndex - preamble, preambleIndex);
    const combinations = getCombinationsForData({ data: slicedData });
    let isValid = false;

    for (let { values } of combinations.values()) {
      if (values[0] + values[1] === data[preambleIndex]) {
        isValid = true;
        break;
      }
    }

    if (!isValid) {
      return preambleIndex;
    }
  }

  return -1;
};

const solvePuzzle = ({
  data,
  preamble = 25,
}: {
  data: ReturnType<typeof getData>;
  preamble?: number;
}) => {
  const invalidLine = findInvalidLine({ data, preamble });

  if (invalidLine > 0) {
    return data[invalidLine];
  }
};

console.log(
  solvePuzzle({
    data: getData({ inputRaw }),
  })
);
