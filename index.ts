import yargs from "yargs";
// @ts-ignore
import { hideBin } from "yargs/helpers";
import * as shelljs from "shelljs";

yargs(hideBin(process.argv))
  .command<{ year: number; day?: number }>(
    "solvePuzzle",
    "Solve the puzzle of Advent of Code",
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
        describe: "day of the puzzle",
        type: "number",
      });
    },
    (argv) => {
      const { year, day, verbose } = argv;

      shelljs.cd(`${year}`);

      const dayFolderNameList = day ? [`day_${day}`] : shelljs.ls();

      dayFolderNameList.forEach((dayFolderName) => {
        shelljs.cd(dayFolderName);

        const stepFileNameList = shelljs.ls("step_*.ts");

        stepFileNameList.forEach((stepFileName) => {
          const fileNameWithoutExtension = stepFileName.split(".")[0];
          if (verbose) {
            process.stdout.write(
              `> Solve the puzzle for [year:${year}] [day:${dayFolderName.split("_")[1]}]\n`
            );
            process.stdout.write(`> Result for ${fileNameWithoutExtension}:\t`);
            shelljs.exec(`ts-node ${stepFileName}`);
            process.stdout.write("\n");
          } else {
            shelljs.exec(`ts-node ${stepFileName}`);
            process.stdout.write("\n");
          }
        });
        shelljs.cd("..");
      });
    }
  )
  .option("verbose", {
    alias: "v",
    type: "boolean",
    description: "Run with verbose logging",
  })
  .help().argv;
