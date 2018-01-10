import getLogger from '../lib/log';
import buildFormObj from '../lib/formObjectBuilder';
import { Task, Tag, User, Creator, TaskStatus } from '../models';

export default (router) => {
  router.get('findByTag', '/findByTag/:tagId', async (ctx) => {
    const { tagId: id } = ctx.params;
    const tag = await Tag.findById(id);
    const tasks = await Task.findAll({
      include: [
        { model: User, paranoid: false },
        { association: Creator, paranoid: false },
        { model: TaskStatus, paranoid: false },
        { model: Tag, where: { name: tag.name } },
      ],
    });
    ctx.render('tasks', { tasks });
  });
};
