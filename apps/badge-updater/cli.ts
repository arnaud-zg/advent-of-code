#!/usr/bin/env bun
import { Badge } from "./badge";
import { YearDirectory } from "./year-directory";
import { YearPrompt } from "./year-prompt";

class BadgeUpdater {
  async run(): Promise<void> {
    const year = await new YearPrompt().ask();
    const yearDir = new YearDirectory(year);
    const badge = new Badge(year);

    if (!yearDir.exists()) {
      console.error(`Directory ${yearDir.path()} does not exist`);
      process.exit(1);
    }

    const totalScore = yearDir.calculateTotalScore();

    if (!badge.exists()) {
      console.error(`Badge file for ${year} does not exist`);
      process.exit(1);
    }

    badge.update(totalScore);
    process.exit(0);
  }
}

new BadgeUpdater().run();
