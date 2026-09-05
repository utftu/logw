import { LoggerCore } from "./core.ts";
import { getConsoleProvider } from "./providers/console.ts";
import type { LevelConfig, Props, Provider } from "./types.ts";

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
  props: Props = {};

  constructor({ prefix = "", core, levelConfig, providers }: LoggerProps = {}) {
    this.core = core ?? new LoggerCore(providers ?? [getConsoleProvider()]);
    this.prefix = prefix;
    this.levelConfig = { ...defaultLevelConfig, ...levelConfig };
  }

  async log(text: string): Promise<void> {
    return this.info(text);
  }

  async info(text: string): Promise<void> {
    if (this.levelConfig.info === false) {
      return;
    }
    await this.core.write({
      level: "info",
      message: text,
      prefix: this.prefix,
      props: this.props,
    });
  }

  async debug(text: string): Promise<void> {
    if (this.levelConfig.debug === false) {
      return;
    }
    await this.core.write({
      level: "debug",
      message: text,
      props: this.props,
      prefix: this.prefix,
    });
  }

  async warn(text: string): Promise<void> {
    if (this.levelConfig.warn === false) {
      return;
    }
    await this.core.write({
      level: "warn",
      message: text,
      prefix: this.prefix,
      props: this.props,
    });
  }

  async error(text: string, error?: Error): Promise<void> {
    if (this.levelConfig.error === false) {
      return;
    }
    await this.core.write({
      level: "error",
      message: text,
      prefix: this.prefix,
      props: {
        ...this.props,
        error,
      },
    });
  }

  child({
    prefix,
    props,
  }: {
    prefix?: string;
    props?: Props;
  }): Logger {
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

export function copyLogger(logger: Logger): Logger {
  const newLogger = new Logger({
    prefix: logger.prefix,
    core: logger.core,
  });
  newLogger.levelConfig = { ...logger.levelConfig };
  newLogger.props = { ...logger.props };
  return newLogger;
}
