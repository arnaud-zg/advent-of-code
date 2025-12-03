import fs from "fs";
import path from "path";

import { MAX_DAYS } from "./config";
import { DayDirectory } from "./day-directory";
import { DayScore } from "./day-score";
import type { PerformanceResult } from "./performance-result";
import type { TestResult } from "./test-result";

export class YearDirectory {
  constructor(private readonly year: string) {}

  path(): string {
    return path.join("apps", this.year);
  }

  exists(): boolean {
    return fs.existsSync(this.path());
  }

  dayFolders(): string[] {
    return fs
      .readdirSync(this.path())
      .filter((name) => /^day-\d+$/.test(name))
      .sort()
      .slice(0, MAX_DAYS);
  }

  calculateTotalScore(): number {
    const folders = this.dayFolders();
    console.log(`Running tests for ${folders.length} days...`);

    return folders.reduce((total, folder) => {
      const dayNumber = folder.replace("day-", "");
      const dayPath = path.join(this.path(), folder);
      const result = new DayDirectory(dayPath).runTests();
      const score = new DayScore(dayNumber, result);

      score.display();
      return total + score.value();
    }, 0);
  }

  testResults(): TestResult[] {
    const folders = this.dayFolders();

    console.log(`Collecting test results for ${folders.length} days...`);

    return folders.flatMap((folder) => {
      const dayPath = path.join(this.path(), folder);
      const testResult = new DayDirectory(dayPath).runTests();

      return testResult;
    });
  }

  performanceResults(): PerformanceResult[] {
    const folders = this.dayFolders();

    console.log(`Collecting performance results for ${folders.length} days...`);

    return folders.flatMap((folder) => {
      const dayNumber = folder.replace("day-", "");
      const dayPath = path.join(this.path(), folder);
      const result = new DayDirectory(dayPath).runTests();

      const performancesResult = result.performanceForDay(
        Number(this.year),
        Number(dayNumber)
      );

      return performancesResult;
    });
  }
}
