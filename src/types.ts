import type { Logger } from "./logger.ts";

type Level = "info" | "debug" | "warn" | "error";

export type LevelConfig = {
  info: boolean;
  debug: boolean;
  warn: boolean;
  error: boolean;
};

export type Props = Record<string, any>;

export type LogEntInit = {
  level: Level;
  message: any;
  props: Props;
  prefix: string;
};

export type LogEnt = LogEntInit;

export type Provider = {
  write(logEnt: LogEnt): void | Promise<void>;
};
