import fs from "fs";
import path from "path";
import { badgeSchema, MAX_DAYS } from "./config";
import { ScoreColor } from "./score-color";

export class Badge {
  constructor(private readonly year: string) {}

  private filePath(): string {
    return path.join(".github", "badges", `${this.year}.json`);
  }

  exists(): boolean {
    return fs.existsSync(this.filePath());
  }

  private currentMaxDay(): number {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDate = today.getDate();

    if (currentYear > Number(this.year)) {
      return MAX_DAYS;
    }

    if (currentYear === Number(this.year) && currentMonth === 12) {
      return Math.min(currentDate, MAX_DAYS);
    }

    return 0;
  }

  update(score: number): void {
    const raw = fs.readFileSync(this.filePath(), "utf-8");
    const data = badgeSchema.parse(JSON.parse(raw));

    const maxDay = this.currentMaxDay();

    data.message = `${score}/${maxDay}`;
    data.color = new ScoreColor(score, maxDay).value();

    fs.writeFileSync(this.filePath(), JSON.stringify(data, null, 2), "utf-8");
    console.log(`\nUpdated badge: ${data.message}`);
  }
}
