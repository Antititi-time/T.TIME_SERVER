import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { message, statusCode, exceptionMessage } from '../modules/constants';
import { fail } from '../modules/constants/util';
import jwtHandler from '../modules/jwtHandler';

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token)
    return res
      .status(statusCode.UNAUTHORIZED)
      .send(fail(statusCode.UNAUTHORIZED, message.EMPTY_TOKEN));

  try {
    const decoded = jwtHandler.verify(token as string); //? jwtHandler에서 만들어둔 verify로 토큰 검사

    //? 토큰 에러 분기 처리
    if (decoded === exceptionMessage.TOKEN_EXPIRED)
      return res
        .status(statusCode.UNAUTHORIZED)
        .send(fail(statusCode.UNAUTHORIZED, message.EXPIRED_TOKEN));
    if (decoded === exceptionMessage.TOKEN_INVALID)
      return res
        .status(statusCode.UNAUTHORIZED)
        .send(fail(statusCode.UNAUTHORIZED, message.INVALID_TOKEN));

    //? decode한 후 담겨있는 userId를 꺼내옴
    const userId = (decoded as JwtPayload).id;
    if (!userId)
      return res
        .status(statusCode.UNAUTHORIZED)
        .send(fail(statusCode.UNAUTHORIZED, message.INVALID_TOKEN));

    //? 얻어낸 userId 를 Request Body 내 userId 필드에 담고, 다음 미들웨어로 넘김( next() )
    res.locals.JwtPayload = userId;
    next();
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR),
      );
  }
};
