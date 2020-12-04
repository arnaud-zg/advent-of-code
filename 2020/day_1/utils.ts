type Step1Data = number[];

export const getData = ({ inputRaw }: { inputRaw: string }): Step1Data =>
  inputRaw.split("\n").map((value) => Number(value));
