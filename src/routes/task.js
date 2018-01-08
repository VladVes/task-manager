import getLogger from '../lib/log';
import buildFormObj from '../lib/formObjectBuilder';
import { Task, Tag, User, Creator, TaskStatus } from '../models';

export default (router) => {
  router.get('tasks', '/tasks', async (ctx) => {
    const tasks = await Task.findAll({
      include: [Tag, User, Creator, TaskStatus],
    });
    ctx.render('tasks', { tasks });
  })
  .get('newTask', '/tasks/new', async (ctx) => {
    if (ctx.state.isSignedIn()) {
      const task = Task.build();
      const users = await User.findAll();
      ctx.render('tasks/new', { f: buildFormObj(task), users });
    } else {
      ctx.flash.set('You should sing IN or sign UP first.');
      ctx.redirect(router.url('root'));
    }
  })
  .post('saveTask', '/tasks', async (ctx) => {
    if (ctx.state.isSignedIn()) {
      const data = ctx.request.body.form;
      data.Tags = data.tags.split(',').map(tag => ({ name: tag }));
      data.creator = ctx.session.userId;

      const newTask = Task.build(data, { include: [Tag] });
      try {
        await newTask.save();
        ctx.flash.set('New task has been created successfully');
        ctx.redirect(router.url('tasks'));
      } catch (e) {
        const users = await User.findAll();
        ctx.render('tasks/new', { f: buildFormObj(newTask, e), users });
      }

    } else {
      ctx.flash.set('You should sing IN or sign UP first.');
      ctx.redirect(router.url('root'));
    }
  });
};
