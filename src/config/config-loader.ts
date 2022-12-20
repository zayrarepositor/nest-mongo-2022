import { env } from 'process';

export const configLoader = () => {
  return {
    port: env.PORT,
    database: { uri: env.DATABASE_URL },
    apiKey: env.API_KEY,
    jwtSecret: env.JWT_SECRET,
  };
};
