import type { PerformanceResult, TestResult } from "@advent-of-code/cli";
import prettier from "prettier";

import { PerformanceEvaluation } from "./performance-evaluation";
import { ReadmeParser } from "./readme-parser";

export class ReadmeUpdater {
  constructor(private readonly year: string) {}

  private buildTableRow(
    result: PerformanceResult,
    testResults: TestResult[]
  ): string {
    const evaluation = new PerformanceEvaluation(result.getTime());
    const timeEmoji = evaluation.getTimeEmoji();
    const testResult = testResults.find(
      (tr) =>
        tr.hasTests() &&
        !!tr.performanceForDay(Number(this.year), Number(result.getDay()))
          .length
    );
    const statusEmoji = testResult?.statusIcon() ?? "";
    const evaluationTime = evaluation.getTime()?.toFixed(2) ?? "";

    return `| ${result.getDay()} | ${result.getPart()} | [${result
      .getName()
      .trim()}](./day-${result.getDay().toString().padStart(2, "0")}) | ${timeEmoji} ${evaluationTime} | ${statusEmoji} | |`;
  }

  public async update(
    performanceResults: PerformanceResult[],
    testResults: TestResult[]
  ) {
    const parser = new ReadmeParser(this.year);
    const content = parser.readContent();
    const [start, end] = parser.getPerformanceSectionBounds(content);
    const before = content.slice(0, start);
    const sectionContent = content.slice(start, end);
    const after = content.slice(end);
    const existingMap = parser.parsePerformanceRows(sectionContent);

    let newRowsCount = 0;

    for (const result of performanceResults) {
      const key = `${result.getDay()}|${result.getPart()}|${result
        .getName()
        .trim()}`;

      if (!existingMap.has(key)) {
        const row = this.buildTableRow(result, testResults);

        existingMap.set(key, row);
        newRowsCount++;
      }
    }

    if (newRowsCount === 0) {
      console.log("No new performance entries to add.");
      return;
    }

    const tableHeader =
      "| Day | Part | Test | Time (ms) | Status | O(n) |\n| - | - | - | - | - | - |";
    const updatedRows = Array.from(existingMap.values()).join("\n");
    const updatedSection = `## 🏎️ Performance\n\n${tableHeader}\n${updatedRows}\n`;
    let updatedContent = `${before}${updatedSection}${after}`;

    updatedContent = await prettier.format(updatedContent, {
      parser: "markdown",
    });

    parser.writeContent(updatedContent);
    console.log(
      `README.md updated with ${newRowsCount} new performance entries.`
    );
  }
}
