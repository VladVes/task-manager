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
    const tags = await Tag.findAll();
    newOneTask.addTag(tags);
    await newOneTask.save();

    const tasks = await Task.findAll({
      include: [{
        model: Tag,
        through: {
        }
      }],
    });

    for (let i = 0; i < tasks.length; i++) {
      tasks[i].tags = await tasks[i].getTags();
    }

    tasks.forEach((task) => {
      console.log("is tagsColl exists : ", task.tags);
    });

    ctx.render('tasks', { tasks });
  });
};
