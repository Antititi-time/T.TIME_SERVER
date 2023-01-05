import { Request, Response } from 'express';
import { message, statusCode } from '../constants';
import { fail, success } from '../constants/util';
import { resultService } from '../service';

const userResult = async (req: Request, res: Response) => {
    const { userId } = req.params;
    if (!userId) {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    }
  
    try {
      const data = await resultService.userResult(+userId);
  
      if (!data) {
        return res
          .status(statusCode.BAD_REQUEST)
          .send(fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
      }
      return res
        .status(statusCode.OK)
        .send(success(statusCode.OK, message.USER_RESULT_SUCCESS, data));

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
    userResult,
};
  