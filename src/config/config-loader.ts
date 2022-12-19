export const configLoadeer = () => {
  return {
    port: process.env.PORT,
    database: { uri: process.env.DATABASE_URL },
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
  };
};
