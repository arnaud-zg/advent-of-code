export class PerformanceResult {
  constructor(
    private readonly year: number,
    private readonly day: number,
    private readonly part: number,
    private readonly name: string,
    private readonly timeMs: number
  ) {}

  getYear(): number {
    return this.year;
  }

  getDay(): number {
    return this.day;
  }

  getPart(): number {
    return this.part;
  }

  getName(): string {
    return this.name;
  }

  getTime(): number {
    return this.timeMs;
  }

  displayName(): string {
    return `${this.year}-Day ${this.day} ${this.part} ${this.name}`;
  }
}
