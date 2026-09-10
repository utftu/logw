import { appendFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";

export async function appendFileWrapper(filePath: string, data: string): Promise<void> {
  const dir = dirname(filePath);
  await mkdir(dir, { recursive: true });
  await appendFile(filePath, data, { encoding: "utf8" });
}