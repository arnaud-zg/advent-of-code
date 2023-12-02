export const calculateCalibrationSum = (
  calibrationDocument: string[],
): number => {
  let calibrationSum = 0;

  for (const line of calibrationDocument) {
    const splittedLines = line.split("");
    const firstDigit = splittedLines.find((value) => !isNaN(Number(value)));
    const lastDigit = splittedLines
      .slice()
      .reverse()
      .find((value) => !isNaN(Number(value)));

    if (firstDigit && lastDigit) {
      const calibrationValue = Number(`${firstDigit}${lastDigit}`);

      calibrationSum += calibrationValue;
    }
  }

  return calibrationSum;
};

export const calculateCalibrationSumV2 = (
  calibrationDocument: string[],
): number => {
  let calibrationSum = 0;

  for (const line of calibrationDocument) {
    const { digits } = extractDigits(line);

    if (digits.length) {
      const calibrationValue = Number(
        `${digits[0]}${digits[digits.length - 1]}`,
      );

      calibrationSum += calibrationValue;
    }
  }

  return calibrationSum;
};

const numberRegex = /\d|(?=(one|two|three|four|five|six|seven|eight|nine))/g;

const spelledOutDigits: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

export const extractDigits = (line: string) => {
  const matches = line.matchAll(numberRegex);

  let digits = [];

  for (const match of matches) {
    const groupMatch = match[1];
    const regExpMatch = match[0];
    const value = groupMatch || regExpMatch;

    const digit = isNaN(Number(value))
      ? spelledOutDigits[value]!
      : Number(value);

    digits.push(digit);
  }

  return { digits };
};
