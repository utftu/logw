import type { LogEnt } from "./types.ts";

const isError = (value: unknown): value is Error => value instanceof Error;

export function formatToJson(logEnt: LogEnt): string {
  const objToJson: Record<string, any> = {
    level: logEnt.level,
    prefix: logEnt.prefix,
    time: new Date().toISOString(),
    msg: logEnt.message,
    ...logEnt.props,
  };

  if (isError(logEnt.props.error)) {
    objToJson.error = {
      message: logEnt.props.error.message,
      stack: logEnt.props.error.stack,
    };
  }

  if (objToJson.msg === "") {
    delete objToJson.msg;
  }

  if (objToJson.prefix === "") {
    delete objToJson.prefix;
  }

  const json = JSON.stringify(objToJson);

  return json;
}
