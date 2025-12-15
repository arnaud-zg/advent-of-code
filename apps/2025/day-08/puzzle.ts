import { validatePuzzleInput } from "@advent-of-code/utils";
import { Position3DParser, type Position3D } from "./parser";
import { UnionFind } from "./union-find";

type PairWithDistance = {
  i: number;
  j: number;
  distance: number;
};

const squaredDistance = (boxA: Position3D, boxB: Position3D): number => {
  const dx = boxA.x - boxB.x;
  const dy = boxA.y - boxB.y;
  const dz = boxA.z - boxB.z;

  return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

const computeAllPairs = (boxes: Position3D[]): PairWithDistance[] => {
  const pairs: PairWithDistance[] = [];

  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      const boxA = boxes[i]!;
      const boxB = boxes[j]!;

      pairs.push({
        i,
        j,
        distance: squaredDistance(boxA, boxB),
      });
    }
  }

  return pairs;
};

const connectClosestPairs = (
  unionFind: UnionFind,
  pairs: PairWithDistance[],
  limit: number
) => {
  for (let i = 0; i < limit && i < pairs.length; i++) {
    unionFind.union(pairs[i]!.i, pairs[i]!.j);
  }
};
const computeResult = (unionFind: UnionFind, topN: number = 3): number => {
  const sizes = unionFind.getSizes().sort((a, b) => b - a);

  return sizes.slice(0, topN).reduce((acc, size) => acc * size, 1);
};

export const calculateLargestCircuits = (
  inputContent: string,
  limit: number
): number => {
  validatePuzzleInput(inputContent);

  const boxes = Position3DParser.parse(inputContent);
  const unionFind = new UnionFind(boxes.length);
  const pairs = computeAllPairs(boxes);

  pairs.sort((a, b) => a.distance - b.distance);

  connectClosestPairs(unionFind, pairs, limit);

  return computeResult(unionFind, 3);
};

const connectUntilSingleCircuit = (
  pairs: PairWithDistance[],
  unionFind: UnionFind,
  boxes: Position3D[]
) => {
  for (const pair of pairs) {
    const merged = unionFind.union(pair.i, pair.j);

    if (merged) {
      const sizes = unionFind.getSizes();

      if (sizes.length === 1) {
        const boxA = boxes[pair.i]!;
        const boxB = boxes[pair.j]!;

        return boxA.x * boxB.x;
      }
    }
  }
  throw new Error("Failed to connect all junction boxes into one circuit");
};

export const calculateLastMergeProduct = (inputContent: string) => {
  validatePuzzleInput(inputContent);
  const boxes = Position3DParser.parse(inputContent);
  const unionFind = new UnionFind(boxes.length);
  const pairs = computeAllPairs(boxes);

  pairs.sort((a, b) => a.distance - b.distance);

  return connectUntilSingleCircuit(pairs, unionFind, boxes);
};
