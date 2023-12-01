import { log } from "console";
import * as fs from "fs";
import { getData } from "./utils";

const inputRaw = fs.readFileSync("input.txt", "utf8");
const NO_RESTRICTION_BUS = "x";

const getBusIds = ({ input }: { input: string }) =>
  input
    .split(",")
    .reduce<{ id: number; index: number }[]>(
      (acc, item, index) => [
        ...acc,
        ...(!acc.find(({ id }) => id === Number(item)) &&
        item !== NO_RESTRICTION_BUS
          ? [{ id: Number(item), index }]
          : []),
      ],
      []
    );

const getNextTimestampMatches = ({
  timestamp,
  busId,
  nextBus,
}: {
  timestamp: number;
  busId: number;
  nextBus: { index: number; id: number };
}) => {
  let matches = [];

  for (; matches.length < 2; ) {
    timestamp += busId;
    if ((timestamp + nextBus.index) % nextBus.id === 0) {
      matches.push(timestamp);
    }
  }

  return matches;
};

const solvePuzzle = ({ data }: { data: ReturnType<typeof getData> }) => {
  const busIdsWithIndex = getBusIds({ input: data[1] });
  const matchSeq = busIdsWithIndex.reduce<number[]>(
    (acc, nextBus) => {
      const [timestamp, busId] = acc;
      const timestampMatches = getNextTimestampMatches({
        timestamp,
        busId,
        nextBus,
      });

      return [timestampMatches[0], timestampMatches[1] - timestampMatches[0]];
    },
    [0, busIdsWithIndex[0].id]
  );

  return matchSeq[0];
};

console.log(
  solvePuzzle({
    data: getData({ inputRaw }),
  })
);
