import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import config from '.';

const logDir = 'logs'; // logs 디렉토리 하위에 로그 파일 저장
const { combine, timestamp, printf, colorize } = winston.format;

// log 포맷 정의
const logFormat = printf((info) => {
  return `${info.timestamp} [${info.level}]: ${info.message}`;
});

const transports = [];

const stream = {
  write: (message: string) => {
    logger.info(message);
  },
};

// production 환경인 경우
if (config.env === 'production') {
  transports.push(
    // info
    new winstonDaily({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir,
      filename: `%DATE%.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
    // error
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/error',
      filename: `%DATE%_error.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
  );
}

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
  level: 'silly',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: transports,
});

export { logger, stream };
