import { loadFileSplitLines, loadFileString } from "../util";

const part1 = async (): Promise<number> => {
  const lines = await loadFileSplitLines("input/07.txt");
  const beams = new Set<number>();
  beams.add(lines[0]!.indexOf("S"));

  let sum = 0;
  for (const line of lines) {
    for (const beam of beams) {
      if (line[beam] === "^") {
        beams.delete(beam);
        beams.add(beam + 1);
        beams.add(beam - 1);
        sum += 1;
      }
    }
  }
  return sum;
};

const part2 = async (): Promise<number> => {
  return 0;
};

const run = async () => {
  console.log("part 1", await part1());
  console.log("part 2", await part2());
};

await run();
