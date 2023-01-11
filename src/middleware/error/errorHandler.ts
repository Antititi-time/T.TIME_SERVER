import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import config from '../../config/index';
import responseMessage from '../../modules/constants/responseMessage';
import { fail } from '../../modules/constants/util';
import { ErrorWithStatusCode } from './errorGenerator';
import { slackMessage } from '../../modules/returnToSlackMessage';
import { sendMessageToSlack } from '../../modules/slackAPI';

const generalErrorHandler: ErrorRequestHandler = (
  error: ErrorWithStatusCode,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { message, statusCode } = error;
  // 인자로 statusCode를 넘기지 않는 경우, 500 에러를 보냄
  if (!statusCode || statusCode == 500) {
    if (config.env === 'production') {
      const errorMessage: string = slackMessage(
        req.method.toUpperCase(),
        req.originalUrl,
        error.stack,
        req.body.user?.id,
      );
      sendMessageToSlack(errorMessage);
    }
    return res
      .status(500)
      .send(fail(500, responseMessage.INTERNAL_SERVER_ERROR));
  } else {
    return res.status(statusCode).send(fail(statusCode, message));
  }
};

export default generalErrorHandler;
