import Koa from 'koa';
import Rollbar from 'rollbar';
import Router from 'koa-router';
import session from 'koa-generic-session';

import addRoutes from './routes'

export default () => {
  const app = new Koa();
  const rollbar = new Rollbar('d127b6e52cdd4ebcaea93d684c756d7e');

  app.use(session(app));
  app.use(async (ctx, next) => {
    try {
      rollbar.log('Starting application...');
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
