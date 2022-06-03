import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { AES, enc } from "crypto-js";
import { sign } from 'jsonwebtoken';

import schema from './schema';

const auth: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const { encryptedPassword } = event.body;
  const password = AES.decrypt(encryptedPassword, "grinch").toString(enc.Utf8);

  let payload = {
    name: 'outros',
    userId: 9,
    accessTypes: [
      'verSiteMocado'
    ]
  };

  if (password.toLowerCase() === process.env.SITE_PASSWORD) {
    payload = {
      name: 'iracema clara',
      userId: 1,
      accessTypes: [
        'fazerTudo'
      ]
    };
  }


  const token = sign(payload, "grinch", {
    algorithm: 'HS256',
    expiresIn: '1h',
  })

  return formatJSONResponse(200, {
    token,
  });
};

export const main = middyfy(auth);
