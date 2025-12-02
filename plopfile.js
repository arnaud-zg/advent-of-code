import { execSync } from "child_process";
import { z } from "zod";

const nameSchema = z.string().min(1, "Puzzle name is required").trim();
const yearSchema = z.string().regex(/^\d{4}$/, "Year must be a 4-digit number");
const daySchema = z
  .number()
  .int()
  .min(1, "Day must be ≥ 1")
  .max(31, "Day must be ≤ 31");

export default function (plop) {
  plop.setHelper("pad2", (day) => String(day).padStart(2, "0"));

  plop.setGenerator("puzzle-day", {
    description: "Generate a puzzle day folder for AoC",
    prompts: [
      {
        type: "input",
        name: "year",
        message: "Year:",
        validate: (input) => {
          const result = yearSchema.safeParse(input);

          if (result.success) {
            return true;
          }

          return result.error.issues[0]?.message || "Invalid input";
        },
      },
      {
        type: "number",
        name: "day",
        message: "Day number:",
        validate: (input) => {
          const result = daySchema.safeParse(input);

          if (result.success) {
            return true;
          }

          return result.error.issues[0]?.message || "Invalid day number";
        },
      },
      {
        type: "input",
        name: "puzzleName",
        message: "Enter the puzzle name:",
        validate: (input) => {
          const result = nameSchema.safeParse(input);

          if (result.success) {
            return true;
          }

          return result.error.issues[0]?.message || "Invalid puzzle name";
        },
      },
    ],
    actions: [
      {
        type: "add",
        path: "apps/{{year}}/day-{{pad2 day}}/sample.txt",
        templateFile: "templates/puzzle-day/sample.txt",
      },
      {
        type: "add",
        path: "apps/{{year}}/day-{{pad2 day}}/input.txt",
        templateFile: "templates/puzzle-day/input.txt",
      },
      {
        type: "add",
        path: "apps/{{year}}/day-{{pad2 day}}/package.json",
        templateFile: "templates/puzzle-day/package.json.hbs",
      },
      {
        type: "add",
        path: "apps/{{year}}/day-{{pad2 day}}/puzzle.test.ts",
        templateFile: "templates/puzzle-day/puzzle.test.ts.hbs",
      },
      {
        type: "add",
        path: "apps/{{year}}/day-{{pad2 day}}/puzzle.ts",
        templateFile: "templates/puzzle-day/puzzle.ts.hbs",
      },
      (answers, config, plop) => {
        const pad2 = plop.getHelper("pad2");
        const dayPadded = pad2(answers.day);

        console.log("🔹 Running `bun install` in root folder...");
        execSync("bun install", { stdio: "inherit", cwd: "." });

        console.log(`
🎉 Puzzle day generated successfully!

Folder: apps/${answers.year}/day-${dayPadded}
Puzzle name: ${answers.puzzleName}

✅ Next steps to start coding:

1. Update your input files:
   - apps/${answers.year}/day-${dayPadded}/input.txt
   - apps/${answers.year}/day-${dayPadded}/sample.txt

2. Rename methods in puzzle.ts to be more descriptive / business-oriented:
   - solvePart1 -> calculateInvalidIds
   - solvePart2 -> calculateInvalidIdsAdvanced

3. Run tests in watch mode while coding:
   $ bun test apps/${answers.year}/day-${dayPadded} --watch

Happy coding! 🚀
`);
        return "bun install completed and next steps displayed";
      },
    ],
  });
}
