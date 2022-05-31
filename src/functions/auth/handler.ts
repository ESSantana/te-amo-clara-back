import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { AES, enc } from "crypto-js";
import { sign } from 'jsonwebtoken';

import schema from './schema';

const auth: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const { encryptedPassword } = event.body;
  console.log({sitePass: process.env.SITE_PASSWORD, encryptedPassword});
  const password = AES.decrypt(encryptedPassword, "grinch").toString(enc.Utf8);

  
  if (password !== process.env.SITE_PASSWORD) {
    return formatJSONResponse(403, {
      message: "Senha totalmente errada meu nobre",
    });
  }

  const payload = {
    name: 'Iracema Clara',
    userId: 1,
    accessTypes: [
      'verTudo',
      'fazerTudo'
    ]
  };

  const token = sign(payload, "grinch", {
    algorithm: 'HS256',
    expiresIn: '1h',
  })

  return formatJSONResponse(200, {
    token,
  });
};

export const main = middyfy(auth);
