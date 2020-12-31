type Step11Data = string[];

export const getData = ({ inputRaw }: { inputRaw: string }): Step11Data =>
  inputRaw.split("\n");

export const MATRIX: Position[] = [
  { x: -1, y: 0 }, // ⬅️
  { x: -1, y: 1 }, // ↖️
  { x: 0, y: 1 }, // ⬆️
  { x: 1, y: 1 }, // ↗️
  { x: 1, y: 0 }, // ➡️
  { x: 1, y: -1 }, // ↘️
  { x: 0, y: -1 }, // ⬇️
  { x: -1, y: -1 }, // ↙️
];

export enum CellType {
  Floor = ".",
  Free = "L",
  Occupied = "#",
}

export interface Position {
  x: number;
  y: number;
}
