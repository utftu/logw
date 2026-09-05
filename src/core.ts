import type { LogEnt, Provider } from "./types.ts";

export class LoggerCore {
  private providers: Provider[] = [];

  constructor(providers: Provider[] = []) {
    this.providers = [...providers];
  }

  addProvider(provider: Provider): void {
    this.providers.push(provider);
  }

  async write(logEnt: LogEnt): Promise<void> {
    await Promise.all(this.providers.map((provider) => provider.write(logEnt)));
  }
}
