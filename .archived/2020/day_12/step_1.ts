import * as fs from "fs";
import {
  getData,
  Instruction,
  MATRIX_ORIENTATION_MAP,
  Move,
  Orientation,
  Position,
  RegexInstruction,
  ROTATE_ORIENTATION_ORDER
} from "./utils";

const inputRaw = fs.readFileSync("input.txt", "utf8");

type ItemHistory = {
  deltaPosition: Position;
  instruction: Instruction;
  orientation: Orientation;
  position: Position;
};

const moveShip = ({
  instruction,
  lastItemHistory: { position: lastPosition, orientation: lastOrientation },
  orientation,
}: {
  instruction: Instruction;
  lastItemHistory: ItemHistory;
  orientation: Orientation;
}): ItemHistory => {
  const deltaPosition = MATRIX_ORIENTATION_MAP[orientation];

  return {
    deltaPosition,
    instruction,
    orientation: lastOrientation,
    position: {
      x: lastPosition.x + deltaPosition.x * instruction.value,
      y: lastPosition.y + deltaPosition.y * instruction.value,
    },
  };
};

const turnShip = ({
  instruction,
  move,
  lastItemHistory: { orientation: lastOrientation, position: lastPosition },
}: {
  instruction: Instruction;
  move: Move;
  lastItemHistory: ItemHistory;
}): ItemHistory => {
  const currentRotateIndex = ROTATE_ORIENTATION_ORDER.findIndex(
    (orientation) => orientation === lastOrientation
  );
  const lookingForwardIndex =
    move === "R" ? instruction.value / 90 : (360 - instruction.value) / 90;
  const nextRotateIndex =
    (currentRotateIndex + lookingForwardIndex) %
    ROTATE_ORIENTATION_ORDER.length;
  const deltaPosition =
    MATRIX_ORIENTATION_MAP[ROTATE_ORIENTATION_ORDER[nextRotateIndex]];

  return {
    deltaPosition,
    instruction,
    orientation: ROTATE_ORIENTATION_ORDER[nextRotateIndex],
    position: lastPosition,
  };
};

const solvePuzzle = ({
  data,
  initialValues: {
    orientation: initialOrientation,
    position: initialPosition,
    deltaPosition: initialDeltaPosition = { x: 1, y: 1 },
  },
}: {
  data: ReturnType<typeof getData>;
  initialValues: {
    orientation: Orientation;
    position: Position;
    deltaPosition?: Position;
  };
}) => {
  const shipHistory = data.reduce<ItemHistory[]>((acc, line) => {
    const [, instructionType, instructionValueRaw] =
      line.match(RegexInstruction) || [];
    const instruction = {
      type: instructionType as Instruction["type"],
      value: Number(instructionValueRaw),
    };
    const lastItemOrDefault = acc[acc.length - 1] || {
      deltaPosition: initialDeltaPosition,
      orientation: initialOrientation,
      position: initialPosition,
    };

    switch (instruction.type) {
      case "N":
      case "S":
      case "E":
      case "W":
        return acc.concat(
          moveShip({
            orientation: instruction.type,
            instruction,
            lastItemHistory: lastItemOrDefault,
          })
        );
      case "F":
        return acc.concat(
          moveShip({
            orientation: lastItemOrDefault.orientation,
            instruction,
            lastItemHistory: lastItemOrDefault,
          })
        );
      case "L":
      case "R":
        return acc.concat(
          turnShip({
            instruction,
            move: instruction.type,
            lastItemHistory: lastItemOrDefault,
          })
        );
      default:
        return acc.concat({
          ...lastItemOrDefault,
          instruction,
        });
    }
  }, []);

  const {
    position: { x, y },
  } = shipHistory[shipHistory.length - 1];

  return Math.abs(x) + Math.abs(y);
};

console.log(
  solvePuzzle({
    data: getData({ inputRaw }),
    initialValues: {
      orientation: "E",
      position: { x: 0, y: 0 },
    },
  })
);
