type Step6Data = string[];

export const getData = ({ inputRaw }: { inputRaw: string }): Step6Data =>
  inputRaw.split("\n");
