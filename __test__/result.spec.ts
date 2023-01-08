import request from 'supertest';
import dotenv from "dotenv";
import app from '../src/index';

dotenv.config();

describe('개인 결과 뷰 조회 성공 [GET] /api/result/:userId', () => {

  it('200 - 개인 결과 뷰 조회 성공', async () => {
    const response = await request(app)
      .get('/api/result/20')
      .set('Content-Type', 'application/json')
    expect(response.statusCode).toBe(200);
  });

  it('404 - 개인 결과 뷰 조회 실패', async () => {
    await request(app)
      .get('/api/result')
      .set('Content-Type', 'application/json')
      .expect(404);
  });

});

describe('개인 해피니스 체크 성공 [GET] /api/result/:userId', () => {

    it('200 - 개인 해피니스 체크 성공', async () => {
      const response = await request(app)
        .get('/api/result/20')
        .set('Content-Type', 'application/json')
      expect(response.statusCode).toBe(200);
    });
  
    it('404 - 개인 해피니스 체크 실패', async () => {
      await request(app)
        .get('/api/result')
        .set('Content-Type', 'application/json')
        .expect(404);
    });
  
  
  });
