import { execSync } from "child_process";
import fs from "fs";
import { TestOutputParser } from "./test-output-parser";
import { TestResult } from "./test-result";

export class DayDirectory {
  constructor(private readonly dayPath: string) {}

  hasTestFiles(): boolean {
    const files = fs.readdirSync(this.dayPath);
    return files.some((file) => this.isTestFile(file));
  }

  private isTestFile(filename: string): boolean {
    return filename.includes(".test.") || filename.includes(".spec.");
  }

  runTests(): TestResult {
    if (!this.hasTestFiles()) {
      return new TestResult(0, 0);
    }

    try {
      const output = this.executeTests();
      return new TestOutputParser(output).parse();
    } catch (error: any) {
      return this.parseFailedTestOutput(error);
    }
  }

  private executeTests(): string {
    return execSync(`bun test ${this.dayPath} 2>&1`, {
      encoding: "utf-8",
      stdio: "pipe",
    });
  }

  private parseFailedTestOutput(error: any): TestResult {
    const output = (error.stdout || error.stderr || "").toString();
    return new TestOutputParser(output).parse();
  }
}
