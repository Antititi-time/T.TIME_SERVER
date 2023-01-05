import dayjs from 'dayjs';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const userResult = async (userId: number) => {
  try {
    const findTeam = await prisma.team_user.findFirst({
      where: {
        user_id: userId,
      },
      select: {
        nickname: true,
        team: true,
        team_id: true,
      },
    });
    if (!findTeam) {
      return null;
    }

    const scores = await prisma.chat.groupBy({
      by: ['question_type'],
      where: {
        user_id: userId,
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
      date: dayjs(findTeam.team.updatedAt).format('YYYY-MM-DD'),
      nickname: findTeam.nickname.name,
      teamName: findTeam.team.team_name,
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
      by: ['question_type'],
      where: {
        team_id: teamId,
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

export default {
  userResult,
  teamResultByType,
};
