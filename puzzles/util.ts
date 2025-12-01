const loadFileString = async (path: string) => {
  const file = Bun.file(path);
  return await file.text();
};

const loadFileSplitLines = async (path: string) => {
  const data = await loadFileString(path);
  return data.split("\n").filter((x) => x !== "");
};

export { loadFileString, loadFileSplitLines };
