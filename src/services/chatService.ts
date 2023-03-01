import { PrismaClient } from '@prisma/client';
import { createAnswerDto } from '../interfaces/DTO';
const prisma = new PrismaClient();

const chatAnswer = async (userId: number, createAnswerDto: createAnswerDto) => {
  try {
    const chat = await prisma.chat.create({
      data: {
        userId,
        questionType: createAnswerDto.questionType,
        questionNumber: createAnswerDto.questionNumber,
        answer: createAnswerDto.answer,
        grade: createAnswerDto.grade,
        teamId: createAnswerDto.teamId,
      },
    });
    const data = {
      questionType: chat.questionType,
      questionNumber: chat.questionNumber,
      answer: chat.answer,
      grade: chat.grade,
      teamId: chat.teamId,
    };
    return data;
  } catch (error) {
    throw error;
  }
};

export default {
  chatAnswer,
};
