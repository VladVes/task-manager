import getLogger from '../lib/log';

const log = getLogger('HTTP:');
export default (router) => {
  router.get('root', '/', (ctx) => {
    log(`GET ${ctx.request.href}`);
    ctx.render('welcome/index', {
      welcome: 'Welcome to the JavaScript Jungle.',
      notes: 'Never give up!',
    });
  });
};
