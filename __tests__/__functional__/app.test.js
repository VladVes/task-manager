import request from 'supertest';
import matchers from 'jest-supertest-matchers';
import app from '../../src/';

describe('base requests', () => {
  let server;

  beforeAll(() => {
    jasmine.addMatchers(matchers);
  });

  beforeEach(() => {
    server = app().listen();
    //console.log(server);
  });

  it('GET 200', async () => {
    let res;
    res = await request.agent(server).get('/');
    expect(res).toHaveHTTPStatus(200);
    res = await request.agent(server).get('/users');
    expect(res).toHaveHTTPStatus(200);
    res = await request.agent(server).get('/tasks');
    expect(res).toHaveHTTPStatus(200);
    res = await request.agent(server).get('/users/new');
    expect(res).toHaveHTTPStatus(200);
    res = await request.agent(server).get('/session/new');
    expect(res).toHaveHTTPStatus(200);
  });

  it('GET 302', async () => {
    let res;
    res = await request.agent(server).get('/user/profile');
    expect(res).toHaveHTTPStatus(302);
  });

  it('GET 404', async () => {
    const res = await request.agent(server).get('/wrong-path');
    expect(res).toHaveHTTPStatus(404);
  });

  afterEach((done) => {
    server.close();
    done();
  });
});
