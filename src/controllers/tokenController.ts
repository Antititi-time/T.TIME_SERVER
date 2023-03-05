import { Request, Response, NextFunction } from 'express';
import { exceptionMessage, message, statusCode } from '../modules/constants';
import jwt from '../modules/jwtHandler';
import { success, fail } from '../modules/constants/util';

/**
 * [GET] accessToken 재발급
 */
const getValidAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.headers.accesstoken;

  //* 토큰이 없다면
  if (!accessToken)
    return res
      .status(statusCode.BAD_REQUEST)
      .send(fail(statusCode.BAD_REQUEST, message.EMPTY_TOKEN));

  try {
    const access = jwt.verify(accessToken as string);

    // 유효하지 않은 accessToken
    if (access == exceptionMessage.TOKEN_INVALID) {
      return res
        .status(statusCode.UNAUTHORIZED)
        .send(fail(statusCode.UNAUTHORIZED, message.INVALID_TOKEN));
    }

    // 만료된 accessToken
    if (access == exceptionMessage.TOKEN_EXPIRED) {
      const data = {
        isValid: false,
      };

      return res
        .status(statusCode.OK)
        .send(
          success(statusCode.OK, message.READ_VALID_ACCESS_TOKEN_SUCCESS, data),
        );
    }

    const data = {
      isValid: true,
    };

    return res
      .status(statusCode.OK)
      .send(
        success(statusCode.OK, message.READ_VALID_ACCESS_TOKEN_SUCCESS, data),
      );
  } catch (error) {
    next(error);
  }
};

export default {
  getValidAccessToken,
};
