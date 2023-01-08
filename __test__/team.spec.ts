import request from 'supertest';
import dotenv from "dotenv";
import app from '../src/index';

dotenv.config();

describe('초대장 생성 성공 [POST] /api/team', () => {

  it('201 - 초대장 생성 성공', async () => {
    const response = await request(app)
      .post('/api/team')
      .set('Content-Type', 'application/json')
      .send({teamName: 'team', teamMember: 13});
    expect(response.statusCode).toBe(201);
  });
  
  
  it('400 - 초대장 생성 실패', async () => {
    await request(app)
      .post('/api/team')
      .set('Content-Type', 'application/json')
      .send({ teamName: 'team', })
      .expect(400);
  });

  it('404 - 초대장 생성 실패', async () => {
    await request(app)
      .post('/api/')
      .set('Content-Type', 'application/json')
      .send({teamName: 'team', teamMember: 13})
      .expect(404);
  });


});
