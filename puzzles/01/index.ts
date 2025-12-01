const START_POSITION = 50;

const loadFileString = async () => {
  const file = Bun.file(`${import.meta.dir}/data.txt`);
  return await file.text();
};

const part1 = (lines: string[]) => {
  let i = START_POSITION;
  let zeroCount = 0;

  for (const line of lines) {
    const sum = parseInt(line.substring(1)) * (line[0] === "L" ? -1 : 1);
    i = (i + sum) % 100;
    if (i === 0) {
      zeroCount++;
    }
  }

  return zeroCount;
};

export const part2 = (lines: string[]) => {
  let cur = START_POSITION;
  let zeros = 0;

  for (const line of lines) {
    const isLeft = line[0] === "L";
    const tot = parseInt(line.substring(1));

    for (let i = 0; i < tot; i++) {
      cur = (cur + (isLeft ? -1 : 1)) % 100;
      if (cur === 0) {
        zeros += 1;
      }
    }
  }
  return zeros;
};

const run = async () => {
  const content = await loadFileString();
  const lines = content.split("\n").filter((x) => x !== "");
  console.log("Part 1:", part1(lines));
  console.log("Part 2:", part2(lines));
};

await run();
