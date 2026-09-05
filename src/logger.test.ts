import { describe, expect, test } from "bun:test";
import { Logger } from "./logger.ts";
import type { LogEnt, Provider } from "./types.ts";

const captureProvider = () => {
  const items: LogEnt[] = [];
  const provider: Provider = {
    write(logEnt) {
      items.push(logEnt);
    },
  };
  return { items, provider };
};

describe("Logger", () => {
  test("awaits provider writes", async () => {
    const { items, provider } = captureProvider();
    const logger = new Logger({ providers: [provider] });
    await logger.info("hello");
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({ level: "info", message: "hello" });
  });

  test("propagates provider write errors", async () => {
    const provider: Provider = {
      write() {
        throw new Error("disk full");
      },
    };
    const logger = new Logger({ providers: [provider] });
    await expect(logger.info("hello")).rejects.toThrow("disk full");
  });
});
