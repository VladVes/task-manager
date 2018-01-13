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

  it('should create new user', async () => {
    const res = await request.agent(server).post('/users')
      .type('form')
      .send({ id: 555 })
      .send({ firstName: 'Super' })
      .send({ lastName: 'Test' })
      .send({ email: 'mail@mail.com' })
      .send({ password: '111' })

    expect(res).toHaveHTTPStatus(200);
  });

  afterEach((done) => {
    server.close();
    done();
  });
});
