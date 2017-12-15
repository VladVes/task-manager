export default (router) => {
  router.get('root', '/', (ctx) => {
    //ctx.body = 'Welcome to the JavaScript Jungle.\n Never never never give up!\n';
    ctx.render('welcome/index', {
      welcome: 'Welcome to the JavaScript Jungle.',
      notes: 'Never never never give up!',
    });
  });
};
