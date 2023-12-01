import * as fs from "fs";
import { getData } from "./utils";

const inputRaw = fs.readFileSync("input.txt", "utf8");

const browseAndGetAccumulator = ({
  data,
}: {
  data: ReturnType<typeof getData>;
}) => {
  const history = new Map<number, boolean>();
  let index = 0;
  let accumulator = 0;

  while (!history.get(index)) {
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

  return accumulator;
};

const solvePuzzle = ({ data }: { data: ReturnType<typeof getData> }) =>
  browseAndGetAccumulator({ data });

console.log(
  solvePuzzle({
    data: getData({ inputRaw }),
  })
);
