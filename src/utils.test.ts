import { describe, expect, test } from "bun:test";
import type { LogEnt } from "./types.ts";
import { formatToJson } from "./utils.ts";

describe("formatToJson", () => {
  test("does not throw when props.error is not an Error", () => {
    const ent: LogEnt = {
      level: "error",
      message: "boom",
      prefix: "",
      props: { error: null, userId: 1 },
    };
    expect(() => formatToJson(ent)).not.toThrow();
    const parsed = JSON.parse(formatToJson(ent));
    expect(parsed).toMatchObject({ level: "error", msg: "boom", error: null, userId: 1 });
  });

  test("formats real Error instances", () => {
    const error = new Error("boom");
    const ent: LogEnt = {
      level: "error",
      message: "failed",
      prefix: "",
      props: { error, userId: 1 },
    };
    const parsed = JSON.parse(formatToJson(ent));
    expect(parsed.error).toMatchObject({ message: "boom" });
  });
});
