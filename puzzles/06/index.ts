import { loadFileSplitLines, loadFileString } from "../util";

type Calculation = {
  n: number[];
  op: string;
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

const part1 = async (): Promise<number> => {
  const data = await loadFileSplitLines("input/06.txt");
  const split = data.map((x) => x.split(" ").filter((x) => x !== ""));

  const calcs = parseTopBottom(split);
  return calcs.map(doCalculation).reduce((prev, curr) => prev + curr, 0);
};

const part2 = async (): Promise<number> => {
  const data = await loadFileSplitLines("input/06.txt");

  let calcs: Calculation[] = [];
  let nums: string[] = [];
  let num = "";
  let op = "";
  for (let i = data[0]!.length - 1; i >= 0; i--) {
    for (let j = 0; j < data.length; j++) {
      const line = data[j];
      if (j === data.length - 1) {
        if (num !== "") {
          nums = [...nums, num];
        }
        if (line![i] === "*" || line![i] === "+") {
          op = line![i]!;
          calcs = [...calcs, { op, n: nums.map((n) => parseInt(n)) }];
          nums = [];
        }
        num = "";
      } else if (line![i] !== " ") {
        num += line![i];
      }
    }
  }
  return calcs.map(doCalculation).reduce((prev, curr) => prev + curr, 0);
};

const run = async () => {
  console.log("part 1", await part1());
  console.log("part 2", await part2());
};

await run();
