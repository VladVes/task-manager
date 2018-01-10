import getLogger from '../lib/log';
import buildFormObj from '../lib/formObjectBuilder';
import { Task, Tag, User, Creator, TaskStatus } from '../models';

export default (router) => {
  router.get('findByTag', '/findByTag/:tagId', async (ctx) => {
    cont { tagId: id } = ctx.params;
    const tasks = await Task.findAll({
      include: [
        { model: User, paranoid: false },
        { association: Creator, paranoid: false },
        { model: TaskStatus, paranoid: false },
        { model: Tag, where: { id } },
      ],
    });
    ctx.render('tasks', { tasks });
  })

  });
};
