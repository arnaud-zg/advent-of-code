import * as fs from "fs";
import {
  convertColumnsToBinary,
  convertRowsToBinary,
  getBinaryFromDecimal,
  getData,
  getSeatId
} from "./utils";

type SeatsById = Map<string, boolean>;

const inputRaw = fs.readFileSync("input.txt", "utf8");

const findEmptySeats = ({
  findFirst = false,
  seatsById,
}: {
  findFirst?: boolean;
  seatsById: SeatsById;
}) => {
  const emptySeats: { x: number; y: number }[] = [];

  for (let y = 0; y <= 127; y++) {
    for (let x = 0; x <= 7; x++) {
      if (
        !seatsById.has(`${y},${x}`) &&
        seatsById.has(`${y},${x - 1}`) &&
        seatsById.has(`${y},${x + 1}`)
      ) {
        if (findFirst) {
          return [{ x, y }];
        }

        emptySeats.push({ x, y });
      }
    }
  }

  return emptySeats;
};

const solvePuzzle = ({ data }: { data: ReturnType<typeof getData> }) => {
  const seatsById: SeatsById = new Map();

  data.forEach((item) => {
    const seatX = getBinaryFromDecimal({
      binary: convertColumnsToBinary({ columns: item.columns }),
    });
    const seatY = getBinaryFromDecimal({
      binary: convertRowsToBinary({ rows: item.rows }),
    });

    seatsById.set(`${seatY},${seatX}`, true);
  });

  return getSeatId(findEmptySeats({ findFirst: true, seatsById })[0]);
};

console.log(
  solvePuzzle({
    data: getData({ inputRaw }),
  })
);
