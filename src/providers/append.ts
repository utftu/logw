import { appendFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";

export async function appendFileWrppaer(filePath: string, data: string) {
  const dir = dirname(filePath);
  await mkdir(dir, { recursive: true });
  await appendFile(filePath, data, { encoding: "utf8" });
}