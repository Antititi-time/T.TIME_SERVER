import request from 'supertest';
import dotenv from 'dotenv';
import app from '../src/index';

dotenv.config();

describe('개인 결과 뷰 조회 성공 [GET] /api/result/:userId', () => {
  it('200 - 개인 결과 뷰 조회 성공', async () => {
    const response = await request(app)
      .get('/api/result/20')
      .set('Content-Type', 'application/json');
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
      .set('Content-Type', 'application/json');
    expect(response.statusCode).toBe(200);
  });

  it('404 - 개인 해피니스 체크 실패', async () => {
    await request(app)
      .get('/api/result')
      .set('Content-Type', 'application/json')
      .expect(404);
  });
});

describe('팀 상세 결과 조회 [GET] /api/team/:teamId/detail?type={}', () => {
  it('200 - 팀 상세 결과 조회', async () => {
    const response = await request(app)
      .get('/api/team/729262811/detail?type=a')
      .set('Content-Type', 'application/json');
    expect(200);
  });

  it('404 - 팀 상세 결과 조회 실패', async () => {
    await request(app)
      .get('/api/team/729262811/detail?type=ad')
      .set('Content-Type', 'application/json')
      .expect(404);
  });
});

describe('팀 결과 조회 [GET] /api/result/team/:teamId', () => {
  it('200 - 팀 상세 결과 조회', async () => {
    const response = await request(app)
      .get('/api/result/team/729262811')
      .set('Content-Type', 'application/json');
    expect(200);
  });

  it('404 - 팀 상세 결과 조회 실패', async () => {
    await request(app)
      .get('/api/result/team/729262')
      .set('Content-Type', 'application/json')
      .expect(404);
  });
});

describe('팀 결과 항목별 점수 조회 [GET] /api/result/team/score/:teamId', () => {
  it('200 - 팀 결과 항목별 점수 조회', async () => {
    const response = await request(app)
      .get('/api/result/team/score/729262811')
      .set('Content-Type', 'application/json');
    expect(200);
  });

  it('404 - 팀 결과 항목별 점수 조회 실패', async () => {
    await request(app)
      .get('/api/result/team/score/729262')
      .set('Content-Type', 'application/json')
      .expect(404);
  });
});
