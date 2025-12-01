import { expect, test } from "bun:test";
import { part2 } from ".";

test("positive", () => {
  const result = part2(["R100", "R55"]);
  expect(result).toBe(2);
});

test("zero result", () => {
  const result = part2(["R30", "L80"]);
  expect(result).toBe(1);
});

test("increment and final zero", () => {
  const result = part2(["R100", "L50"]);
  expect(result).toBe(2);
});

test("decrement", () => {
  const result = part2(["L100"]);
  expect(result).toBe(1);
});

test("decrement and final zero", () => {
  const result = part2(["L100", "L50"]);
  expect(result).toBe(2);
});

test("decrement and final zero and inc", () => {
  const result = part2(["L100", "L50", "R10"]);
  expect(result).toBe(2);
});

test("sample", () => {
  const result = part2([
    "L68",
    "L30",
    "R48",
    "L5",
    "R60",
    "L55",
    "L1",
    "L99",
    "R14",
    "L82",
  ]);
  expect(result).toBe(6);
});

test("failing", () => {
  const result = part2(["L68", "L30", "R48"]);
  expect(result).toBe(2);
});
