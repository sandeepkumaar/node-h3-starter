import fs from "node:fs/promises";
const packageJson = JSON.parse(await fs.readFile("package.json", "utf-8"));
import createLogger from "../logger/index.js";
//import { v4 as uuid } from "uuid";
//import { proxyWithContext } from "./async-context.js";

export const logger = createLogger(packageJson.name);

export function httpLogMiddleware(event) {
  const { req, res } = event.node;
  const {requestId} = event.context
  let httpLog = logger.child({
    requestId,
    // other fields that need to be printed on all logs
  });
  event.context.log = httpLog;

  const startTime = Date.now();
  httpLog.info({req});
  res.on("finish", function () {
    res.responseTime = Date.now() - startTime;
    httpLog.info({res});
  });
}
//
///**
// * To use log within the request's context
// */
//const log = proxyWithContext(logger, "log");
//export default log;
