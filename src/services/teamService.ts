import { createTeamDto, participateTeamDto } from '../interfaces/DTO';
import { PrismaClient } from '@prisma/client';
import errorGenerator from '../middleware/error/errorGenerator';
import { message, statusCode } from '../modules/constants';
const prisma = new PrismaClient();

const makeTeam = async (createTeamDto: createTeamDto, teamId: number) => {
  try {
    const team = await prisma.team.create({
      data: {
        id: teamId,
        teamName: createTeamDto.teamName,
        teamMember: createTeamDto.teamMember,
      },
    });
    return team;
  } catch (error) {
    throw error;
  }
};

const participateTeam = async (
  participateTeamDto: participateTeamDto,
  teamId: number,
) => {
  try {
    const user = await prisma.nickname.create({
      data: {
        name: participateTeamDto.nickname,
      },
    });

    const joinTeam = await prisma.team_user.create({
      data: {
        userId: user.id,
        teamId: teamId,
        isCompleted: false,
      },
    });

    const teamInfo = await prisma.team.findFirst({
      where: {
        id: teamId,
      },
    });

    const data = {
      userId: joinTeam.userId,
      teamId: teamInfo?.id,
      teamName: teamInfo?.teamName,
    };

    return data;
  } catch (error) {
    throw error;
  }
};

const checkTeamHappiness = async (teamId: number) => {
  try {
    const checkHappiness = await prisma.team_user.findMany({
      where: {
        teamId: teamId,
        isCompleted: true,
      },
      select: {
        isCompleted: true,
      },
    });
    if (checkHappiness.length == 0) {
      throw errorGenerator({
        msg: message.NOT_FOUND,
        statusCode: statusCode.NOT_FOUND,
      });
    }
    const teamInfo = await prisma.team.findFirst({
      where: {
        id: teamId,
      },
      select: {
        teamName: true,
        teamMember: true,
      },
    });
    if (checkHappiness.length == teamInfo?.teamMember) {
      const result = {
        teamName: teamInfo.teamName,
        completed: true,
        completedNumber: checkHappiness.length,
        totalNumber: teamInfo.teamMember,
      };
      return result;
    }
    const result = {
      teamName: teamInfo?.teamName,
      completed: false,
      completedNumber: checkHappiness.length,
      totalNumber: teamInfo?.teamMember,
    };
    return result;
  } catch (error) {
    throw error;
  }
};
const duplicateName = async (participateTeamDto: participateTeamDto) => {
  try {
    const data = await prisma.nickname.findFirst({
      where: {
        name: participateTeamDto.nickname,
      },
    });
    if (data) {
      throw errorGenerator({
        msg: message.DUPLICATE_NAME,
        statusCode: statusCode.BAD_REQUEST,
      });
    }
    return data;
  } catch (error) {
    throw error;
  }
};
export default {
  makeTeam,
  participateTeam,
  checkTeamHappiness,
  duplicateName,
};
