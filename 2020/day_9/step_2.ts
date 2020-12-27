import * as fs from "fs";
import { getData } from "./utils";

const inputRaw = fs.readFileSync("input.txt", "utf8");

const sum = (values: number[]) => values.reduce((acc, value) => acc + value, 0);

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
    let index = preamble;
    index <= data.length - 1;
    index++
  ) {
    const slicedData = data.slice(index - preamble, index);
    const combinations = getCombinationsForData({ data: slicedData });
    let isValid = false;

    for (let { values } of combinations.values()) {
      if (values[0] + values[1] === data[index]) {
        isValid = true;
        break;
      }
    }

    if (!isValid) {
      return index;
    }
  }

  return -1;
};

const findEncryptionWeakness = ({
  data,
  gap = 2,
  invalidNumber,
}: {
  data: ReturnType<typeof getData>;
  gap?: number;
  invalidNumber: number;
}) => {
  for (let start = 0, end = gap; start !== data.length - gap; ) {
    const slicedData = data.slice(start, end);
    const sumValues = sum(slicedData);

    if (sumValues === invalidNumber) {
      return Math.min(...slicedData) + Math.max(...slicedData);
    } else if (end === data.length - 1) {
      start++;
      end = start + gap;
    } else {
      end++;
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
    const encryptionWeakness = findEncryptionWeakness({
      invalidNumber: data[invalidLine],
      data,
    });

    return encryptionWeakness;
  }
};

console.log(
  solvePuzzle({
    data: getData({ inputRaw }),
  })
);
