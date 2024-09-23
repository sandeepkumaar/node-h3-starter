import { createApp, defineEventHandler, useBase } from 'h3';
import module from './module/index.js'


const app = createApp({
  debug: true, // adds stack to responses
  onRequest: (event) => {
    console.log('onRequest', event.node.req);
  },
  onAfterResponse: (event) => {
    console.log('onAfterResponse', event.node.res);
  },
  onBeforeResponse: (event) => {
    console.log('onBeforeResponse', event.node.res);
  },
  onError: (error) => {
    console.log('onError', error);
  },
});

app.use('/version', defineEventHandler((event) => {
  //return 'Hello world';
  return {
    name: 'sandeep'
  }

}));
app.use('/module/**', useBase('/module', module.handler));


export default app;
