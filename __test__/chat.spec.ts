import request from 'supertest';
import dotenv from "dotenv";
import app from '../src/index';

dotenv.config();

describe('해피니스 체크 답변 받기 [POST] /api/chat/:userId', () => {

  it('201 - 해피니스 체크 답변 받기 성공', async () => {
    const response = await request(app)
      .post('/api/chat/20')
      .set('Content-Type', 'application/json')
      .send({questionType: 'a', questionNumber: 1, answer: 'sd', grade: 3, teamId: 729262811});
    expect(response.statusCode).toBe(201);
  });
  
  
  it('400 - 해피니스 체크 답변 받기 실패', async () => {
    await request(app)
      .post('/api/chat/20')
      .set('Content-Type', 'application/json')
      .send({ questionType: 'a', answer: 'sd', grade: 3, teamId: 729262811})
      .expect(400);
  });

  it('404 - 해피니스 체크 답변 받기 실패', async () => {
    await request(app)
      .post('/api/chat')
      .set('Content-Type', 'application/json')
      .send({questionType: 'a', questionNumber: 1, answer: 'sd', grade: 3, teamId: 729262811})
      .expect(404);
  });


});
