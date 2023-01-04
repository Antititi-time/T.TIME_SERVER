import { Request, Response } from 'express';
import { message, statusCode } from '../constants';
import { fail, success } from '../constants/util';
import { createAnswerDto } from '../interfaces/createAnswerDto';
import { chatService } from '../service';

const chatAnswer = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const createAnswerDto: createAnswerDto = req.body;
  
    if (!userId || !createAnswerDto) {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    }
  
    try {
      const data = await chatService.chatAnswer(+userId, createAnswerDto);
  
      if (!data) {
        return res
          .status(statusCode.NOT_FOUND)
          .send(fail(statusCode.NOT_FOUND, message.NOT_FOUND));
      }
      return res
        .status(statusCode.OK)
        .send(success(statusCode.OK, message.CHAT_ANSWER_SUCCESS, data));

    } catch (error) {
      console.log(error);
      res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(
          fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR),
        );
    }
  };
  export default {
    chatAnswer,
  };
  