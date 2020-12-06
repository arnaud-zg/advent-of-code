import * as fs from "fs";
import { getData } from "./utils";

const inputRaw = fs.readFileSync("input.txt", "utf8");

const RegexHexColorFormat = /^#[0-9A-F]{6}$/i;
const RegexPassportId = /^\d{9}$/i;
const EyeColorList = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

const validateNumberRange = ({
  value,
  min,
  max,
}: {
  value?: number;
  min: number;
  max: number;
}) => value && value >= min && value <= max;

const validateHexColorFormat = ({ hexColor }: { hexColor?: string }) =>
  hexColor && RegexHexColorFormat.test(hexColor);

const validatePassportId = ({ passportId }: { passportId?: string }) =>
  passportId && RegexPassportId.test(passportId);

const validateEyeColor = ({ eyeColor }: { eyeColor?: string }) =>
  eyeColor && EyeColorList.includes(eyeColor);

const solvePuzzle = ({ data }: { data: ReturnType<typeof getData> }) =>
  data.filter(
    (passportInfo) =>
      validateNumberRange({ value: passportInfo.byr, min: 1920, max: 2002 }) &&
      validateEyeColor({ eyeColor: passportInfo.ecl }) &&
      validateNumberRange({ value: passportInfo.eyr, min: 2020, max: 2030 }) &&
      validateHexColorFormat({ hexColor: passportInfo.hcl }) &&
      passportInfo.hgt &&
      ((passportInfo.hgt.unit === "cm" &&
        validateNumberRange({
          value: passportInfo.hgt.value,
          min: 150,
          max: 193,
        })) ||
        (passportInfo.hgt.unit === "in" &&
          validateNumberRange({
            value: passportInfo.hgt.value,
            min: 59,
            max: 76,
          }))) &&
      validateNumberRange({ value: passportInfo.iyr, min: 2010, max: 2020 }) &&
      validatePassportId({ passportId: passportInfo.pid })
  ).length;

console.log(
  solvePuzzle({
    data: getData({ inputRaw }),
  })
);
