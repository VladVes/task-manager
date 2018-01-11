import getLogger from '../lib/log';
import buildFormObj from '../lib/formObjectBuilder';
import { Task, Tag, User, Creator, TaskStatus, Op } from '../models';

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
  })
  .get('filter', '/filter', async (ctx) => {
      const data = ctx.request.query;
      const query = [
        { model: User, paranoid: false },
        { association: Creator, paranoid: false },
        { model: TaskStatus, paranoid: false },
        { model: Tag },
      ];
      const tagNames = data.tags.split(',').map(tag => tag.trim());
      console.log("!!!!!!!!!!!!!PREPARED TAG NAMES: ", tagNames);
      for (const param in data) {
        if (data[param] !== '0' && data[param] !== '') {
          switch (param) {
            case 'assignedTo':
              query[0].where = { id: data.assignedTo };
              break;
            case 'creator':
              query[1].where = { id: data.creator };
              break;
            case 'status':
              query[2].where = { id: data.status };
              break;
            case 'tags':
              query[3].where = { name: { [Op.or]: tagNames } };
              break;
            default:
              break;
          }
        }
      }
      console.log("!!!!!!!!!!!!!PREPAED QUETY: ", query);
      const tasks = await Task.findAll({
        include: query,
      });
      ctx.render('tasks', { tasks });
  });
};
