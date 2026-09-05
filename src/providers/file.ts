import { appendFileWrppaer } from "./append.ts";
import { formatToJson } from "../utils.ts";
import type { LogEnt, Provider } from "../types.ts";

export type FileProviderOptions = {
  errorPath?: string;
  infoPath: string;
  warnPath?: string;
  debugPath?: string;
};

export class FileProvider implements Provider {
  formatter = formatToJson;
  private pathsToFiles: {
    errorPath: string;
    debugPath: string;
    warnPath: string;
    infoPath: string;
  };

  constructor({
    errorPath,
    debugPath,
    warnPath,
    infoPath,
  }: FileProviderOptions) {
    this.pathsToFiles = {
      infoPath,
      errorPath: errorPath ?? infoPath,
      warnPath: warnPath ?? infoPath,
      debugPath: debugPath ?? infoPath,
    };
  }

  async write(logEnt: LogEnt) {
    if (logEnt.level === "info") {
      await this.appendFile(this.formatter(logEnt), this.pathsToFiles.infoPath);
    } else if (logEnt.level === "debug") {
      await this.appendFile(this.formatter(logEnt), this.pathsToFiles.debugPath);
    } else if (logEnt.level === "error") {
      await this.appendFile(this.formatter(logEnt), this.pathsToFiles.errorPath);
    } else if (logEnt.level === "warn") {
      await this.appendFile(this.formatter(logEnt), this.pathsToFiles.warnPath);
    }
  }

  async appendFile(str: string, pathToFile: string) {
    await appendFileWrppaer(pathToFile, str + "\n");
  }
}