import Koa from 'koa';
import Rollbar from 'rollbar';
import Router from 'koa-router';
import session from 'koa-generic-session';
import flash from 'koa-flash-simple';
import bodyparser from 'koa-bodyparser';

import addRoutes from './routes'

export default () => {
  const app = new Koa();
  const rollbar = new Rollbar('d127b6e52cdd4ebcaea93d684c756d7e');

  app.use(session(app));
  app.use(flash());
  app.use(async (ctx, next) => {
    try {
      rollbar.log('Starting application...');
      ctx.state = {
        flash: ctx.falsh,
        isSignedIn: () => ctx.session.userId !== undefined,
      };
      await next();
    } catch (err) {
      rollbar.error(err, ctx.request);
    }
  });
  app.use(bodyParser());

  const router = new Router();
  addRoutes(router);
  app.use(router.allowedMethods());
  app.use(router.routes());

  return app;
};
