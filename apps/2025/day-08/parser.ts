import { getLinesFromInput, validatePuzzleInput } from "@advent-of-code/utils";
import { z } from "zod";

const SEPARATOR = ",";

const Position3DSchema = z.object({
  x: z.number(),
  y: z.number(),
  z: z.number(),
});
const Position3DListSchema = Position3DSchema.array();

export type Position3D = z.infer<typeof Position3DSchema>;
export type Position3DList = z.infer<typeof Position3DListSchema>;

export const Position3DParser = z.preprocess((inputContent: string) => {
  validatePuzzleInput(inputContent);

  const lines = getLinesFromInput(inputContent);

  const position3DList = lines.map((line) => {
    const [x, y, z] = line.split(SEPARATOR).map(Number);

    return Position3DSchema.parse({ x, y, z });
  });

  return position3DList;
}, Position3DListSchema);
