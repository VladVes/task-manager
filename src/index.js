import 'babel-polyfill';

import path from 'path';
import _ from 'lodash';
import Koa from 'koa';
import Rollbar from 'rollbar';
import Router from 'koa-router';
import session from 'koa-generic-session';
import middleware from 'koa-webpack';
import flash from 'koa-flash-simple';
import bodyParser from 'koa-bodyparser';
import methodOverride from 'koa-methodoverride';
import serve from 'koa-static';
import koaLogger from 'koa-logger';
import Pug from 'koa-pug';
import dotenv from 'dotenv';

import addRoutes from './routes';
import getLogger from './lib/log';
import getWebpackConfig from '../webpack.config.babel';

export default () => {
  const app = new Koa();
  const rollbar = new Rollbar('d127b6e52cdd4ebcaea93d684c756d7e');

  const env = dotenv.config();
  const log = getLogger('App');

  app.use(session(app));
  app.use(flash());
  app.use(async (ctx, next) => {
    try {
      rollbar.log('Starting application...');
      log('Starting up...');
      ctx.state = {
        flash: ctx.flash,
        isSignedIn: () => ctx.session.userId !== undefined,
      };
      await next();
    } catch (err) {
      log('Error: ', err);
      rollbar.error(err, ctx.request);
    }
  });
  app.use(bodyParser());
  app.use(methodOverride((req) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      return req.body._method;
    }
    return null;
  }));
  app.use(serve(path.join(__dirname, '..', 'public')));

  if (process.env.NODE_ENV !== 'test') {
      app.use(middleware({
      config: getWebpackConfig(),
    }));
  } else {
     log('starting nodemon...');
  }
  log(`runnig in ${process.env.NODE_ENV} environment`);
  log(`listen on port == ${process.env.PORT}`);

  app.use(koaLogger());
  const router = new Router();
  addRoutes(router);
  app.use(router.allowedMethods());
  app.use(router.routes());

  const pug = new Pug({
    viewPath: path.join(__dirname, '..', 'views'),
    debug: true,
    compileDebug: true,
    locals: [],
    basedir: path.join(__dirname, '..', 'views'),
    helperPath: [
      { _ },
      { urlFor: (...args) => router.url(...args) },
    ],
  });
  pug.use(app);
  return app;
};
