import getLogger from '../lib/log';
import buildFormObj from '../lib/formObjectBuilder';
import { Task, Tag } from '../models';

export default (router) => {
  router.get('tasks', '/tasks', async (ctx) => {
    const newOneTask = Task.build({
      name: 'slug',
      description: 'created on flight',
      creator: 1,
      assignedTo: 2,
      status: 1
    });
    await newOneTask.save();

    const tasks = await Task.findAll({
      include: [{
        model: Tag,
        through: {

        }
      }],
    });

    //const tasks = await Task.findAll();
    ctx.render('tasks', { tasks });
  });
};
