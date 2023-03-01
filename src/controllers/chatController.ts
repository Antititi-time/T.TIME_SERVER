import { Request, Response, NextFunction } from 'express';
import { message, statusCode } from '../modules/constants';
import { fail, success } from '../modules/constants/util';
import { createAnswerDto } from '../interfaces/DTO';
import { chatService } from '../services';

const chatAnswer = async (req: Request, res: Response, next: NextFunction) => {
  const userId = res.locals.JwtPayload;
  const createAnswerDto: createAnswerDto = req.body;
  try {
    const data = await chatService.chatAnswer(+userId, createAnswerDto);

    return res
      .status(statusCode.CREATED)
      .send(success(statusCode.CREATED, message.CHAT_ANSWER_SUCCESS, data));
  } catch (error) {
    next(error);
  }
};

export default {
  chatAnswer,
};
