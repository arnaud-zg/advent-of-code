type Step4DataItem = {
  byr: number;
  cid: number;
  ecl: string;
  eyr: number;
  hcl: string;
  hgt: {
    unit: "in" | "cm";
    value: number;
  };
  iyr: number;
  pid: string;
};

type Step4Data = Partial<Step4DataItem>[];

const RegexNumber = /\d+/g
const RegexChar = /[^0-9]/g

const TransformFields: { [key: string]: Function } = {
  byr: (value: string) => Number(value),
  cid: (value: string) => Number(value),
  eyr: (value: string) => Number(value),
  hgt: (value: string) => ({
    unit: value.replace(RegexNumber, ""),
    value: Number(value.replace(RegexChar, "")),
  }),
  iyr: (value: string) => Number(value),
};

export const getData = ({ inputRaw }: { inputRaw: string }): Step4Data =>
  inputRaw.split("\n\n").map((inputLineRaw) => {
    const formattedLineRaw = inputLineRaw.replace(/\n/g, " ");
    const lineList = formattedLineRaw.split(" ");
    const item = lineList.reduce<Partial<Step4DataItem>>((acc, line) => {
      const splittedLine = line.split(":");

      return {
        ...acc,
        [splittedLine[0]]:
          TransformFields[splittedLine[0]] && splittedLine[1]
            ? TransformFields[splittedLine[0]](splittedLine[1])
            : splittedLine[1],
      };
    }, {});

    return item;
  });
