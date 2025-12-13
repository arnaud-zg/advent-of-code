import { type LogEntries } from "./parser";

export class Graph {
  constructor(private readonly entries: Record<string, LogEntries>) {}

  childrenOf(node: string): string[] {
    return this.entries[node]?.flatMap(({ childrenIds }) => childrenIds) ?? [];
  }
}
