export default {
  type: "object",
  properties: {
    encryptedPassword: { type: 'string' }
  },
  required: ['encryptedPassword']
} as const;
