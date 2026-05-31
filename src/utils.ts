import type { LogEnt } from "./types.ts";

export const formatToJson = (logEnt: LogEnt) => {
  const objToJson: Record<string, any> = {
    level: logEnt.level,
    prefix: logEnt.prefix,
    time: new Date().toISOString(),
    msg: logEnt.message,
    ...logEnt.props,
  };

  if ("error" in logEnt.props) {
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
};
