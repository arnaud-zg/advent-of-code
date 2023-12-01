type Step9Data = number[];

export const getData = ({ inputRaw }: { inputRaw: string }): Step9Data =>
  inputRaw.split("\n").map((inputLine) => Number(inputLine));
