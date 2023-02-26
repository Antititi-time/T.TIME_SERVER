import auth from '../config/auth';
import { PrismaClient } from '@prisma/client';
import errorGenerator from '../middleware/error/errorGenerator';
import { message, statusCode } from '../modules/constants';
const prisma = new PrismaClient();

export type SocialPlatform = 'KAKAO' | 'GOOGLE';
//* 소셜 유저 정보 가져오기
const getSocialUser = async (social: SocialPlatform, accesstoken: string) => {
  try {
    switch (social) {
      case 'KAKAO': {
        const user = await auth.kakaoAuth(accesstoken);
        return user;
      }
      case 'GOOGLE': {
        const user = await auth.googleAuth(accesstoken);
        return user;
      }
    }
  } catch (error) {
    throw error;
  }
};

//* 소셜 로그인 유저 조회
const findUserById = async (userId: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        snsId: userId,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

//* 유저 회원가입
const signUpUser = async (
  snsId: string,
  name: string,
  email: string,
  social: string,
  refreshToken: string,
) => {
  try {
    const user = await prisma.user.create({
      data: {
        snsId,
        name,
        email,
        social,
        refreshToken,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

//* refreshToken 수정
const updateRefreshToken = async (id: number, refreshToken: string) => {
  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        refreshToken,
      },
    });
  } catch (error) {
    throw error;
  }
};

export default { getSocialUser, findUserById, signUpUser, updateRefreshToken };
