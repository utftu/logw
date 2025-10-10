import { Logger, type LoggerProps } from "./logger.ts";
import { ConsoleProviderDev, ConsoleProviderProd } from "./console-provider.ts";
import { FileProvider } from "./file-provider.ts";

export const createLogger = (props: LoggerProps = {}) => {
  return new Logger(props);
};

export { Logger, ConsoleProviderDev, ConsoleProviderProd, FileProvider };
