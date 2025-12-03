export class PerformanceEvaluation {
  private static readonly THRESHOLD_FAST = 10;
  private static readonly THRESHOLD_MODERATE = 100;

  private static readonly EMOJI_FAST = "🟢";
  private static readonly EMOJI_MODERATE = "🟡";
  private static readonly EMOJI_SLOW = "🔴";

  constructor(private readonly timeMs: number) {}

  /**
   * Returns the emoji representing the performance:
   * 🟢 < 10ms, 🟡 10–100ms, 🔴 >= 100ms
   */
  getTimeEmoji(): string {
    if (this.timeMs >= PerformanceEvaluation.THRESHOLD_MODERATE)
      return PerformanceEvaluation.EMOJI_SLOW;
    if (this.timeMs >= PerformanceEvaluation.THRESHOLD_FAST)
      return PerformanceEvaluation.EMOJI_MODERATE;
    return PerformanceEvaluation.EMOJI_FAST;
  }

  getTime(): number {
    return this.timeMs;
  }
}
