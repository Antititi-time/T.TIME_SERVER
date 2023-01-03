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

export default {
  makeTeam,
};
