import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const makeTeam = async (
  teamName: string,
  teamMember: number,
  teamCode: string,
) => {
  const team = await prisma.team.create({
    data: {
      team_name: teamName,
      team_member: teamMember,
      team_code: teamCode,
    },
  });

  return team;
};

const participateTeam = async (nickname: string, teamCode: string) => {
  try {
    const user = await prisma.nickname.create({
      data: {
        name: nickname,
      },
    });
    if (!user) {
      return null;
    }
    const findTeamId = await prisma.team.findFirst({
      where: {
        team_code: teamCode,
      },
    });
    if (!findTeamId) {
      return null;
    }
    const joinTeam = await prisma.team_user.create({
      data: {
        user_id: user.id,
        team_id: findTeamId.id,
        is_completed: false,
      },
    });
    if (!joinTeam) {
      return null;
    }
    return joinTeam;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export default {
  makeTeam,
  participateTeam,
};
