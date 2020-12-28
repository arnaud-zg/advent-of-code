import * as fs from "fs";
import { getData } from "./utils";

const inputRaw = fs.readFileSync("input.txt", "utf8");

const sort = <T extends number>(values: T[]) => values.sort((a, b) => a - b);

const getNbArrangements = ({
  data,
  history = new Map<number, number>(),
  index = 0,
}: {
  data: ReturnType<typeof getData>;
  history?: Map<number, number>;
  index?: number;
}) => {
  if (history.has(index)) {
    const value = history.get(index);

    if (value) {
      return value;
    }
  } else if (index === data.length - 1) {
    return 1;
  }

  let nbArrangements = 0;

  for (let j = index + 1; j <= data.length - 1; j++) {
    const diff = data[j] - data[index];

    if (diff <= 3) {
      nbArrangements += getNbArrangements({ data, history, index: j });
    }
  }

  history.set(index, nbArrangements);

  return nbArrangements;
};

const solvePuzzle = ({ data }: { data: ReturnType<typeof getData> }) => {
  const maxValue = Math.max(...data);
  const nbArrangements = getNbArrangements({
    data: sort([...data, 0, maxValue + 3]),
  });

  return nbArrangements;
};

console.log(
  solvePuzzle({
    data: getData({ inputRaw }),
  })
);
