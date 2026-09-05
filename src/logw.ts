import { Logger, type LoggerProps } from "./logger.ts";
import {
  ConsoleProviderDev,
  ConsoleProviderProd,
} from "./providers/console.ts";
import { FileProvider } from "./providers/file.ts";

export const createLogger = (props: LoggerProps = {}) => {
  return new Logger(props);
};

export { Logger, ConsoleProviderDev, ConsoleProviderProd, FileProvider };
