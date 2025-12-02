# advent-of-code

This project contains solutions for Advent of Code 2025 challenges.

**Performed by:** [Arnaud Zheng](https://github.com/arnaud-zg)

## 🧩 Generating a Puzzle Day

You can quickly scaffold a new Advent of Code puzzle day using the generator:

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

## Running Tests

To run unit tests for Day 1 in watch mode:

```bash
bun test apps/2025/day-01 --watch
```

This will automatically rerun tests whenever you modify the source files.

## License

This project is licensed under the [MIT License](./LICENSE).
