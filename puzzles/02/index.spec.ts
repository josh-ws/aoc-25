import { expect, test } from "bun:test";
import { parseRange } from ".";

test("parseRange", () => {
  expect(parseRange("22-33")).toContainValues([22, 33]);
});
