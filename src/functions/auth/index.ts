import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'auth',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
        cors: {
          methods: ["ANY" as const],
          headers: ["mode", "content-type", "Access-Control-Allow-Origin", "origin"],
          origin: "*"
        }
      },
    },
  ],
};
