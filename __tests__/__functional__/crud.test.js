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
    console.log("!!!!!!!!!!!!!!!!==============================================================================");
    console.log("====FIRST COOKIE: ", res.headers['set-cookie']);

    cookie = prepareCookie(res);

    console.log("PREPARED: ", `${cookie.sid} ${cookie.sig}`);
    console.log("!!!!!!!!!!!!!!!!===========================================================================");
    expect(res).toHaveHTTPStatus(302);
  });

  it('login (POST /session)', async () => {
    const res = await agent.post('/session')
      .type('form')
      .send({ 'form[email]': 'mail@mail.com', 'form[password]': '111' })
      .set('Cookie', cookie);
    expect(res).toHaveHTTPStatus(302);
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!COOKIES: ", cookie);
  });

/*
  cookie: 'koa.sid=XodV8lNs3fTQoQUgr1RpdGa2_lbCPWyX; koa.sid.sig=vlhH4fKaS6NKLVHMLBuDapqLbutZwfipu-gHi-zrV4Q'

  koa.sid=zfXNXaUAQ-1spGfQwQKWLDuHS3hn30-W;
  koa.sid.sig=uQsvXXwwr4O2AIuyznD0pIZTPTF-gij6eLp_9jr6rno;

*/

  it('should get user profile', async () => {
    const res2 = await agent.get('/user/profile')
        .set('Accept', '*/*')
        .set('Cookie', cookie)
        .set('Connecton', 'close');
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!RESPONSE: ", res2.text);
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++AGEN AFTER:");
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    console.log("=========================================================================");
    console.log("====COOKIE FROM GET PROFILE: ", res2.headers['set-cookie'][0]);
    console.log("=========================================================================");
    expect(res2).toHaveHTTPStatus(200);
  });

  afterAll((done) => {
    server.close();
    done();
  });
});
