const loadFileString = async () => {
  const file = Bun.file(`${import.meta.dir}/data.txt`);
  return await file.text();
};

const run = async () => {
  const content = await loadFileString();
  console.log(content);
};

await run();
