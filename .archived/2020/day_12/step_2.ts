import * as fs from "fs";
import {
  getData,
  Instruction,
  MATRIX_ORIENTATION_MAP,
  MATRIX_TURN_FUNC,
  Move,
  Orientation,
  Position,
  RegexInstruction,
  ROTATE_ORIENTATION_ORDER,
} from "./utils";

const inputRaw = fs.readFileSync("input.txt", "utf8");

type ItemHistory = {
  deltaPosition: Position;
  instruction: Instruction;
  position: Position;
};

const moveShip = ({
  instruction,
  orientation,
  lastItemHistory: { position: lastPosition, deltaPosition: lastDeltaPosition },
}: {
  instruction: Instruction;
  orientation: Orientation;
  lastItemHistory: ItemHistory;
}): ItemHistory => {
  const deltaPosition = MATRIX_ORIENTATION_MAP[orientation];

  return {
    deltaPosition: {
      x: lastDeltaPosition.x + deltaPosition.x * instruction.value,
      y: lastDeltaPosition.y + deltaPosition.y * instruction.value,
    },
    instruction,
    position: lastPosition,
  };
};

const moveShipForward = ({
  instruction,
  lastItemHistory: { position: lastPosition, deltaPosition: lastDeltaPosition },
}: {
  instruction: Instruction;
  lastItemHistory: ItemHistory;
}): ItemHistory => {
  return {
    deltaPosition: lastDeltaPosition,
    instruction,
    position: {
      x: lastPosition.x + lastDeltaPosition.x * instruction.value,
      y: lastPosition.y + lastDeltaPosition.y * instruction.value,
    },
  };
};

const turnShip = ({
  instruction,
  move,
  lastItemHistory: { deltaPosition: lastDeltaPosition, position: lastPosition },
}: {
  instruction: Instruction;
  move: Move;
  lastItemHistory: ItemHistory;
}): ItemHistory => {
  const lookingForwardIndex =
    move === "R" ? instruction.value / 90 : (360 - instruction.value) / 90;
  const nextRotateIndex = lookingForwardIndex % ROTATE_ORIENTATION_ORDER.length;
  const deltaPosition = MATRIX_TURN_FUNC[
    ROTATE_ORIENTATION_ORDER[nextRotateIndex]
  ](lastDeltaPosition);

  return {
    deltaPosition,
    instruction,
    position: lastPosition,
  };
};

const solvePuzzle = ({
  data,
  initialValues: {
    position: initialPosition,
    deltaPosition: initialDeltaPosition,
  },
}: {
  data: ReturnType<typeof getData>;
  initialValues: {
    position: Position;
    deltaPosition: Position;
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
      position: initialPosition,
    };

    switch (instruction.type) {
      case "N":
      case "S":
      case "E":
      case "W":
        return acc.concat(
          moveShip({
            instruction,
            orientation: instruction.type,
            lastItemHistory: lastItemOrDefault,
          })
        );
      case "F":
        return acc.concat(
          moveShipForward({
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
      deltaPosition: { x: 10, y: 1 },
      position: { x: 0, y: 0 },
    },
  })
);
