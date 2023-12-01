type Step13Data = string[];

export const getData = ({ inputRaw }: { inputRaw: string }): Step13Data =>
  inputRaw.split("\n");
