import { checkUserHappinessDto } from '../interfaces/DTO';
import { Request, Response, NextFunction } from 'express';
import { message, statusCode } from '../modules/constants';
import { success, fail } from '../modules/constants/util';
import { resultService } from '../services';
import crypto from '../modules/crypto';

const userResult = async (req: Request, res: Response, next: NextFunction) => {
  const { userId, teamId } = req.params;
  const decodeId = +crypto.decodeId(userId);

  if (Number.isNaN(decodeId) || Number.isNaN(teamId)) {
    return res
      .status(statusCode.NOT_FOUND)
      .send(fail(statusCode.NOT_FOUND, message.NOT_FOUND));
  }
  try {
    const data = await resultService.userResult(decodeId, +teamId);

    return res
      .status(statusCode.OK)
      .send(success(statusCode.OK, message.READ_USER_RESULT_SUCCESS, data));
  } catch (error) {
    next(error);
  }
};

const teamResultByType = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { teamId } = req.params;

  if (Number.isNaN(teamId)) {
    return res
      .status(statusCode.NOT_FOUND)
      .send(fail(statusCode.NOT_FOUND, message.NOT_FOUND));
  }

  try {
    const data = await resultService.teamResultByType(+teamId);

    return res
      .status(statusCode.OK)
      .send(
        success(statusCode.OK, message.READ_TEAM_SCORE_BY_TYPE_SUCCESS, data),
      );
  } catch (error) {
    next(error);
  }
};

const getTeamResultType = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { teamId } = req.params;

  if (Number.isNaN(teamId)) {
    return res
      .status(statusCode.NOT_FOUND)
      .send(fail(statusCode.NOT_FOUND, message.NOT_FOUND));
  }

  try {
    const data = await resultService.getResultByType(+teamId);

    return res
      .status(statusCode.OK)
      .send(
        success(statusCode.OK, message.READ_TEAM_RESULT_TYPE_SUCCESS, data),
      );
  } catch (error) {
    next(error);
  }
};

const getTeamDetailResult = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { type } = req.query;
  const { teamId } = req.params;

  if (Number.isNaN(teamId)) {
    return res
      .status(statusCode.NOT_FOUND)
      .send(fail(statusCode.NOT_FOUND, message.NOT_FOUND));
  }

  try {
    const data = await resultService.getTeamDetailResult(
      +teamId,
      type as string,
    );

    return res
      .status(statusCode.OK)
      .send(
        success(statusCode.OK, message.READ_TEAM_DETAIL_RESULT_SUCCESS, data),
      );
  } catch (error) {
    next(error);
  }
};

const checkUserHappiness = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = res.locals.JwtPayload;
  const { teamId } = req.params;
  const checkUserHappinessDto: checkUserHappinessDto = req.body;

  try {
    const data = await resultService.checkUserHappiness(
      +userId,
      +teamId,
      checkUserHappinessDto,
    );
    return res
      .status(statusCode.OK)
      .send(success(statusCode.OK, message.CHAT_ANSWER_SUCCESS, data));
  } catch (error) {
    next(error);
  }
};

export default {
  userResult,
  teamResultByType,
  getTeamResultType,
  getTeamDetailResult,
  checkUserHappiness,
};
