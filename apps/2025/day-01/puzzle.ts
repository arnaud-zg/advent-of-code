import { z } from "zod";

const DIAL_SIZE = 100;
const STARTING_DIAL_POSITION = 50;
const RotationDirectionSchema = z.enum(["L", "R"]);

export const countEndPositionZeros = (lines: string[]) => {
  let dialPosition = STARTING_DIAL_POSITION;
  let pointAtZeroTimes = 0;

  for (const line of lines) {
    const rotationDirection = RotationDirectionSchema.parse(line[0]);
    const rotationDistance = Number(line.slice(1));

    if (rotationDirection === "L") {
      dialPosition =
        (((dialPosition - rotationDistance) % DIAL_SIZE) + DIAL_SIZE) %
        DIAL_SIZE;
    } else if (rotationDirection === "R") {
      dialPosition = (dialPosition + rotationDistance) % DIAL_SIZE;
    }

    if (dialPosition === 0) {
      pointAtZeroTimes++;
    }
  }

  return pointAtZeroTimes;
};

export const countAllZeroHits = (lines: string[]) => {
  let dialPosition = STARTING_DIAL_POSITION;
  let totalZeroHits = 0;

  for (const line of lines) {
    const rotationDirection = RotationDirectionSchema.parse(line[0]);
    const rotationDistance = Number(line.slice(1));
    let clicksToFirstZero: number = 0;

    if (rotationDirection === "L") {
      clicksToFirstZero = dialPosition % DIAL_SIZE || DIAL_SIZE;
      dialPosition =
        (((dialPosition - rotationDistance) % DIAL_SIZE) + DIAL_SIZE) %
        DIAL_SIZE;
    } else if (rotationDirection === "R") {
      clicksToFirstZero =
        (DIAL_SIZE - (dialPosition % DIAL_SIZE)) % DIAL_SIZE || DIAL_SIZE;
      dialPosition = (dialPosition + rotationDistance) % DIAL_SIZE;
    }

    if (rotationDistance >= clicksToFirstZero) {
      const remainingClicks = rotationDistance - clicksToFirstZero;
      const extraFullCycles = Math.floor(remainingClicks / DIAL_SIZE);

      totalZeroHits += 1 + extraFullCycles;
    }
  }

  return totalZeroHits;
};
