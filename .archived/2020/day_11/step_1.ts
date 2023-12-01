import * as fs from "fs";
import { CellType, getData, MATRIX, Position } from "./utils";

const inputRaw = fs.readFileSync("input.txt", "utf8");

const getNeighborsSeatsType = ({
  map,
  lineIndex,
  seatIndex,
}: {
  map: string[];
  lineIndex: number;
  seatIndex: number;
}) => {
  const neighborsSeatsType = new Map<CellType, Position[]>();

  for (const { x, y } of MATRIX) {
    const nextY = lineIndex + y;
    const nextX = seatIndex + x;
    const nextCell =
      map[nextY] && map[nextY][nextX]
        ? (map[nextY][nextX] as CellType)
        : undefined;

    if (nextCell) {
      const lastNeighborsSeatsType = neighborsSeatsType.get(nextCell) || [];

      neighborsSeatsType.set(nextCell, [
        ...lastNeighborsSeatsType,
        { x: nextX, y: nextY },
      ]);
    }
  }

  return neighborsSeatsType;
};

const shouldTakeSeat = ({
  map,
  lineIndex,
  seatIndex,
}: {
  map: string[];
  lineIndex: number;
  seatIndex: number;
}) =>
  map[lineIndex][seatIndex] === CellType.Free &&
  !getNeighborsSeatsType({
    map,
    lineIndex,
    seatIndex,
  }).has(CellType.Occupied);

const shouldFreeSeat = ({
  map,
  lineIndex,
  seatIndex,
  occurenceThreshold,
}: {
  map: string[];
  lineIndex: number;
  seatIndex: number;
  occurenceThreshold: number;
}) =>
  map[lineIndex][seatIndex] === CellType.Occupied &&
  (
    getNeighborsSeatsType({
      map,
      lineIndex,
      seatIndex,
    }).get(CellType.Occupied) || []
  ).length >= occurenceThreshold;

const shouldSkip = ({ line, seatIndex }: { line: string; seatIndex: number }) =>
  line[seatIndex] === CellType.Floor;

const mutateSeatsMap = ({
  data,
  occurenceThreshold,
}: {
  data: ReturnType<typeof getData>;
  occurenceThreshold: number;
}) => {
  return data.map((line, lineIndex) => {
    let splittedNextLine = line.split("");
    const lineUpdateMap = new Map<number, string>();

    for (let seatIndex = 0; seatIndex <= line.length - 1; seatIndex++) {
      if (shouldSkip({ line, seatIndex })) {
        continue;
      } else if (shouldTakeSeat({ lineIndex, map: data, seatIndex })) {
        lineUpdateMap.set(seatIndex, CellType.Occupied);
      } else if (
        shouldFreeSeat({ lineIndex, map: data, seatIndex, occurenceThreshold })
      ) {
        lineUpdateMap.set(seatIndex, CellType.Free);
      }
    }

    for (const [index, value] of lineUpdateMap.entries()) {
      splittedNextLine.splice(index, 1, value);
    }

    return splittedNextLine.join("");
  });
};

const solvePuzzle = ({
  data,
  occurenceThreshold,
}: {
  data: ReturnType<typeof getData>;
  occurenceThreshold: number;
}) => {
  let lastMap = null;
  let nextMap = data;

  for (; JSON.stringify(lastMap) !== JSON.stringify(nextMap); ) {
    lastMap = nextMap;
    nextMap = mutateSeatsMap({ data: nextMap, occurenceThreshold });
  }

  const nbOccupiedSeats = nextMap
    .join("")
    .split("")
    .filter((char) => char === CellType.Occupied).length;

  return nbOccupiedSeats;
};

console.log(
  solvePuzzle({
    data: getData({ inputRaw }),
    occurenceThreshold: 4,
  })
);
