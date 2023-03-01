import { Request, Response, NextFunction } from 'express';
import { exceptionMessage, message, statusCode } from '../modules/constants';
import { success, fail } from '../modules/constants/util';
import jwt from '../modules/jwtHandler';
import { SocialUser } from '../interfaces/SocialUser';
import { userService } from '../services';

/**
 * @desc [POST] 유저 소셜 로그인
 */
const getSocialUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { social, token } = req.body;

  //* token이 없다면
  if (!token) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(fail(statusCode.BAD_REQUEST, message.EMPTY_TOKEN));
  }

  try {
    const user = await userService.getSocialUser(social, token);

    //* user가 없다면
    if (!user) {
      return res
        .status(statusCode.UNAUTHORIZED)
        .send(fail(statusCode.UNAUTHORIZED, message.INVALID_TOKEN));
    }
    if (user == exceptionMessage.INVALID_USER) {
      return res
        .status(statusCode.UNAUTHORIZED)
        .send(fail(statusCode.UNAUTHORIZED, message.NO_USER));
    }
    //* 가입된 유저인지 확인
    const existUser = await userService.findUserById(
      (user as SocialUser).userId,
    );
    if (!existUser) {
      //* 가입되지 않은 유저라면 회원가입
      const data = createUser(social, user as SocialUser);
      return res
        .status(statusCode.CREATED)
        .send(success(statusCode.CREATED, message.SIGNUP_SUCCESS, await data));
    }

    //* 가입된 유저라면 로그인
    const refreshToken = jwt.createRefresh();
    const accessToken = jwt.sign(existUser.id);

    await userService.updateRefreshToken(existUser.id, refreshToken);

    const data = {
      signUp: true,
      accessToken: accessToken,
    };

    return res
      .status(statusCode.OK)
      .send(success(statusCode.OK, message.SIGNIN_SUCCESS, data));
  } catch (error) {
    next(error);
  }

  /**
   * @desc 유저 회원 가입
   */
  async function createUser(social: string, user: SocialUser) {
    const refreshToken = jwt.createRefresh();
    const newUser = await userService.signUpUser(
      (user as SocialUser).userId,
      (user as SocialUser).name,
      (user as SocialUser).email,
      social,
      refreshToken,
    );
    const accessToken = jwt.sign(newUser.id);

    return {
      accessToken: accessToken,
    };
  }
};

const getMyPage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = res.locals.JwtPayload;
    const data = await userService.getMyPage(+userId);
    return res
      .status(statusCode.OK)
      .send(success(statusCode.OK, message.READ_MYPAGE_SUCCESS, data));
  } catch (error) {
    next(error);
  }
};
export default { getSocialUser, getMyPage };
