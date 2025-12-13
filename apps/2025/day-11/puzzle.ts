import { groupBy, validatePuzzleInput } from "@advent-of-code/utils";
import { Graph } from "./graph";
import { LogEntriesParser } from "./parser";
import { PathCounter } from "./path-counter";

export const getDifferentPaths = (
  inputContent: string,
  from: string,
  to: string,
  requiredNodes: string[] = []
): number => {
  validatePuzzleInput(inputContent);

  const logEntries = LogEntriesParser.parse(inputContent);
  const graph = new Graph(groupBy(logEntries, ({ id }) => id));

  return new PathCounter(graph, requiredNodes, to).countFrom(from);
};
