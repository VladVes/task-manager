import Koa from 'koa';
import Rollbar from 'rollbar';
import Router from 'koa-router';

import addRoutes from './routes'

export default () => {
  const app = new Koa();
  const rollbar = new Rollbar('d127b6e52cdd4ebcaea93d684c756d7e');

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      rollbar.error(err, ctx.request);
    }
  });

  const router = new Router();
  addRoutes(router);
  app.use(router.allowedMethods());
  app.use(router.routes());

  return app;
};
