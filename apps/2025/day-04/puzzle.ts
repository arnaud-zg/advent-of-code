import { z } from "zod";

const CHAR_ROLL_OF_PAPER = "@";
const CHAR_ACCESSIBLE_ROLL_OF_PAPER = "x";

const DIRECTION: Array<[number, number]> = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const LineSchema = z.string().min(1, "Line length is invalid").trim();

const getNeighborCells = (lines: string[], x: number, y: number) => {
  return DIRECTION.flatMap((directionItem) => {
    const [directionX, directionY] = directionItem;
    const nextDirectionX = x + directionX;
    const nextDirectionY = y + directionY;

    if (nextDirectionY < 0 || nextDirectionY >= lines.length) {
      return [];
    }

    if (nextDirectionX < 0 || nextDirectionX >= lines[0]!.length) {
      return [];
    }

    return [lines[nextDirectionY]![nextDirectionX]];
  });
};

export const markAccessibleRollDiagram = (lines: string[]): string[] => {
  let nextLines: string[] = [];
  let nbAccessibleRoll = 0;

  for (let y = 0; y < lines.length; y++) {
    const currentLine = LineSchema.parse(lines[y]);
    const nextLine = currentLine
      .split("")
      .map((cell, x) => {
        const neighborCells = getNeighborCells(lines, x, y);

        if (
          lines[y]![x] === CHAR_ROLL_OF_PAPER &&
          neighborCells.filter((cell) => cell === CHAR_ROLL_OF_PAPER).length < 4
        ) {
          nbAccessibleRoll++;

          return CHAR_ACCESSIBLE_ROLL_OF_PAPER;
        }

        return cell;
      })
      .join("");

    nextLines.push(nextLine);
  }

  return nextLines;
};

export const countAccessibleRollDiagram = (lines: string[]): number => {
  const oneLine = lines.join("");

  return (oneLine.match(new RegExp(CHAR_ACCESSIBLE_ROLL_OF_PAPER, "g")) ?? [])
    .length;
};

const diagramsAreEqual = (diagramA: string[], diagramB: string[]) => {
  return diagramA.every((line, index) => line === diagramB[index]);
};

export const markTotalAccessibleRollDiagram = (lines: string[]): string[] => {
  let diagram: string[] = lines;

  while (true) {
    const markedDiagram = markAccessibleRollDiagram(diagram);

    if (diagramsAreEqual(diagram, markedDiagram)) {
      return diagram;
    }

    const nbAccessibleRoll = countAccessibleRollDiagram(markedDiagram);

    if (nbAccessibleRoll === 0) {
      return diagram;
    }

    diagram = markedDiagram;
  }
};
