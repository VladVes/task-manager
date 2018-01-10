import getLogger from '../lib/log';
import buildFormObj from '../lib/formObjectBuilder';
import { TaskStatus } from '../models';

export default (router) => {
  router.get('statuses', '/statuses', async (ctx) => {
    const statuses = await TaskStatus.findAll();
    ctx.render('statuses', { statuses });
  })
  .delete('deleteStatus', '/status/delete/:statusId', async (ctx) => {
    const { statusId: id } = ctx.params;
    const status = await TaskStatus.findById(id);
    const name = status.name;
    status.destroy();
    ctx.flash.set(`Status "${name}" deleted`);
    ctx.redirect(router.url('statuses'));
  });
};
