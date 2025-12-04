# 🎄 Advent of Code

This project contains solutions for **Advent of Code 2025** challenges.

**👤 Performed by:** [Arnaud Zheng](https://github.com/arnaud-zg)

**Tech Stack:**

![Node.js](https://img.shields.io/badge/node-24.11.1-339933?style=for-the-badge&logo=node.js)
![Bun](https://img.shields.io/badge/runtime-Bun-FFCC33?style=for-the-badge&logo=bun)
![TypeScript](https://img.shields.io/badge/language-TypeScript-3178C6?style=for-the-badge&logo=typescript)

[![Advent of Code 2025 Progress](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Farnaud-zg%2Fadvent-of-code%2Fmaster%2F.github%2Fbadges%2F2025.json&style=for-the-badge)](/apps/2025)

## 🧩 Generating a Puzzle Day

Quickly scaffold a new Advent of Code puzzle day:

```bash
bun run puzzle:generate
```

This command will:

1. Prompt you for the year, day number, and puzzle name.
2. Generate a folder structure under:

```bash
apps/<year>/day-<day>/
  ├─ puzzle.ts        # Puzzle solution template
  ├─ puzzle.test.ts   # Test template
  ├─ package.json     # Minimal package for the day
  ├─ sample.txt       # Sample input
  └─ input.txt        # Puzzle input
```

3. Run bun install in the root folder to ensure dependencies are up to date.
4. Display next steps, including:

- Updating input.txt and sample.txt.
- Renaming methods in puzzle.ts to something more descriptive.
- Running tests in watch mode

## 🧪 Running Tests

To run unit tests for Day 1 in watch mode:

```bash
bun test apps/2025/day-01 --watch
```

Tests will automatically rerun on file changes.

## ⚡ Updating Badge & Performance Table

Once you have completed a puzzle day, update your progress badge and performance table:

```bash
bun run puzzle:snapshot
```

This will regenerate the badge data to reflect your latest progress and performance.

## 📜 License

This project is licensed under the [MIT License](./LICENSE).
