import {
  checkUserHappinessDto,
  makePersonalResultDto,
} from '../interfaces/DTO';
import { Request, Response, NextFunction } from 'express';
import { message, statusCode } from '../modules/constants';
import { success } from '../modules/constants/util';
import { resultService } from '../services';

const userResult = async (req: Request, res: Response, next: NextFunction) => {
  const { userId, teamId } = req.params;

  try {
    const data = await resultService.userResult(+userId, +teamId);

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
