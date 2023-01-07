import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const makeTeam = async (
  teamName: string,
  teamMember: number,
  teamId: number,
) => {
  const team = await prisma.team.create({
    data: {
      id: teamId,
      team_name: teamName,
      team_member: teamMember,
    },
  });

  return team;
};

const participateTeam = async (nickname: string, teamId: number) => {
  try {
    const user = await prisma.nickname.create({
      data: {
        name: nickname,
      },
    });

    const joinTeam = await prisma.team_user.create({
      data: {
        user_id: user.id,
        team_id: teamId,
        is_completed: false,
      },
    });

    const teamInfo = await prisma.team.findFirst({
      where: {
        id: teamId,
      },
    });

    const data = {
      user_id: joinTeam.user_id,
      team_id: teamInfo?.id,
      teamName: teamInfo?.team_name,
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const checkTeamHappiness = async (teamId: number) => {
  try {
    const checkHappiness = await prisma.team_user.findMany({
      where: {
        team_id: teamId,
        is_completed: true,
      },
      select: {
        is_completed: true,
      },
    });

    const teamInfo = await prisma.team.findFirst({
      where: {
        id: teamId,
      },
      select: {
        team_member: true,
      },
    });
    if (!teamInfo) {
      return null;
    }
    if (checkHappiness.length == teamInfo.team_member) {
      const result = {
        completed: true,
        completedNumber: checkHappiness.length,
        totalNumber: teamInfo.team_member,
      };
      return result;
    }
    const result = {
      completed: false,
      completedNumber: checkHappiness.length,
      totalNumber: teamInfo.team_member,
    };
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const duplicateName = async (nickName: string) => {
  try {
    const data = await prisma.nickname.findFirst({
      where: {
        name: nickName,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export default {
  makeTeam,
  participateTeam,
  checkTeamHappiness,
  duplicateName,
};
