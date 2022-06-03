import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'cloudfront',
        cors: {
          methods: ["ANY" as const],
          headers: ["mode", "Access-Control-Allow-Origin", "origin", "Authorization"],
          origin: "*"
        }
      },
    },
  ],
};
