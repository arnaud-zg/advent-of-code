import { groupBy, validatePuzzleInput } from "@advent-of-code/utils";
import { LogEntriesParser, type LogEntries } from "./parser";
import { PathCounter } from "./path-counter";
import { Graph } from "./graph";

const countPathsWithRequirements = (
  graph: Record<string, LogEntries>,
  from: string,
  to: string,
  requiredNodes: string[]
): number => {
  const requiredNodeSet = new Set(requiredNodes);
  const allVisitedPaths = new Map<string, number>();

  const dfs = (node: string, visitedNodeSet: Set<string>): number => {
    const key = `${node}|${Array.from(visitedNodeSet).join(",")}`;

    if (allVisitedPaths.has(key)) return allVisitedPaths.get(key)!;

    const newVisited = new Set(visitedNodeSet);

    if (requiredNodeSet.has(node)) newVisited.add(node);

    if (
      node === to &&
      requiredNodes.every((value) => visitedNodeSet.has(value))
    ) {
      return 1;
    }

    let totalCount = 0;
    const childrenIds = (graph[node] ?? []).flatMap(
      ({ childrenIds }) => childrenIds
    );

    for (const childrenId of childrenIds) {
      totalCount += dfs(childrenId, newVisited);
    }

    allVisitedPaths.set(key, totalCount);

    return totalCount;
  };

  return dfs(from, new Set());
};

export const getDifferentPaths = (
  inputContent: string,
  from: string,
  to: string,
  requiredNodes: string[] = []
): number => {
  validatePuzzleInput(inputContent);

  const logEntries = LogEntriesParser.parse(inputContent);

  const logEntriesById = groupBy(logEntries, ({ id }) => id);
  const totalPaths = countPathsWithRequirements(
    logEntriesById,
    from,
    to,
    requiredNodes
  );

  return totalPaths;
};
