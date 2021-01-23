import * as fs from "fs";
import { getData } from "./utils";

const inputRaw = fs.readFileSync("input.txt", "utf8");

const OUT_OF_SERVICE = "x";

const getClosestNextBusDeparture = ({
  busId,
  startDate,
}: {
  busId: number;
  startDate: number;
}) => busId * Math.round(startDate / busId);

const getClosestNumber = ({ goal, list }: { goal: number; list: number[] }) =>
  list.find((item) => item >= goal) || 0;

const solvePuzzle = ({ data }: { data: ReturnType<typeof getData> }) => {
  const startDate = Number(data[0]);
  const busIds = data[1]
    .split(",")
    .reduce<number[]>(
      (acc, item) => [
        ...acc,
        ...(!acc.includes(Number(item)) && OUT_OF_SERVICE !== item
          ? [Number(item)]
          : []),
      ],
      []
    );
  const timetable = busIds.reduce<{ [time: number]: number[] }>(
    (acc, busId) => {
      const time = getClosestNextBusDeparture({ busId, startDate });

      acc[time] = [...(acc[time] || []), busId];
      return acc
    },
    {}
  );
  const nextDeparture = getClosestNumber({
    goal: startDate,
    list: Object.keys(timetable).map((item) => Number(item)),
  });
  const waitingTimeInMn = nextDeparture - startDate;

  return waitingTimeInMn * timetable[nextDeparture][0];
};

console.log(
  solvePuzzle({
    data: getData({ inputRaw }),
  })
);
