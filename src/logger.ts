import { LoggerCore } from "./core.ts";
import { getConsoleProvider } from "./console-provider.ts";
import type { LevelConfig, Provider } from "./types.ts";

const defaultLevelConfig: LevelConfig = {
  info: true,
  debug: true,
  warn: true,
  error: true,
};

export type LoggerProps = {
  providers?: Provider[];
  prefix?: string;
  core?: LoggerCore;
  levelConfig?: Partial<LevelConfig>;
};

export class Logger {
  core: LoggerCore;
  prefix: string;
  levelConfig: LevelConfig;
  props: Record<string, any> = {};

  constructor({ prefix = "", core, levelConfig, providers }: LoggerProps = {}) {
    this.core = core ?? new LoggerCore(providers ?? [getConsoleProvider()]);
    this.prefix = prefix;
    this.levelConfig = { ...defaultLevelConfig, ...levelConfig };
  }

  log(text: string) {
    return this.info(text);
  }

  info(text: string) {
    if (this.levelConfig.info === false) {
      return;
    }
    this.core.write({
      level: "info",
      message: text,
      prefix: this.prefix,
      props: this.props,
    });
  }

  debug(text: string) {
    if (this.levelConfig.debug === false) {
      return;
    }
    this.core.write({
      level: "debug",
      message: text,
      props: this.props,
      prefix: this.prefix,
    });
  }

  warn(text: string) {
    if (this.levelConfig.warn === false) {
      return;
    }
    this.core.write({
      level: "warn",
      message: text,
      prefix: this.prefix,
      props: this.props,
    });
  }

  error(text: string, error?: Error) {
    if (this.levelConfig.error === false) {
      return;
    }
    this.core.write({
      level: "error",
      message: text,
      prefix: this.prefix,
      props: {
        ...this.props,
        error,
      },
    });
  }

  child({ prefix, props }: { prefix?: string; props?: Record<string, any> }) {
    const newLogger = copyLogger(this);
    if (typeof prefix === "string") {
      newLogger.prefix = prefix;
    }
    newLogger.props = {
      ...this.props,
      ...props,
    };
    return newLogger;
  }
}

export const copyLogger = (logger: Logger) => {
  const newLogger = new Logger({
    prefix: logger.prefix,
    core: logger.core,
  });
  newLogger.levelConfig = { ...logger.levelConfig };
  newLogger.props = { ...logger.props };
  return newLogger;
};
