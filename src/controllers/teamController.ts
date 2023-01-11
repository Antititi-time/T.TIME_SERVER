import { createTeamDto, participateTeamDto } from '../interfaces/DTO';
import { Request, Response, NextFunction } from 'express';
import { message, statusCode } from '../modules/constants';
import { success } from '../modules/constants/util';
import makeTeamId from '../modules/makeTeamId';
import { teamService } from '../services';

const makeTeam = async (req: Request, res: Response, next: NextFunction) => {
  const createTeamDto: createTeamDto = req.body;
  const teamId = makeTeamId();

  try {
    const data = await teamService.makeTeam(createTeamDto, teamId);

    return res
      .status(statusCode.CREATED)
      .send(success(statusCode.CREATED, message.CREATE_TEAM_SUCCESS, data));
  } catch (error) {
    next(error);
  }
};

const participateTeam = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { teamId } = req.params;
  const participateTeamDto: participateTeamDto = req.body;

  try {
    await teamService.duplicateName(participateTeamDto);
    const data = await teamService.participateTeam(participateTeamDto, +teamId);

    return res
      .status(statusCode.OK)
      .send(success(statusCode.OK, message.PARTICIPATE_TEAM_SUCCESS, data));
  } catch (error) {
    next(error);
  }
};

const checkTeamHappiness = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { teamId } = req.params;

  try {
    const data = await teamService.checkTeamHappiness(+teamId);

    return res
      .status(statusCode.OK)
      .send(success(statusCode.OK, message.CHECK_TEAM_HAPPINESS_SUCCESS, data));
  } catch (error) {
    next(error);
  }
};

const getTeamInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { teamId } = req.params;

  try {
    const data = await teamService.getTeamInfo(+teamId);

    return res
      .status(statusCode.OK)
      .send(success(statusCode.OK, message.READ_TEAM_INFO, data));
  } catch (error) {
    next(error);
  }
}

export default {
  makeTeam,
  participateTeam,
  checkTeamHappiness,
  getTeamInfo,
};
