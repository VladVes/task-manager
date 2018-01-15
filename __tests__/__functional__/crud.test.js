import request from 'supertest';
import matchers from 'jest-supertest-matchers';
import app from '../../src/';

const prepareCookie = (res) => {
  const sid = res.headers['set-cookie'][0].match(/koa\.sid=[\w-]*[^\s]/)[0];
  const sig = res.headers['set-cookie'][0].match(/koa\.sid\.sig=[\w-]*[^;]/)[0];
  return `${sid} ${sig}`;
};

describe('base requests', () => {
  let agent;
  let cookie;

  beforeAll(() => {
    jasmine.addMatchers(matchers);
    agent = request.agent(app().listen());
  });

  it('new user (POST /users)', async () => {
    const res = await agent.post('/users')
      .type('form')
      .send({
        'form[id]': 555,
        'form[firstName]': 'Super',
        'form[lastName]': 'Test',
        'form[email]': 'mail@mail.com',
        'form[password]': '111',
      });
    expect(res).toHaveHTTPStatus(302);
    cookie = prepareCookie(res);
  });

  it('login (POST /session)', async () => {
    const res = await agent.post('/session')
      .type('form')
      .send({ 'form[email]': 'mail@mail.com', 'form[password]': '111' })
      .set('Cookie', cookie);
    expect(res).toHaveHTTPStatus(302);
  });

  it('get user profile (GET /user/profile)', async () => {
    const res = await agent.get('/user/profile')
        .set('Accept', '*/*')
        .set('Cookie', cookie);
    expect(res).toHaveHTTPStatus(200);
  });

  afterAll((done) => {
    server.close();
    done();
  });
});
