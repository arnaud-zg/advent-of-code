import { z } from "zod";

export const GridParser = z
  .string()
  .trim()
  .transform((input): Grid => input.split("\n").map((row) => row.split("")));

const GridSchema = z.string().array().array();
export type Grid = z.infer<typeof GridSchema>;

const PositionSchema = z.object({ x: z.number(), y: z.number() });
export type Position = z.infer<typeof PositionSchema>;

export type Direction = Position;
const DirectionsSchema = z.object({
  up: PositionSchema,
  down: PositionSchema,
  left: PositionSchema,
  right: PositionSchema,
});
export type Directions = z.infer<typeof DirectionsSchema>;

export const DIRECTIONS: Directions = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

export class GridManager {
  private grid: Grid;

  constructor(input: string) {
    this.grid = GridParser.parse(input);
  }

  public getGrid(): Grid {
    return this.grid.map((row) => [...row]);
  }

  public inBounds(position: Position): boolean {
    return (
      position.y >= 0 &&
      position.y < this.grid.length &&
      position.x >= 0 &&
      position.x < this.grid[0]!.length
    );
  }

  public cell(position: Position): string | null {
    if (!this.inBounds(position)) {
      return null;
    }

    return this.grid[position.y]![position.x]!;
  }

  public setCell(position: Position, value: string): void {
    if (!this.inBounds(position)) {
      throw new Error(`Position out of bounds: (${position.x}, ${position.y})`);
    }

    this.grid[position.y]![position.x] = value;
  }

  public move(position: Position, direction: Direction): Position {
    return {
      x: position.x + direction.x,
      y: position.y + direction.y,
    };
  }

  public findCell(character: string): Position {
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[0]!.length; x++) {
        if (this.grid[y]![x] === character) {
          return { x, y };
        }
      }
    }
    throw new Error(`Character "${character}" not found in grid`);
  }

  public walkUntil(
    start: Position,
    direction: Direction,
    stopCharacter: string
  ): Position | null {
    let position = this.move(start, direction);
    while (this.inBounds(position)) {
      if (this.cell(position) === stopCharacter) {
        return position;
      }

      position = this.move(position, direction);
    }

    return null;
  }

  public print(title: string, separator = ""): void {
    const output = this.grid.map((row) => row.join(separator)).join("\n");

    console.log(`\n=== ${title} ===`);
    console.log(output);
  }

  public static getPositionKey(position: Position) {
    return `${position.x},${position.y}`;
  }
}
