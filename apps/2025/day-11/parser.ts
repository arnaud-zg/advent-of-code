import { getLinesFromInput, validatePuzzleInput } from "@advent-of-code/utils";
import { z } from "zod";

const LogEntrySchema = z.object({
  id: z.string(),
  childrenIds: z.string().nonempty().array(),
});
const LogEntriesSchema = LogEntrySchema.array();

export type LogEntry = z.infer<typeof LogEntrySchema>;
export type LogEntries = z.infer<typeof LogEntriesSchema>;

type Node = {
  id: string;
  parentId?: string;
  children: Node[];
};

const NodeSchema: z.ZodType<Node> = z.lazy(() =>
  z.object({
    id: z.string(),
    parentId: z.string().optional(),
    children: z.array(NodeSchema),
  })
);

export const LogEntriesParser = z.preprocess((inputContent: string) => {
  validatePuzzleInput(inputContent);

  const lines = getLinesFromInput(inputContent);
  const logEntries = lines.flatMap((line) => {
    const splittedLine = line.split(": ");
    const id = z.string().nonempty().parse(splittedLine[0]);
    const childrenIds = z
      .string()
      .nonempty()
      .array()
      .parse(splittedLine[1]?.split(" "));

    return {
      id,
      childrenIds,
    };
  }) satisfies LogEntries;

  return logEntries;
}, LogEntriesSchema);
