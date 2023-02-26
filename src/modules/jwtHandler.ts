import jwt from 'jsonwebtoken';
import config from '../config';
import exceptionMessage from './constants/exceptionMessage';

//* 받아온 userId를 담는 access token 생성
const sign = (userId: number) => {
  const payload = {
    id: userId,
  };

  const accessToken = jwt.sign(payload, config.jwtSecret, {
    expiresIn: '3h',
  });
  return accessToken;
};

const createRefresh = () => {
  const refreshToken = jwt.sign({}, config.jwtSecret, { expiresIn: '14d' });
  return refreshToken;
};

//* token 검사!
const verify = (token: string) => {
  let decoded: string | jwt.JwtPayload;

  try {
    decoded = jwt.verify(token, config.jwtSecret);
  } catch (error: any) {
    if (error.message === 'jwt expired') {
      return exceptionMessage.TOKEN_EXPIRED;
    } else if (error.message === 'invalid token') {
      return exceptionMessage.TOKEN_INVALID;
    } else {
      return exceptionMessage.TOKEN_INVALID;
    }
  }

  return decoded;
};

export default {
  sign,
  createRefresh,
  verify,
};
