#!/usr/bin/env bun
import { FULL_SCORE, NO_SCORE, PARTIAL_SCORE } from "./config";

export class TestResult {
  constructor(
    private readonly passed: number,
    private readonly total: number
  ) {}

  hasTests(): boolean {
    return this.total > 0;
  }

  allPassed(): boolean {
    return this.passed === this.total;
  }

  somePassed(): boolean {
    return this.passed > 0;
  }

  score(): number {
    if (!this.hasTests()) return NO_SCORE;
    if (this.allPassed()) return FULL_SCORE;
    if (this.somePassed()) return PARTIAL_SCORE;
    return NO_SCORE;
  }

  summary(): string {
    return `${this.passed}/${this.total}`;
  }

  statusIcon(): string {
    if (this.allPassed()) return "✓";
    if (this.somePassed()) return "⚠";
    return "✗";
  }
}
