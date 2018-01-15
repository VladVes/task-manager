import getLogger from '../lib/log';

const log = getLogger('HTTP:');
export default (router) => {
  router.get('root', '/', (ctx) => {
    log(`GET ${ctx.request.href}`);
    ctx.render('welcome/index', {
      welcome: 'Welcome to the Task Manager.',
      notes: 'Drive your tasks and make your things done!',
    });
  });
};
