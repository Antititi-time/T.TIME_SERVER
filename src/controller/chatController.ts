import { Request, Response } from 'express';
import { message, statusCode } from '../constants';
import { fail, success } from '../constants/util';
import { createAnswerDto } from '../interfaces/createAnswerDto';
import { slackMessage } from '../modules/returnToSlackMessage';
import { sendMessageToSlack } from '../modules/slackAPI';
import { chatService } from '../service';

const chatAnswer = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const createAnswerDto: createAnswerDto = req.body;

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
    const errorMessage: string = slackMessage(
      req.method.toUpperCase(),
      req.originalUrl,
      error,
      req.body.user?.id,
    );
    sendMessageToSlack(errorMessage);
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
