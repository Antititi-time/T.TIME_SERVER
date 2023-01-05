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
    const teamResult = {
      date: dayjs().format('YYYY-MM-DD'),
      teamName: findTeamName?.team_name,
      good: scores[0].question_type,
      bad: scores.reverse()[0].question_type,
    };
    return teamResult;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getTeamDetailResult = async (teamId: number, type: string) => {
  const detailData = await prisma.chat.findMany({
    where: {
      team_id: teamId,
      question_type: type,
    },
    select: {
      nickname: {
        select: {
          name: true,
        },
      },
      question_type: true,
      question_number: true,
      answer: true,
      grade: true,
    },
    orderBy: {
      question_number: 'asc',
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

  return detailResult;
};
export default {
  userResult,
  teamResultByType,
  getResultByType,
  getTeamDetailResult,
};
