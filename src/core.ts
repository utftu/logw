import type { LogEnt, Provider } from "./types.ts";

export class LoggerCore {
  private writers: WritableStreamDefaultWriter<LogEnt>[] = [];

  constructor(providers: Provider[] = []) {
    for (const provider of providers) {
      this.writers.push(provider.writer.getWriter());
    }
  }

  addProvider(provider: Provider) {
    this.writers.push(provider.writer.getWriter());
  }

  write(logEnt: LogEnt) {
    for (const writer of this.writers) {
      writer.write(logEnt);
    }
  }
}
