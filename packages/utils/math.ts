export const multiply = (values: number[]) =>
  values.reduce((acc, value) => acc * value, 1);

export const sum = (values: number[]) =>
  values.reduce((acc, value) => acc + value, 0);

export const sumBigInt = (values: bigint[]) =>
  values.reduce((acc, value) => acc + value, 0n);
