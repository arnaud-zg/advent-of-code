type Step8Data = string[];

export const getData = ({ inputRaw }: { inputRaw: string }): Step8Data =>
  inputRaw.split("\n");
