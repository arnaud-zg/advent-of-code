import { PerformanceResult } from "./performance-result";
import { TestResult } from "./test-result";

export class TestOutputParser {
  constructor(private readonly output: string) {}

  extractPassedCount(): number {
    const match = this.output.match(/(\d+)\s+pass/i);
    return match?.[1] ? parseInt(match[1], 10) : 0;
  }

  extractFailedCount(): number {
    const match = this.output.match(/(\d+)\s+fail/i);
    return match?.[1] ? parseInt(match[1], 10) : 0;
  }

  extractSkippedCount(): number {
    const match = this.output.match(/(\d+)\s+skip/i);
    return match?.[1] ? parseInt(match[1], 10) : 0;
  }

  extractPerformanceResults(): PerformanceResult[] {
    const results: PerformanceResult[] = [];

    // Matches lines like:
    // (pass) 2025 - Day 8 > Playground > Part 1 > should solve the puzzle with input [0.09ms]
    // (fail) 2025 - Day 8 > Playground > Part 1 > should solve the puzzle with sample [0.42ms]
    // (skip) 2025 - Day 8 > Playground > Part 2 > should solve the puzzle with input
    const regex =
      /^\((pass|fail|skip)\)\s+(\d+)\s*-\s*Day\s*(\d+)\s*>\s*([^>]+)\s*>\s*(Part\s*\d+)\s*>\s*(.+?)(?:\s*\[([\d.]+)ms\])?$/gm;

    let match: RegExpExecArray | null;

    while ((match = regex.exec(this.output))) {
      const [, status, year, day, testName, part, description = "", time] =
        match;

      if (
        !year ||
        !day ||
        !testName ||
        !part ||
        !time ||
        !description.includes("input") // Skip lines that are for "sample"
      ) {
        continue;
      }

      results.push(
        new PerformanceResult(
          Number(year),
          Number(day),
          Number(part.replace(/\D/g, "")),
          testName.trim(),
          status === "pass" ? parseFloat(time) : null
        )
      );
    }

    return results;
  }

  parse(): TestResult {
    const passed = this.extractPassedCount();
    const failed = this.extractFailedCount();
    const skipped = this.extractSkippedCount();
    const total = passed + failed + skipped;
    const performance = this.extractPerformanceResults();

    return new TestResult(passed, total, performance);
  }
}
