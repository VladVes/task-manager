import getLogger from '../lib/log';
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
  });
};
