type Step2Data = {
  policy: {
    max: number;
    min: number;
  };
  letter: string;
  corruptedPassword: string;
}[];

export const getData = ({ inputRaw }: { inputRaw: string }): Step2Data =>
  inputRaw.split("\n").map((line) => {
    const cleanedLine = line.replace(":", "");
    const splittedLine = cleanedLine.split(" ");
    const occurs = splittedLine[0].split("-");
    const letter = splittedLine[1];
    const corruptedPassword = splittedLine[2];

    return {
      policy: {
        min: Number(occurs[0]),
        max: Number(occurs[1]),
      },
      letter,
      corruptedPassword,
    };
  });
