import { loadFileSplitLines, loadFileString } from "../util";

type Calculation = {
  n: number[];
  op: "*" | "+";
};

const doCalculation = (c: Calculation): number => {
  if (c.op === "*") {
    return c.n.reduce((prev, curr) => prev * curr, 1);
  } else {
    return c.n.reduce((prev, curr) => prev + curr, 0);
  }
};

const parseCalculation = (s: string[]): Calculation => {
  const op = s.pop() as "*" | "+";
  return {
    op,
    n: s.map((x) => parseInt(x!)),
  };
};

// parses the calculations from top to bottom
const parseTopBottom = (data: string[][]): Calculation[] => {
  let calcs: Calculation[] = [];
  for (let i = 0; i < data[0]!.length; i++) {
    calcs = [...calcs, parseCalculation(data.map((x) => x[i]!))];
  }
  return calcs;
};

const part1 = async (data: string[][]): Promise<number> => {
  const calcs = parseTopBottom(data);
  return calcs.map(doCalculation).reduce((prev, curr) => prev + curr, 0);
};

const part2 = async (): Promise<number> => {
  return 0;
};

const run = async () => {
  const data = await loadFileSplitLines("input/06.txt");
  const split = data.map((x) => x.split(" ").filter((x) => x !== ""));
  console.log("part 1", await part1(split));
  console.log("part 2", await part2());
};

await run();
