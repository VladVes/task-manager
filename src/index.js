import Koa from 'koa';
import Router from 'koa-router';

export default () => {
  const app = new Koa();

  const router = new Router();
  router.get('root', '/', (ctx) => {
    ctx.body = 'Welcome to the JavaScript Jungle.\n Never never never give up!';
    console.log('From root route!');
  });
  //app.use((ctx) => {
//    console.log('FIRST MIDDLWARE');
  //});
  app.use(router.allowedMethods());
  app.use(router.routes());

  return app;
};
