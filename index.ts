import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import * as shelljs from "shelljs";

yargs(hideBin(process.argv))
  .command<{ year: number; day: number }>(
    "solvePuzzle",
    "Solve the puzzle",
    (yargs) => {
      yargs.option("year", {
        alias: "y",
        choices: [2020],
        demandOption: true,
        describe: "year of the program",
        type: "number",
      });
      yargs.option("day", {
        alias: "d",
        demandOption: true,
        describe: "day of the puzzle",
        type: "number",
      });
    },
    (argv) => {
      const { year, day, verbose } = argv;

      shelljs.cd(`${year}`);
      shelljs.cd(`day_${day}`);
      const stepFileNameList = shelljs.ls("step_*.ts");

      stepFileNameList.forEach((stepFileName) => {
        const fileNameWithoutExtension = stepFileName.split(".")[0];
        if (verbose) {
          process.stdout.write(
            `> Solve the puzzle for [year:${year}][day:${day}]\n`
          );
          process.stdout.write(`> Result for ${fileNameWithoutExtension}:\t`);
          shelljs.exec(`ts-node ${stepFileName}`);
          process.stdout.write("\n");
        } else {
          shelljs.exec(`ts-node ${stepFileName}`);
          process.stdout.write("\n");
        }
      });
    }
  )
  .option("verbose", {
    alias: "v",
    type: "boolean",
    description: "Run with verbose logging",
  })
  .help().argv;
