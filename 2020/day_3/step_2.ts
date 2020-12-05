import * as fs from "fs";
import { getData } from "./utils";

const inputRaw = fs.readFileSync("input.txt", "utf8");

const solvePuzzle = ({
  data,
  movePosition: { x: movePositionX, y: movePositionY },
  treeChar,
}: {
  data: ReturnType<typeof getData>;
  movePosition: { x: number; y: number };
  treeChar: string;
}) => {
  let treeOccurs = 0;
  let position = 0;

  for (let y = 0; y < data.length; y += movePositionY) {
    if (data[y][position % data[y].length] === treeChar) {
      treeOccurs++;
    }
    position += movePositionX;
  }

  return treeOccurs;
};

console.log(
  solvePuzzle({
    data: getData({ inputRaw }),
    movePosition: { x: 1, y: 1 },
    treeChar: "#",
  }) *
    solvePuzzle({
      data: getData({ inputRaw }),
      movePosition: { x: 3, y: 1 },
      treeChar: "#",
    }) *
    solvePuzzle({
      data: getData({ inputRaw }),
      movePosition: { x: 5, y: 1 },
      treeChar: "#",
    }) *
    solvePuzzle({
      data: getData({ inputRaw }),
      movePosition: { x: 7, y: 1 },
      treeChar: "#",
    }) *
    solvePuzzle({
      data: getData({ inputRaw }),
      movePosition: { x: 1, y: 2 },
      treeChar: "#",
    })
);
