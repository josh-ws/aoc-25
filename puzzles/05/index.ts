import { loadFileSplitLines, loadFileString } from "../util";

type Range = {
  from: number;
  to: number;
};

type Database = {
  freshIngredients: Range[];
  ingredients: number[];
};

const parseDatabase = (data: string[]): Database => {
  const db: Database = { freshIngredients: [], ingredients: [] };
  for (const line of data) {
    if (line.includes("-")) {
      const [from, to, rest] = line.split("-");
      const range = { from: parseInt(from!), to: parseInt(to!) };
      db.freshIngredients.push(range);
    } else {
      db.ingredients = [...db.ingredients, parseInt(line)];
    }
  }
  return db;
};

const isOverlap = (first: Range, second: Range): boolean => {
  return (
    (first.from >= second.from && first.from <= second.to) ||
    (first.to >= second.from && first.to <= second.to)
  );
};

/*
const fixRanges = (data: Range[]): Range[] => {
  let remove: number[] = [];
  for (let i = 1; i < data.length; i++) {
    let { from, to } = data[i]!;
    for (let j = 0; j < i; j++) {
      const second = data[j]!;
      if (isOverlap({ from, to }, second)) {
        from = Math.min(from, second.from);
        to = Math.max(to, second.to);
        remove = [...remove, j];
      }
    }
    data[i]!.from = from;
    data[i]!.to = to;
  }
  return data.filter((_, i) => !remove.includes(i));
};
*/

const isFresh = (db: Database, id: number): boolean => {
  for (const fresh of db.freshIngredients) {
    if (id >= fresh.from && id <= fresh.to) {
      return true;
    }
  }
  return false;
};

const part1 = async (db: Database): Promise<number> => {
  const fresh = db.ingredients.filter((x) => isFresh(db, x));
  return fresh.length;
};

const part2 = async (db: Database): Promise<number> => {
  return 0;
};

const run = async () => {
  var data = await loadFileSplitLines("input/05.txt");
  const db = parseDatabase(data);
  console.log("part 1", await part1(db));
  console.log("part 2", await part2(db));
};

await run();
