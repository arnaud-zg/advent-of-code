import {
  DIRECTIONS,
  GridManager,
  validatePuzzleInput,
  type Position,
} from "@advent-of-code/utils";

const CHAR_BEAM = "|";
const CHAR_TACHYON_BEAM = "S";
const CHAR_SPLITTER = "^";

const drawBeam = (
  gridManager: GridManager,
  start: Position,
  splitter: Position | null
) => {
  let currentPosition = gridManager.move(start, DIRECTIONS.down);
  const grid = gridManager.getGrid();
  const endRow = splitter ? splitter.y : grid.length;

  while (currentPosition.y < endRow && gridManager.inBounds(currentPosition)) {
    gridManager.setCell(currentPosition, CHAR_BEAM);
    currentPosition = gridManager.move(currentPosition, DIRECTIONS.down);
  }
};

const simulateTachyonSplits = (
  gridManager: GridManager,
  startingPoint: Position,
  options: { print: boolean },
  countedSplitters = new Set<string>()
): { splitCount: number } => {
  const splitter = gridManager.walkUntil(
    startingPoint,
    DIRECTIONS.down,
    CHAR_SPLITTER
  );

  if (options.print) {
    drawBeam(gridManager, startingPoint, splitter);
  }

  if (!splitter) {
    return { splitCount: countedSplitters.size };
  }

  const splitterKey = GridManager.getPositionKey(splitter);

  if (countedSplitters.has(splitterKey)) {
    return { splitCount: countedSplitters.size };
  }

  countedSplitters.add(splitterKey);

  const left: Position = gridManager.move(splitter, DIRECTIONS.left);
  const right: Position = gridManager.move(splitter, DIRECTIONS.right);

  if (gridManager.inBounds(left)) {
    if (options.print) {
      gridManager.setCell(left, CHAR_BEAM);
    }

    simulateTachyonSplits(gridManager, left, options, countedSplitters);
  }

  if (gridManager.inBounds(right)) {
    if (options.print) {
      gridManager.setCell(right, CHAR_BEAM);
    }

    simulateTachyonSplits(gridManager, right, options, countedSplitters);
  }

  if (options.print) {
    gridManager.print("Simulate Tachyon Splits");
  }

  return { splitCount: countedSplitters.size };
};

export const getSplitCountTachyonManifold = (
  inputContent: string,
  options = { print: false }
): { splitCount: number } => {
  validatePuzzleInput(inputContent);
  const gridManager = new GridManager(inputContent);
  const startingPoint = gridManager.findCell(CHAR_TACHYON_BEAM);
  const { splitCount } = simulateTachyonSplits(
    gridManager,
    startingPoint,
    options
  );

  return { splitCount };
};

const computeQuantumTimelines = (
  gridManager: GridManager,
  startingPoint: Position,
  options: { print: boolean },
  memo = new Map<string, { countTimeline: number }>()
): { countTimeline: number } => {
  const positionKey = GridManager.getPositionKey(startingPoint);

  if (memo.has(positionKey)) {
    return { countTimeline: memo.get(positionKey)?.countTimeline! };
  }

  const splitter = gridManager.walkUntil(
    startingPoint,
    DIRECTIONS.down,
    CHAR_SPLITTER
  );

  if (options.print) {
    drawBeam(gridManager, startingPoint, splitter);
  }

  if (!splitter) {
    memo.set(positionKey, { countTimeline: 1 });

    return { countTimeline: 1 };
  }

  const left: Position = gridManager.move(splitter, DIRECTIONS.left);
  const right: Position = gridManager.move(splitter, DIRECTIONS.right);

  let countTimeline = 0;

  if (gridManager.inBounds(left)) {
    if (options.print) {
      gridManager.setCell(left, CHAR_BEAM);
    }

    countTimeline += computeQuantumTimelines(
      gridManager,
      left,
      options,
      memo
    ).countTimeline;
  }

  if (gridManager.inBounds(right)) {
    if (options.print) {
      gridManager.setCell(right, CHAR_BEAM);
    }

    countTimeline += computeQuantumTimelines(
      gridManager,
      right,
      options,
      memo
    ).countTimeline;
  }

  memo.set(positionKey, { countTimeline });

  if (options.print) {
    gridManager.print("Compute Quantum Timelines");
  }

  return { countTimeline };
};

export const getCountQuantumTimelinesTachyonManifold = (
  inputContent: string,
  options = { print: false }
): { countTimeline: number } => {
  validatePuzzleInput(inputContent);
  const gridManager = new GridManager(inputContent);
  const startingPoint = gridManager.findCell(CHAR_TACHYON_BEAM);
  const { countTimeline } = computeQuantumTimelines(
    gridManager,
    startingPoint,
    options
  );

  return { countTimeline };
};
