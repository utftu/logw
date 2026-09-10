import type { LogEnt, Props, Provider } from "../types.ts";
import { formatToJson } from "../utils.ts";

function formatMessage(logEnt: LogEnt): string {
  if (logEnt.prefix === "") {
    return logEnt.message;
  }
  return `${logEnt.prefix}: ${logEnt.message}`;
}

function checkObjEmpty(obj: Props): boolean {
  return Object.keys(obj).length === 0;
};

export class ConsoleProviderDev implements Provider {
  write(logEnt: LogEnt): void {
    const formattedMessage = formatMessage(logEnt);
    const props = { ...logEnt.props };
    if (logEnt.level === "info") {
      console.log(formattedMessage);
    } else if (logEnt.level === "debug") {
      console.debug(formattedMessage);
    } else if (logEnt.level === "warn") {
      console.warn(formattedMessage);
    } else if (logEnt.level === "error") {
      console.error(formattedMessage);
      if ("error" in props) {
        console.error(logEnt.props.error);
        delete props.error;
      }
    }

    if (!checkObjEmpty(props)) {
      console.dir(props);
    }
  }
}

export class ConsoleProviderProd implements Provider {
  write(logEnt: LogEnt): void {
    const json = formatToJson(logEnt);
    if (logEnt.level === "info") {
      console.log(json);
    } else if (logEnt.level === "debug") {
      console.debug(json);
    } else if (logEnt.level === "warn") {
      console.warn(json);
    } else if (logEnt.level === "error") {
      console.error(json);
    }
  }
}

export function getConsoleProvider(): ConsoleProviderDev | ConsoleProviderProd {
  if (process.env.NODE_ENV === "production") {
    return new ConsoleProviderProd();
  }
  return new ConsoleProviderDev();
}