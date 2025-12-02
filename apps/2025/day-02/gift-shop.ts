import { z } from "zod";

const RangePosition = z.number();

export const isRepeatedSequenceTwice = (value: number) => {
  const sequence = String(value);
  const sequenceLength = sequence.length;
  const halfLength = sequenceLength / 2;

  if (sequenceLength % 2 !== 0) {
    return false;
  }

  const firstHalf = sequence.slice(0, halfLength);
  const secondHalf = sequence.slice(halfLength, sequenceLength);

  return firstHalf === secondHalf;
};

export const isRepeatedSequencePattern = (value: number) => {
  const sequence = String(value);
  const sequenceLength = sequence.length;
  const halfLength = sequenceLength / 2;

  for (let j = 1; j <= halfLength; j++) {
    const repeats = sequenceLength / j;
    const pattern = sequence.slice(0, j);

    if (pattern.repeat(repeats) === sequence) {
      return true;
    }
  }

  return false;
};

type IsRepeatedSequenceStrategy = (value: number) => boolean;

const extractProductRanges = (productIdRanges: string) => {
  const [startRangeRaw, endRangeRaw] = productIdRanges.split("-");
  const startRange = RangePosition.parse(Number(startRangeRaw));
  const endRange = RangePosition.parse(Number(endRangeRaw));

  return { startRange, endRange };
};

export const filterInvalidProductIdsRanges = (
  productIdRangesList: string[],
  isRepeatedSequenceStrategy: IsRepeatedSequenceStrategy
) => {
  const repeatedSequencesList: number[] = [];
  for (const productIdRanges of productIdRangesList) {
    const { startRange, endRange } = extractProductRanges(productIdRanges);

    for (let i = startRange; i <= endRange; i++) {
      if (isRepeatedSequenceStrategy(i)) {
        repeatedSequencesList.push(i);
      }
    }
  }

  return repeatedSequencesList;
};
