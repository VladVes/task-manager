import request from 'supertest';
import matchers from 'jest-supertest-matchers';
import app from '../../src/';

const prepareCookie = (res) => {
  const sid = res.headers['set-cookie'][0].match(/koa\.sid=[\w-]*[^\s]/)[0];
  const sig = res.headers['set-cookie'][0].match(/koa\.sid\.sig=[\w-]*[^;]/)[0];
  return `${sid} ${sig}`;
};

describe('base requests', () => {
  let server;
  let agent;
  let cookie;

  beforeAll(() => {
    jasmine.addMatchers(matchers);
    server = app().listen();
    agent = request.agent(server);
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

  it('edit user profile (PATCH /user/profile)', async () => {
    const res = await agent.patch('/user/profile')
      .type('form')
      .send({
        'form[name]': 'ailA@mailB.com',
        'form[firstName]': 'Alpha',
        'form[lastName]': 'Beta',
        'form[password]': '333',
      })
      .set('Cookie', cookie);
    expect(res).toHaveHTTPStatus(302);
  });

  it('add new status (POST /statuses)', async () => {
    const res = await agent.post('/statuses')
      .type('form')
      .send({ 'form[name]': 'new' })
      .set('Cookie', cookie);
    expect(res).toHaveHTTPStatus(302);
  });

  it('get statuses (GET /statuses)', async () => {
    const res = await agent.get('/statuses')
      .set('Cookie', cookie);
    expect(res).toHaveHTTPStatus(200);
  });



  it('get new task (GET /tasks/new)', async () => {
    const res = await agent.get('/tasks/new')
      .set('Cookie', cookie);
    expect(res).toHaveHTTPStatus(200);
  });

  it('get tasks (GET /tasks)', async () => {
    const res = await agent.get('/tasks')
      .set('Cookie', cookie);
    expect(res).toHaveHTTPStatus(200);
  });

  it('delete user profile (DELETE /user/delete)', async () => {
    const res = await agent.delete('/user/delete')
      .set('Cookie', cookie);
    expect(res).toHaveHTTPStatus(302);
  });

  afterAll((done) => {
    server.close();
    done();
  });
});
