import { loadFileSplitLines, loadFileString } from "../util";

type Range = {
  from: number;
  to: number;
};

const parseRange = (range: string): Range => {
  const split = range.split("-");
  const from = parseInt(split[0]!);
  const to = parseInt(split[1]!);
  return { from, to };
};

const parseFile = (content: string): Range[] => {
  const parts = content.split(",").filter((x) => x !== "");
  return parts.map(parseRange);
};

const isInvalid = (value: number, allRepeats: boolean): boolean => {
  const str = value.toString();
  const half = Math.floor(str.length / 2);

  if (!allRepeats) {
    return (
      str.length % 2 === 0 && str.substring(0, half) === str.substring(half)
    );
  }

  for (let i = half; i >= 0; i--) {
    if (str.length % i !== 0) {
      continue;
    }

    let chunks: string[] = [];
    for (let j = 0; j < str.length; j += i) {
      chunks = [...chunks, str.substring(j, j + i)];
    }

    const match = chunks.every((x) => x === chunks[0]);
    if (match) {
      return true;
    }
  }
  return false;
};

const doProblem = async (isPartTwo: boolean) => {
  const content = await loadFileString("input/02.txt");
  const ranges = parseFile(content);
  let sum = 0;

  for (const range of ranges) {
    for (let i = range.from; i <= range.to; i++) {
      if (isInvalid(i, isPartTwo)) {
        sum += i;
      }
    }
  }
  return sum;
};

const part1 = async () => await doProblem(false);
const part2 = async () => await doProblem(true);

const run = async () => {
  console.log("part 1", await part1());
  console.log("part 2", await part2());
};

await run();

export { parseRange };
