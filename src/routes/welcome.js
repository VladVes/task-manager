import getLogger from '../lib/log';

const log = getLogger('HTTP:');
export default (router) => {
  router.get('root', '/', (ctx) => {
    //ctx.body = 'Welcome to the JavaScript Jungle.\n Never never never give up!\n';
    log(`GET ${ctx.request.href}`);
    ctx.render('welcome/index', {
      welcome: 'Welcome to the JavaScript Jungle.',
      notes: 'Never never never give up!',
    });
  });
};
