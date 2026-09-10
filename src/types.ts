type Level = "info" | "debug" | "warn" | "error";

export type LevelConfig = {
  info: boolean;
  debug: boolean;
  warn: boolean;
  error: boolean;
};

export type Props = Record<string, any>;

export type LogEnt = {
  level: Level;
  message: any;
  props: Props;
  prefix: string;
};

export type Provider = {
  write(logEnt: LogEnt): void | Promise<void>;
};
