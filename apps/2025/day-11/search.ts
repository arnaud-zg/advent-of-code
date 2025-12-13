export class SearchState {
  constructor(
    private readonly node: string,
    private readonly visitedNodeSet: ReadonlySet<string>
  ) {}

  at(node: string): SearchState {
    return new SearchState(node, this.visitedNodeSet);
  }

  visit(node: string): SearchState {
    return new SearchState(this.node, new Set([...this.visitedNodeSet, node]));
  }

  get key(): string {
    return `${this.node}|${[...this.visitedNodeSet].sort().join(",")}`;
  }

  get current(): string {
    return this.node;
  }

  hasVisitedAll(requiredNodeSet: ReadonlySet<string>): boolean {
    return Array.from(requiredNodeSet).every((node) =>
      this.visitedNodeSet.has(node)
    );
  }
}

export class Memo {
  private readonly cache = new Map<string, number>();

  get(state: SearchState): number | undefined {
    return this.cache.get(state.key);
  }

  set(state: SearchState, value: number) {
    this.cache.set(state.key, value);
  }
}
