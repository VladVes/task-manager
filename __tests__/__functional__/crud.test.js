import request from 'supertest';
import matchers from 'jest-supertest-matchers';
import app from '../../src/';

const prepareCookie = (res) => {
  const sid = res.headers['set-cookie'][0].match(/koa\.sid=[\w-]*[^\s]/)[0];
  const sig = res.headers['set-cookie'][0].match(/koa\.sid\.sig=[\w-]*[^;]/)[0];
  return `${sid} ${sig}`;
};

describe('Entyties CRUD', () => {
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

  it('get new status form (GET /statuses/new)', async () => {
    const res = await agent.get('/statuses/new')
      .set('Cookie', cookie);
    expect(res).toHaveHTTPStatus(200);
  });

  it('get status edit (GET /status/:statusId)', async () => {
    const res = await agent.get('/status/1')
      .set('Cookie', cookie);
    expect(res).toHaveHTTPStatus(200);
  });

  it('get status edit (error!) (GET /status/:statusId)', async () => {
    const res = await agent.get('/status/111')
      .set('Cookie', cookie);
    expect(res).toHaveHTTPStatus(404);
  });

  it('edit status (PATCH /status/edit/:statusId)', async () => {
    const res = await agent.patch('/status/edit/1')
      .type('form')
      .send({ 'form[name]': 'super new' })
      .set('Cookie', cookie);
    expect(res).toHaveHTTPStatus(302);
  });

  it('delete status (DELETE /status/delete/:statusId)', async () => {
    const res1 = await agent.post('/statuses')
      .type('form')
      .send({ 'form[name]': 'temp Statuse' })
      .set('Cookie', cookie);
    expect(res1).toHaveHTTPStatus(302);

    const res2 = await agent.delete('/status/delete/2')
      .set('Cookie', cookie);
    expect(res2).toHaveHTTPStatus(302);
  });

  it('get new task (GET /tasks/new)', async () => {
    const res = await agent.get('/tasks/new')
      .set('Cookie', cookie);
    expect(res).toHaveHTTPStatus(200);
  });

  it('create task (POST /tasks)', async () => {
    const res = await agent.post('/tasks')
      .type('form')
      .send({
        'form[id]': 1000,
        'form[name]': 'First Task',
        'form[description]': 'Alpha task',
        'form[status]': 1,
        'form[creator]': 555,
        'form[assignedTo]': 555,
        'form[tags]': 'tag1, tag2, tag3',
      })
      .set('Cookie', cookie);
    expect(res).toHaveHTTPStatus(302);
  });

  it('get tasks (GET /tasks)', async () => {
    const res = await agent.get('/tasks')
      .set('Cookie', cookie);
    expect(res).toHaveHTTPStatus(200);
  });

  it('get task (GET /task/:taskId)', async () => {
    const res = await agent.get('/task/1000')
      .set('Cookie', cookie);
    expect(res).toHaveHTTPStatus(200);
  });

  it('edit task (PATCH /tasks/edit/:taskId)', async () => {
    const res = await agent.patch('/tasks/edit/1000')
      .type('form')
      .send({
        'form[name]': 'First Task updated',
        'form[description]': 'New alpha task',
        'form[status]': 1,
        'form[creator]': 555,
        'form[assignedTo]': 555,
      })
      .set('Cookie', cookie);
    expect(res).toHaveHTTPStatus(302);
  });

  it('edit task (error!) (PATCH /tasks/edit/:taskId)', async () => {
    const res = await agent.patch('/tasks/edit/1001')
      .type('form')
      .send({})
      .set('Cookie', cookie);
    expect(res).toHaveHTTPStatus(404);
  });

  it('delete task (DELETE /tasks/delete/:taskId)', async () => {
    const res = await agent.delete('/tasks/delete/1000')
      .set('Cookie', cookie);
    expect(res).toHaveHTTPStatus(302);
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
