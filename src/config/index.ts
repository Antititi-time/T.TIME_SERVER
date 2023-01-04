import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * port
   */
  port: parseInt(process.env.PORT as string, 10) as number,
  /**
   * webhookURL
   */
  webhookURL: process.env.SLACK_WEBHOOK_URL as string,
};
