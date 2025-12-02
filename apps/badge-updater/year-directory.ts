import fs from "fs";
import path from "path";
import { MAX_DAYS } from "./config";
import { DayDirectory } from "./day-directory";
import { DayScore } from "./day-score";

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
    console.log(`\nRunning tests for ${folders.length} days...\n`);

    return folders.reduce((total, folder) => {
      const dayNumber = folder.replace("day-", "");
      const dayPath = path.join(this.path(), folder);
      const result = new DayDirectory(dayPath).runTests();
      const score = new DayScore(dayNumber, result);

      score.display();
      return total + score.value();
    }, 0);
  }
}
