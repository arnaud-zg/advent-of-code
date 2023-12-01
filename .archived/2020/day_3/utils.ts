type Step3Data = string[];

export const getData = ({ inputRaw }: { inputRaw: string }): Step3Data =>
  inputRaw.split("\n");
