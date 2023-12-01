import * as fs from "fs";
import { getData } from "./utils";

const inputRaw = fs.readFileSync("input.txt", "utf8");

const SWITCH_MAP: Record<string, string> = {
  jmp: "nop",
  nop: "jmp",
};

const browseAndGetAccumulator = ({
  data,
}: {
  data: ReturnType<typeof getData>;
}) => {
  const history = new Map<number, boolean>();
  let index = 0;
  let accumulator = 0;

  while (!history.get(index)) {
    const hasArrivedAtEnd = index >= data.length;

    if (hasArrivedAtEnd) {
      return accumulator;
    }

    const splittedData = data[index].split(" ");
    const operationType = splittedData[0];
    const operationValue = parseInt(splittedData[1], 10);

    history.set(index, true);

    if (operationType === "acc") {
      accumulator += operationValue;
      index++;
    } else if (operationType === "jmp") {
      index += operationValue;
    } else if (operationType === "nop") {
      index++;
    }
  }

  return -1;
};

const solvePuzzle = ({ data }: { data: ReturnType<typeof getData> }) => {
  for (let index = 0; index <= data.length - 1; index++) {
    const splittedData = data[index].split(" ");
    const operationType = splittedData[0];
    const operationValue = parseInt(splittedData[1], 10);

    if (["nop", "jmp"].includes(operationType)) {
      const nextData = [...data];

      nextData.splice(
        index,
        1,
        `${SWITCH_MAP[operationType]} ${operationValue}`
      );

      const accumulatorResult = browseAndGetAccumulator({ data: nextData });

      if (accumulatorResult > 0) {
          return accumulatorResult
      }
    }
  }
};

console.log(
  solvePuzzle({
    data: getData({ inputRaw }),
  })
);
