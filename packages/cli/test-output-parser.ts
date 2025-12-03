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

  parse(): TestResult {
    const passed = this.extractPassedCount();
    const failed = this.extractFailedCount();
    const total = passed + failed;
    return new TestResult(passed, total);
  }
}
