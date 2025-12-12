import fs from "fs";
import path from "path";

export class ReadmeParser {
  constructor(private readonly year: string) {}

  public readmePath(): string {
    return path.join("apps", this.year, "README.md");
  }

  public readContent(): string {
    return fs.readFileSync(this.readmePath(), "utf-8");
  }

  public getPerformanceSectionBounds(content: string): [number, number] {
    const perfHeaderRegex = /##\s*🏎️\s*Performance/i;
    const headerMatch = perfHeaderRegex.exec(content);

    if (!headerMatch) {
      throw new Error(
        `README.md for year ${this.year} does not contain "## 🏎️ Performance" section`
      );
    }

    const start = headerMatch.index;
    const rest = content.slice(start + headerMatch[0].length);
    const nextHeaderMatch = /##\s+/.exec(rest);
    const end = nextHeaderMatch
      ? start + headerMatch[0].length + nextHeaderMatch.index
      : content.length;

    return [start, end];
  }

  public parsePerformanceRows(sectionContent: string): Map<string, string> {
    const map = new Map<string, string>();

    const lines = sectionContent
      .split("\n")
      .map((line) => line.trim())
      .filter(
        (line) =>
          line.startsWith("|") &&
          !/^(\|\s*-+\s*)+\|$/.test(line) &&
          !line.includes("Day | Part")
      );

    for (const line of lines) {
      const cols =
        line.match(/\|([^|]*)/g)?.map((m) => m.slice(1).trim()) ?? [];
      const [day, part, test] = cols;

      if (!day || !part || !test) continue;

      const key = `${day}|${part}|${test}`;
      map.set(key, line);
    }

    return map;
  }

  public writeContent(content: string): void {
    fs.writeFileSync(this.readmePath(), content, "utf-8");
  }
}
