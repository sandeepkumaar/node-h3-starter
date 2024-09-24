import {
  getHeader,
  appendHeader,
} from 'h3'
import { v4 as uuid } from 'uuid'
/**
 * event.node.req  // http.IncomingMessage
 * event.node.res  // http.ServerResponse
*/
export function requestId(event) {
  let requestId = getHeader(event, 'X-Request-ID') || uuid();
  event.context.requestId = requestId;
  appendHeader(event, 'X-Request-ID', requestId);
  event.node.res.on('finish', (e) => {
    console.log('finished', e);
  });
}

