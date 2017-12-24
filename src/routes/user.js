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
    .get('profile', '/user/profile', async (ctx) => {
      if (ctx.state.isSignedIn()) {
        const id = ctx.session.userId;
        const user = await User.findById(id);
        ctx.render('users/profile', { f: buildFormObj(user) });
      } else {
        ctx.flash.set('You should sing IN or sign UP first.');
        ctx.redirect(router.url('root'));
      }
    })
    .patch('updateProfile', '/user/profile', async (ctx) => {
      if (ctx.state.isSignedIn()) {
        const data = ctx.request.body.form;
        const user = await User.findById(ctx.session.userId);
        try {
          await user.update(data);
          ctx.flash.set('Profile saved successfully.');
          ctx.redirect(router.url('root'));
        } catch (e) {
          ctx.render('users/profile', { f: buildFormObj(user, e) });
        }
      } else {
        ctx.flash.set('You should sing IN or sign UP first.');
        ctx.redirect(router.url('root'));
      }
    })
    .post('users', '/users', async (ctx) => {
      const user = User.build(ctx.request.body.form);
      try {
        await user.save();
        ctx.flash.set('User has been created');
        ctx.redirect(router.url('root'));
      } catch (e) {
        ctx.render('users/new', { f: buildFormObj(user, e) });
      }
    })
    .delete('deleteUser', '/user/delete', async (ctx) => {
      if (ctx.state.isSignedIn()) {
        const user = await User.findById(ctx.session.userId);
        user.destroy();
        ctx.session = {};
        ctx.flash.set('Accaunt has been deleted');
        ctx.redirect(router.url('root'));
      } else {
        ctx.flash.set('You should sing IN or sign UP first.');
        ctx.redirect(router.url('root'));
      }
    });
};
