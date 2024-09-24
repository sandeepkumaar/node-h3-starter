import pino from 'pino'
import { customSerializers } from './serializers.js';



let defaultOpts = {
  level: process.env.LOG_LEVEL || "info",
  serializers: {
    ...pino.stdSerializers,
    ...customSerializers,
  },
  //formatters: {
  //  level: (label='') => ({level: label})
  //},
  transport: {
    target: 'pino/file'
  }
}


export default function createLogger(name='pino', opts={}) {
  let loggerOpts = {...defaultOpts, ...opts};
  return pino({
    name,
    ...loggerOpts
  })
    
}
