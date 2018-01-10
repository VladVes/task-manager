import getLogger from '../lib/log';
import buildFormObj from '../lib/formObjectBuilder';
import { TaskStatus } from '../models';

export default (router) => {
  router.get('statuses', '/statuses', async (ctx) => {
    const statuses = await TaskStatus.findAll();
    ctx.render('statuses', { statuses });
  });
};
