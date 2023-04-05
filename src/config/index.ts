import dotenv from 'dotenv';

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * env
   */
  env: process.env.NODE_ENV as string,
  /**
   * port
   */
  port: parseInt(process.env.PORT as string, 10) as number,
  /**
   * webhookURL
   */
  webhookURL: process.env.SLACK_WEBHOOK_URL as string,
  /**
   * EC2
   */
  ec2URL: process.env.EC2_URL as string,
  /**
   * JWT
   */
  jwtSecret: process.env.JWT_SECRET as string,
  jwtAlgo: process.env.JWT_ALGORITHM as string,
  /**
   * SENTRY
   */
  sentryDsn: process.env.SENTRY_DSN as string,
  sentryEnvironment: process.env.SENTRY_ENVIRONMENT as string,

  /**
   * CRYTO
   */
  cryptoKey: process.env.CRYPTO_KEY as string,
};
