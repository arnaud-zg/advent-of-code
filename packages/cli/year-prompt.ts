import { yearSchema } from "./config";

export class YearPrompt {
  private stdin = process.stdin;
  private stdout = process.stdout;

  async ask(): Promise<string> {
    while (true) {
      const input = await this.readInput();
      const validation = yearSchema.safeParse(input);

      if (validation.success) {
        return validation.data;
      }

      console.log(`Invalid input: ${validation.error.issues[0]?.message}`);
    }
  }

  private readInput(): Promise<string> {
    this.stdout.write("Enter the year (e.g., 2025): ");
    return new Promise((resolve) => {
      this.stdin.once("data", (data) => {
        resolve(data.toString().trim());
      });
    });
  }
}
