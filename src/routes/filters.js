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
  })
  .get('findMy', '/findMy', async (ctx) => {
    if (ctx.state.isSignedIn()) {
      const id = ctx.session.userId;
      const tasks = await Task.findAll({
        include: [
          { model: User, where: { id } },
          { association: Creator, paranoid: false },
          { model: TaskStatus, paranoid: false },
          Tag,
        ],
      });
      ctx.render('tasks', { tasks });
    } else {
      ctx.flash.set('You should sing IN or sign UP first.');
      ctx.redirect(router.url('root'));
    }
  });
};
