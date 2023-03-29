import {
  checkUserHappinessDto,
  makePersonalResultDto,
} from '../interfaces/DTO';
import dayjs from 'dayjs';
import { PrismaClient } from '@prisma/client';
import errorGenerator from '../middleware/error/errorGenerator';
import { message, statusCode } from '../modules/constants';
const prisma = new PrismaClient();

const userResult = async (userId: number, teamId: number) => {
  try {
    const findTeam = await prisma.team_user.findFirst({
      where: {
        userId,
        teamId,
      },
      include: {
        user: true,
        team: true,
      },
    });
    if (!findTeam) {
      throw errorGenerator({
        msg: message.NOT_FOUND,
        statusCode: statusCode.NOT_FOUND,
      });
    }
    const scores = await prisma.chat.groupBy({
      by: ['questionType'],
      where: {
        userId,
        teamId,
      },
      _sum: {
        grade: true,
      },
      orderBy: {
        _sum: {
          grade: 'desc',
        },
      },
    });
    const scoreResult = await Promise.all(
      scores.map((score: any) => {
        const result = {
          grade: score._sum.grade,
          questionType: score.questionType,
        };
        return result;
      }),
    );

    const data = {
      date: dayjs().format('YYYY-MM-DD'),
      nickname: findTeam?.user.name,
      teamName: findTeam?.team.teamName,
      result: scoreResult,
    };

    return data;
  } catch (error) {
    throw error;
  }
};

const teamResultByType = async (teamId: number) => {
  try {
    const findTeamMember = await prisma.team.findFirst({
      where: {
        id: teamId,
      },
      select: {
        teamMember: true,
      },
    });
    if (!findTeamMember) {
      throw errorGenerator({
        msg: message.NOT_FOUND,
        statusCode: statusCode.NOT_FOUND,
      });
    }
    const scores = await prisma.chat.groupBy({
      by: ['questionType'],
      where: {
        teamId: teamId,
      },
      _sum: {
        grade: true,
      },
      orderBy: {
        _sum: {
          grade: 'desc',
        },
      },
    });
    const scoreResult = await Promise.all(
      scores.map((score: any) => {
        const result = {
          grade: Number(
            (score._sum.grade / findTeamMember!.teamMember).toFixed(1),
          ),
          questionType: score.questionType,
        };
        return result;
      }),
    );
    return scoreResult;
  } catch (error) {
    throw error;
  }
};

const getResultByType = async (teamId: number) => {
  try {
    const findTeamName = await prisma.team.findFirst({
      where: {
        id: teamId,
      },
    });
    if (!findTeamName) {
      throw errorGenerator({
        msg: message.NOT_FOUND,
        statusCode: statusCode.NOT_FOUND,
      });
    }
    const scores = await prisma.chat.groupBy({
      by: ['questionType'],
      where: {
        teamId: teamId,
      },
      _sum: {
        grade: true,
      },
      orderBy: {
        _sum: {
          grade: 'desc',
        },
      },
    });
    const teamResult = {
      date: dayjs().format('YYYY-MM-DD'),
      teamName: findTeamName?.teamName,
      good: scores[0].questionType,
      bad: scores.reverse()[0].questionType,
    };
    return teamResult;
  } catch (error) {
    throw error;
  }
};

const getTeamDetailResult = async (teamId: number, type: string) => {
  try {
    const detailData = await prisma.chat.findMany({
      where: {
        teamId: teamId,
        questionType: type,
      },
      select: {
        user: {
          select: {
            name: true,
          },
        },
        questionType: true,
        questionNumber: true,
        answer: true,
        grade: true,
      },
      orderBy: {
        questionNumber: 'asc',
      },
    });
    const detailResult = await Promise.all(
      detailData.map((data: any) => {
        const result = {
          nickname: data.user.name,
          questionType: data.questionType,
          questionNumber: data.questionNumber,
          grade: data.grade,
          answer: data.answer,
        };
        return result;
      }),
    );
    if (detailResult.length == 0) {
      throw errorGenerator({
        msg: message.NOT_FOUND,
        statusCode: statusCode.NOT_FOUND,
      });
    }
    return detailResult;
  } catch (error) {
    throw error;
  }
};

const checkUserHappiness = async (
  userId: number,
  teamId: number,
  checkUserHappinessDto: checkUserHappinessDto,
) => {
  try {
    const data = await prisma.team_user.updateMany({
      where: {
        userId,
        teamId,
      },
      data: {
        isCompleted: checkUserHappinessDto.isCompleted,
      },
    });
    if (!data) {
      throw errorGenerator({
        msg: message.NOT_FOUND,
        statusCode: statusCode.NOT_FOUND,
      });
    }

    const result = {
      userId: window.btoa(String(userId)),
      isCompleted: checkUserHappinessDto.isCompleted,
    };

    return result;
  } catch (error) {
    throw error;
  }
};

export default {
  userResult,
  teamResultByType,
  getResultByType,
  getTeamDetailResult,
  checkUserHappiness,
};
