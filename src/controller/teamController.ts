import { Request, Response } from 'express';
import { message, statusCode } from '../constants';
import { fail, success } from '../constants/util';
import makeTeamCode from '../modules/makeTeamCode';
import { teamService } from '../service';

const makeTeam = async (req: Request, res: Response) => {
  const { teamName, teamMember } = req.body;
  if (!teamName || !teamMember) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }

  const teamCode = makeTeamCode();

  const data = await teamService.makeTeam(teamName, teamMember, teamCode);

  return res
    .status(statusCode.CREATED)
    .send(success(statusCode.CREATED, message.CREATE_TEAM_SUCCESS, data));
};

const participateTeam = async (req: Request, res: Response) => {
  const { teamCode } = req.params;
  const { nickname } = req.body;

  if (!teamCode || !nickname) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }

  const data = await teamService.participateTeam(nickname, teamCode);

  if (!data) {
    return res
      .status(statusCode.NOT_FOUND)
      .send(fail(statusCode.NOT_FOUND, message.NOT_FOUND));
  }

  return res
    .status(statusCode.OK)
    .send(success(statusCode.OK, message.PARTICIPATE_TEAM_SUCCESS, data));
};
export default {
  makeTeam,
  participateTeam,
};
