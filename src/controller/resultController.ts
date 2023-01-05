import { Request, Response } from 'express';
import { message, statusCode } from '../constants';
import { fail, success } from '../constants/util';
import { slackMessage } from '../modules/returnToSlackMessage';
import { sendMessageToSlack } from '../modules/slackAPI';
import { resultService } from '../service';

const userResult = async (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!userId) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }

  try {
    const data = await resultService.userResult(+userId);

    if (!data) {
      return res
        .status(statusCode.NOT_FOUND)
        .send(fail(statusCode.NOT_FOUND, message.NOT_FOUND));
    }
    return res
      .status(statusCode.OK)
      .send(success(statusCode.OK, message.READ_USER_RESULT_SUCCESS, data));
  } catch (error) {
    console.log(error);
    const errorMessage: string = slackMessage(
      req.method.toUpperCase(),
      req.originalUrl,
      error,
      req.body.user?.id,
    );
    sendMessageToSlack(errorMessage);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR),
      );
  }
};

const teamResultByType = async (req: Request, res: Response) => {
  const { teamId } = req.params;
  if (!teamId) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }

  try {
    const data = await resultService.teamResultByType(+teamId);

    if (!data) {
      return res
        .status(statusCode.NOT_FOUND)
        .send(fail(statusCode.NOT_FOUND, message.NOT_FOUND));
    }
    return res
      .status(statusCode.OK)
      .send(
        success(statusCode.OK, message.READ_TEAM_SCORE_BY_TYPE_SUCCESS, data),
      );
  } catch (error) {
    console.log(error);
    const errorMessage: string = slackMessage(
      req.method.toUpperCase(),
      req.originalUrl,
      error,
      req.body.user?.id,
    );
    sendMessageToSlack(errorMessage);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR),
      );
  }
};

const getTeamResultType = async (req: Request, res: Response) => {
  const { teamId } = req.params;
  if (!teamId) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }

  try {
    const data = await resultService.getResultByType(+teamId);

    if (!data) {
      return res
        .status(statusCode.NOT_FOUND)
        .send(fail(statusCode.NOT_FOUND, message.NOT_FOUND));
    }
    return res
      .status(statusCode.OK)
      .send(
        success(statusCode.OK, message.READ_TEAM_RESULT_TYPE_SUCCESS, data),
      );
  } catch (error) {
    console.log(error);
    const errorMessage: string = slackMessage(
      req.method.toUpperCase(),
      req.originalUrl,
      error,
      req.body.user?.id,
    );
    sendMessageToSlack(errorMessage);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR),
      );
  }
};

const getTeamDetailResult = async (req: Request, res: Response) => {
  const { type } = req.query;
  const { teamId } = req.params;
  if (!teamId) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }

  try {
    const data = await resultService.getTeamDetailResult(
      +teamId,
      type as string,
    );

    if (!data) {
      return res
        .status(statusCode.NOT_FOUND)
        .send(fail(statusCode.NOT_FOUND, message.NOT_FOUND));
    }
    return res
      .status(statusCode.OK)
      .send(
        success(statusCode.OK, message.READ_TEAM_DETAIL_RESULT_SUCCESS, data),
      );
  } catch (error) {
    console.log(error);
    const errorMessage: string = slackMessage(
      req.method.toUpperCase(),
      req.originalUrl,
      error,
      req.body.user?.id,
    );
    sendMessageToSlack(errorMessage);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR),
      );
  }
};
export default {
  userResult,
  teamResultByType,
  getTeamResultType,
  getTeamDetailResult,
};
