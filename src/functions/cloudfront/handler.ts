import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { text, textMock } from "./text";

import { decode } from 'jsonwebtoken';

const auth: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
  const { Authorization } = event.headers;

  const decodedToken = decode(Authorization, { json: true });

  let cloudFrontLink: string;
  let textComplement: { [key: string]: string };

  if (decodedToken.name === "iracema clara") {
    cloudFrontLink = process.env.PRIVATE_RESOURCE;
    textComplement = text;
  } else {
    cloudFrontLink = process.env.MOCK_RESOURCE;
    textComplement = textMock;
  }

  return formatJSONResponse(200, {
    cloudFrontLink,
    textComplement,
  });
};

export const main = middyfy(auth);
