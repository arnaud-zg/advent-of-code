export class ScoreColor {
  private static readonly THRESHOLDS = {
    EXCELLENT: 0.9,
    GOOD: 0.7,
    FAIR: 0.5,
    POOR: 0.3,
  };

  private static readonly COLORS = {
    EXCELLENT: "brightgreen",
    GOOD: "green",
    FAIR: "yellow",
    POOR: "orange",
    CRITICAL: "red",
  };

  constructor(
    private readonly score: number,
    private readonly maxScore: number
  ) {}

  private percentage(): number {
    return this.score / this.maxScore;
  }

  value(): string {
    const percentage = this.percentage();

    if (percentage >= ScoreColor.THRESHOLDS.EXCELLENT)
      return ScoreColor.COLORS.EXCELLENT;
    if (percentage >= ScoreColor.THRESHOLDS.GOOD) return ScoreColor.COLORS.GOOD;
    if (percentage >= ScoreColor.THRESHOLDS.FAIR) return ScoreColor.COLORS.FAIR;
    if (percentage >= ScoreColor.THRESHOLDS.POOR) return ScoreColor.COLORS.POOR;

    return ScoreColor.COLORS.CRITICAL;
  }
}
