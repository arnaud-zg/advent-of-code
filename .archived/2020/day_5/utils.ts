type Step5DataItem = {
  columns: string;
  rows: string;
};

type Step5Data = Step5DataItem[];

const RegexColumnsUpperHalf = /R/gi;
const RegexColumnsLowerHalf = /L/gi;
const RegexRowsUpperHalf = /B/gi;
const RegexRowsLowerHalf = /F/gi;

const BinaryUpperHalfValue = "1";
const BinaryLowerHalfValue = "0";

export const getData = ({ inputRaw }: { inputRaw: string }): Step5Data =>
  inputRaw.split("\n").map((inputLineRaw) => ({
    columns: inputLineRaw.slice(7),
    rows: inputLineRaw.slice(0, 7),
  }));

export const getBinaryFromDecimal = ({ binary }: { binary: string }) =>
  parseInt(binary, 2);

export const convertColumnsToBinary = ({ columns }: { columns: string }) =>
  columns
    .replace(RegexColumnsUpperHalf, BinaryUpperHalfValue)
    .replace(RegexColumnsLowerHalf, BinaryLowerHalfValue);

export const convertRowsToBinary = ({ rows }: { rows: string }) =>
  rows
    .replace(RegexRowsUpperHalf, BinaryUpperHalfValue)
    .replace(RegexRowsLowerHalf, BinaryLowerHalfValue);

export const getSeatId = ({ x, y }: { x: number; y: number }) => y * 8 + x;
