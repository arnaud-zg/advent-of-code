import type { Graph } from "./graph";
import type { LogEntries } from "./parser";
import { Memo, SearchState } from "./search";

export const countPathsWithRequirements = (
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

export class PathCounter {
  private readonly memo = new Memo();
  private readonly requiredNodeSet: ReadonlySet<string> = new Set();

  constructor(
    private readonly graph: Graph,
    requiredNodes: string[],
    private readonly destination: string
  ) {
    this.requiredNodeSet = new Set(requiredNodes);
  }

  countFrom(start: string): number {
    return this.dfs(new SearchState(start, new Set()));
  }

  private dfs(state: SearchState): number {
    const cached = this.memo.get(state);

    if (cached !== undefined) return cached;

    const nextState = this.requiredNodeSet.has(state.current)
      ? state.visit(state.current)
      : state;

    if (
      nextState.current === this.destination &&
      nextState.hasVisitedAll(this.requiredNodeSet)
    ) {
      return 1;
    }

    const total = this.graph
      .childrenOf(nextState.current)
      .reduce((sum, child) => sum + this.dfs(nextState.at(child)), 0);

    this.memo.set(state, total);
    return total;
  }
}
