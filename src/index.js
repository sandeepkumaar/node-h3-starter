import {
  createApp,
  defineEventHandler,
  useBase,
  getResponseHeaders,
} from "h3";

import module from "./module/index.js";
import { requestId } from '../middlewares/request-id.js'
import {logger, httpLogMiddleware} from './logger.js';
//import pinoHttp from 'pino-http';
//const httpLog = pinoHttp({});

const app = createApp({
  debug: true, // adds stack to responses
  onRequest: (event) => {
  },
  onAfterResponse: (event) => {
  },
  onBeforeResponse: (event) => {
    //console.log("onBeforeResponse", event.node.res);
  },
  onError: (error) => {
    logger.error(error);
  },
});

app.use(defineEventHandler(requestId));
app.use(defineEventHandler(httpLogMiddleware));
app.use(
  "/version",
  defineEventHandler((event) => {
    let { requestId } = event.context;
    return {
      requestId,
      responseHeaders: getResponseHeaders(event),
    };
  })
);

app.use("/module/**", useBase("/module", module.handler));

export default app;
