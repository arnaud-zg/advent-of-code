import type { TestResult } from "./test-result";

export class DayScore {
  constructor(
    private readonly dayNumber: string,
    private readonly result: TestResult
  ) {}

  display(): void {
    const paddedDay = this.dayNumber.padStart(2, "0");
    process.stdout.write(`Day ${paddedDay}: `);

    if (!this.result.hasTests()) {
      console.log("No tests found");
      return;
    }

    const icon = this.result.statusIcon();
    const summary = this.result.summary();
    const score = this.result.score();
    console.log(`${icon} ${summary} tests passed (+${score.toFixed(1)})`);
  }

  value(): number {
    return this.result.score();
  }
}
