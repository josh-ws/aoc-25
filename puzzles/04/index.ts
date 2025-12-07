import { loadFileSplitLines, loadFileString } from "../util";

const THRESHOLD = 4;

type Char = "@" | ".";
type Grid = Char[][];

const getPoint = (grid: Grid, x: number, y: number): Char => {
  if (x < 0 || y < 0 || y >= grid.length || x >= grid[0]!.length) {
    return ".";
  }
  return grid[y]![x]!;
};

const getAdjacent = (grid: Grid, x: number, y: number): Char[] => {
  let points: Char[] = [];
  for (let ix of [-1, 0, 1]) {
    for (let iy of [-1, 0, 1]) {
      if (ix === 0 && iy === 0) {
        continue;
      }
      points = [...points, getPoint(grid, x + ix, y + iy)];
    }
  }
  return points;
};

const countAdjacent = (grid: Grid, x: number, y: number): number => {
  return getAdjacent(grid, x, y).reduce(
    (prev, curr) => prev + (curr === "@" ? 1 : 0),
    0,
  );
};

const part1 = async () => {
  const lines: string[] = await loadFileSplitLines("input/04.txt");
  const grid = lines.map((x) => x.split("")) as Grid;
  let sum = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0]!.length; x++) {
      const isRoll = getPoint(grid, x, y) === "@";
      const isBelowThreshold = countAdjacent(grid, x, y) < THRESHOLD;
      if (isRoll && isBelowThreshold) {
        sum += 1;
      }
    }
  }
  return sum;
};

const part2 = async () => {
  const lines: string[] = await loadFileSplitLines("input/04.txt");
  const grid = lines.map((x) => x.split("")) as Grid;
  let sum = 0;
  while (true) {
    let currentTot = 0;
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[0]!.length; x++) {
        const isRoll = getPoint(grid, x, y) === "@";
        const isBelowThreshold = countAdjacent(grid, x, y) < THRESHOLD;
        if (isRoll && isBelowThreshold) {
          currentTot += 1;
          grid[y]![x] = ".";
        }
      }
    }
    sum += currentTot;
    if (currentTot === 0) {
      break;
    }
  }
  return sum;
};

const run = async () => {
  console.log("part 1", await part1());
  console.log("part 2", await part2());
};

await run();
