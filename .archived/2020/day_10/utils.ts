type Step10Data = number[];

export const getData = ({ inputRaw }: { inputRaw: string }): Step10Data =>
  inputRaw.split("\n").map((inputLine) => Number(inputLine));
