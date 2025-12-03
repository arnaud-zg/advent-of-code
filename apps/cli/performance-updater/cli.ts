#!/usr/bin/env bun
import { YearDirectory, YearPrompt } from "@advent-of-code/cli";
import { ReadmeUpdater } from "./readme-updater";

class PerformanceUpdater {
  async run(): Promise<void> {
    const year = await new YearPrompt().ask();
    const yearDir = new YearDirectory(year);
    const readmeUpdater = new ReadmeUpdater(year);

    if (!yearDir.exists()) {
      console.error(`Directory ${yearDir.path()} does not exist`);
      process.exit(1);
    }

    const testResults = yearDir.testResults();
    const performanceResults = yearDir.performanceResults();

    await readmeUpdater.update(performanceResults, testResults);

    process.exit(0);
  }
}

new PerformanceUpdater().run();
