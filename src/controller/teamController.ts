import { sendMessageToSlack } from './../modules/slackAPI';
import { Request, Response } from 'express';
import { message, statusCode } from '../constants';
import { fail, success } from '../constants/util';
import makeTeamCode from '../modules/makeTeamCode';
import { slackMessage } from '../modules/returnToSlackMessage';
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

  try {
    const data = await teamService.participateTeam(nickname, teamCode);

    if (!data) {
      return res
        .status(statusCode.NOT_FOUND)
        .send(fail(statusCode.NOT_FOUND, message.NOT_FOUND));
    }

    return res
      .status(statusCode.OK)
      .send(success(statusCode.OK, message.PARTICIPATE_TEAM_SUCCESS, data));
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

const checkTeamHappiness = async (req: Request, res: Response) => {
  const { teamCode } = req.params;

  if (!teamCode)
    return res
      .status(statusCode.BAD_REQUEST)
      .send(fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
  try {
    const data = await teamService.checkTeamHappiness(teamCode);

    if (!data) {
      return res
        .status(statusCode.NOT_FOUND)
        .send(fail(statusCode.NOT_FOUND, message.NOT_FOUND));
    }

    return res
      .status(statusCode.OK)
      .send(success(statusCode.OK, message.CHECK_TEAM_HAPPINESS_SUCCESS, data));
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
  makeTeam,
  participateTeam,
  checkTeamHappiness,
};
