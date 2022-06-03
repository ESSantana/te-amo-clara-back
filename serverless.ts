import type { AWS } from '@serverless/typescript';

import { auth, cloudfront } from '@functions/index';

const serverlessConfiguration: AWS = {
  service: 'te-amo-clara-back',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'sa-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      SITE_PASSWORD: "${ssm:/site-password}",
      PRIVATE_RESOURCE: "${ssm:/private-front-end-resource}",
      MOCK_RESOURCE: "${ssm:/mock-front-end-resource}",
    },
  },
  // import the function via paths
  functions: { auth, cloudfront },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
