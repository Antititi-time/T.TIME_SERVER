import request from 'supertest';
import dotenv from 'dotenv';
import app from '../src/index';

dotenv.config();

describe('초대장 생성 성공 [POST] /api/team', () => {
  it('201 - 초대장 생성 성공', async () => {
    const response = await request(app)
      .post('/api/team')
      .set('Content-Type', 'application/json')
      .send({ teamName: 'team', teamMember: 13 });
    expect(response.statusCode).toBe(201);
  });

  it('400 - 초대장 생성 실패', async () => {
    await request(app)
      .post('/api/team')
      .set('Content-Type', 'application/json')
      .send({ teamName: 'team' })
      .expect(400);
  });

  it('404 - 초대장 생성 실패', async () => {
    await request(app)
      .post('/api/')
      .set('Content-Type', 'application/json')
      .send({ teamName: 'team', teamMember: 13 })
      .expect(404);
  });
});

describe('프로젝트 팀 입장 성공 [POST] /api/team/:teamId', () => {
  it('200 - 프로젝트 팀 입장 성공', async () => {
    const response = await request(app)
      .post('/api/team/729262811')
      .set('Content-Type', 'application/json')
      .send({ nickname: '민재' });
    expect(200);
  });

  it('400 - 프로젝트 팀 입장 실패', async () => {
    await request(app)
      .post('/api/team/729262811')
      .set('Content-Type', 'application/json')
      .send({ teamName: 'team' })
      .expect(400);
  });

  it('404 - 프로젝트 팀 입장 실패', async () => {
    await request(app)
      .post('/api/')
      .set('Content-Type', 'application/json')
      .send({ teamName: 'team', teamMember: 13 })
      .expect(404);
  });
});

describe('팀 해피니스 체크 유무 [GET] /api/team/check/:teamId', () => {
  it('200 - 팀 해피니스 체크 유무', async () => {
    const response = await request(app)
      .get('/api/team/check/729262811')
      .set('Content-Type', 'application/json');
    expect(response.statusCode).toBe(200);
  });

  it('404 - 팀 해피니스 체크 유무', async () => {
    await request(app)
      .get('/api/team/check/729265')
      .set('Content-Type', 'application/json')
      .expect(404);
  });
});
