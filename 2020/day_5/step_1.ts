import * as fs from "fs";
import {
  convertColumnsToBinary,
  convertRowsToBinary,
  getBinaryFromDecimal,
  getData,
  getSeatId
} from "./utils";

const inputRaw = fs.readFileSync("input.txt", "utf8");

const solvePuzzle = ({ data }: { data: ReturnType<typeof getData> }) => {
  const enhancedData = data.map((item) => {
    const seatX = getBinaryFromDecimal({
      binary: convertColumnsToBinary({ columns: item.columns }),
    });
    const seatY = getBinaryFromDecimal({
      binary: convertRowsToBinary({ rows: item.rows }),
    });

    return {
      ...item,
      seatId: getSeatId({ x: seatX, y: seatY }),
    };
  });

  return Math.max(...enhancedData.map(({ seatId }) => seatId));
};

console.log(
  solvePuzzle({
    data: getData({ inputRaw }),
  })
);
