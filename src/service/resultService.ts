import { checkUserHappinessDto } from './../interfaces/DTO';
import dayjs from 'dayjs';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const userResult = async (userId: number) => {
  try {
    const findTeam = await prisma.team_user.findFirst({
      where: {
        userId: userId,
      },
      select: {
        nickname: true,
        team: true,
        teamId: true,
      },
    });
    if (!findTeam) {
      return null;
    }

    const scores = await prisma.chat.groupBy({
      by: ['questionType'],
      where: {
        userId: userId,
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
    if (!scores) {
      return null;
    }
    const scoreResult = await Promise.all(
      scores.map((score: any) => {
        const result = {
          grade: score._sum.grade,
          questionType: score.question_type,
        };
        return result;
      }),
    );

    const data = {
      date: dayjs().format('YYYY-MM-DD'),
      nickname: findTeam.nickname.name,
      teamName: findTeam.team.teamName,
      result: scoreResult,
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const teamResultByType = async (teamId: number) => {
  try {
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
    if (!scores) {
      return null;
    }
    const scoreResult = await Promise.all(
      scores.map((score: any) => {
        const result = {
          grade: score._sum.grade,
          questionType: score.question_type,
        };
        return result;
      }),
    );
    return scoreResult;
  } catch (error) {
    console.log(error);
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
      return null;
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
    if (!scores) {
      return null;
    }
    const teamResult = {
      date: dayjs().format('YYYY-MM-DD'),
      teamName: findTeamName?.teamName,
      good: scores[0].questionType,
      bad: scores.reverse()[0].questionType,
    };
    return teamResult;
  } catch (error) {
    console.log(error);
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
        nickname: {
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
          nickname: data.nickname.name,
          questionType: data.question_type,
          questionNumber: data.question_number,
          grade: data.grade,
          answer: data.answer,
        };
        return result;
      }),
    );
    if (detailResult.length == 0) {
      return null;
    }
    return detailResult;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const checkUserHappiness = async (
  userId: number,
  checkUserHappinessDto: checkUserHappinessDto,
) => {
  try {
    const data = await prisma.team_user.update({
      where: {
        userId: userId,
      },
      data: {
        isCompleted: checkUserHappinessDto.isCompleted,
      },
    });

    const result = {
      userId: data.userId,
      completed: data.isCompleted,
    };

    return result;
  } catch (error) {
    console.log(error);
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
