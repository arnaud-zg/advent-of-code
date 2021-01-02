type Step12Data = string[];

export const RegexInstruction = /(\w)(\d+)/;

export const getData = ({ inputRaw }: { inputRaw: string }): Step12Data =>
  inputRaw.split("\n");

export const MATRIX_ORIENTATION_MAP: { [key: string]: Position } = {
  N: { x: 0, y: 1 }, // ⬆️
  S: { x: 0, y: -1 }, // ⬇️
  E: { x: 1, y: 0 }, // ➡️
  W: { x: -1, y: 0 }, // ⬅️
};

export const MATRIX_TURN_FUNC: {
  [key: string]: (position: Position) => Position;
} = {
  S: ({ x, y }) => ({ x: -x, y: -y }), // ⬇️
  E: ({ x, y }) => ({ x: y, y: -x }), // ⬅️
  W: ({ x, y }) => ({ x: -y, y: x }), // ➡️
};

export const ROTATE_ORIENTATION_ORDER: Orientation[] = ["N", "E", "S", "W"];

type InstructionType = Orientation | Move;

export type Instruction = {
  type: InstructionType;
  value: number;
};

export type Move = "L" | "R" | "F";

export type Orientation = "N" | "S" | "E" | "W";

export interface Position {
  x: number;
  y: number;
}
