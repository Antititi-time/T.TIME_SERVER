import { PrismaClient } from '@prisma/client';
import { createAnswerDto } from '../interfaces/createAnswerDto';
const prisma = new PrismaClient();

const chatAnswer = async (
    userId: number,
    createAnswerDto: createAnswerDto
    ) => {
      try {
        const chat = await prisma.chat.create({
          data: {
            user_id: userId,
            question_type: createAnswerDto.questionType,
            question_number: createAnswerDto.questionNumber,
            answer: createAnswerDto.answer,
            grade: createAnswerDto.grade
          },
        });
      
        return chat;
      } catch (error) {
        console.log(error);
        throw error;
       }
      };

    
  export default {
    chatAnswer,
  };
  