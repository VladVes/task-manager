import getLogger from '../lib/log';
import buildFormObj from '../lib/formObjectBuilder';
import { Task } from '../models';

export default (router) => {
  router.get('tasks', '/tasks', async (ctx) => {
    const tasks = await Task.findAll();
    ctx.render('task', { tasks });
  });
};
