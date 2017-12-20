import getLogger from '../lib/log';
import buildFormObj from '../lib/formObjectBuilder';
import { User } from '../models';


const log = getLogger('HTTP:');
export default (router) => {
  router.get('users', '/users', async (ctx) => {
    log(`GET ${ctx.request.href}`);
    const users = await User.findAll();
    ctx.render('users', { users });
  })
  .get('newUser', '/users/new', (ctx) => {
      const user = User.build();
      ctx.render('users/new', { f: buildFormObj(user) });
  })
  .post('users', '/users', async (ctx) => {
      const form = ctx.request.body.form;
      console.log('FORM: ', form);
      const user = User.build(form);
      try {
        await user.save();
        ctx.flash.set('User has been created');
        ctx.redirect(router.url('root'));
      } catch (e) {
        ctx.render('users/new', { f: buildFormObj(user, e) });
      }
  });
};
