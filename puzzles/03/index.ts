import { loadFileSplitLines, loadFileString } from "../util";

type Bank = number[];

const parseBank = (input: string): Bank => {
  return input.split("").map((x) => parseInt(x, 10));
};

const part1 = async () => {
  const data = await loadFileSplitLines("input/03.txt");
  const banks = data.map(parseBank);

  let output = 0;
  for (const bank of banks) {
    let largest = 0;
    let index = 0;
    let second = 0;
    for (let i = 0; i < bank.length - 1; i++) {
      if (bank[i]! > largest) {
        largest = bank[i]!;
        index = i;
      }
    }
    for (let i = index + 1; i < bank.length; i++) {
      if (bank[i]! > second) {
        second = bank[i]!;
      }
    }
    output += largest * 10 + second;
  }
  return output;
};

const part2 = async () => {
  const data = await loadFileSplitLines("input/03.txt");
  const banks = data.map(parseBank);

  let output = 0;
  for (const bank of banks) {
    const largest: number[] = Array.from({ length: 12 }, () => 0);
    let lastIndex = -1;
    for (let i = 0; i < 12; i++) {
      for (let j = lastIndex + 1; j < bank.length - (11 - i); j++) {
        if (bank[j]! > largest[i]!) {
          lastIndex = j;
          largest[i] = bank[j]!;
        }
      }
    }
    output += parseInt(largest.join(""));
  }
  return output;
};

const run = async () => {
  console.log("part 1", await part1());
  console.log("part 2", await part2());
};

await run();
