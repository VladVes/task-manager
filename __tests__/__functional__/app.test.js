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
  });

  it('GET 200/302', async () => {
    const res0 = await request.agent(server).get('/');
    const res2 = await request.agent(server).get('/users/new');
    const res3 = await request.agent(server).get('/user/profile');
    const res4 = await request.agent(server).get('/session/new');
    expect(res0).toHaveHTTPStatus(200);
    expect(res2).toHaveHTTPStatus(200);
    expect(res3).toHaveHTTPStatus(302);
    expect(res4).toHaveHTTPStatus(200);
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
