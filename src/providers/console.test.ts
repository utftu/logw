import { describe, expect, test, vi } from "bun:test";
import { ConsoleProviderDev } from "./console.ts";

describe("ConsoleProviderDev", () => {
  test("prints an error only once and hides the error key from props", async () => {
    const errorValue = new Error("boom");
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const dirSpy = vi.spyOn(console, "dir").mockImplementation(() => {});
    try {
      const provider = new ConsoleProviderDev();
      provider.write({
        level: "error",
        message: "oops",
        prefix: "",
        props: { error: errorValue, userId: 1 },
      });
      expect(errorSpy).toHaveBeenCalledWith(errorValue);
      expect(dirSpy).toHaveBeenCalledTimes(1);
      expect(dirSpy.mock.calls[0]?.[0]).toEqual({ userId: 1 });
    } finally {
      errorSpy.mockRestore();
      dirSpy.mockRestore();
    }
  });
});