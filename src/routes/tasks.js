import getLogger from '../lib/log';
import buildFormObj from '../lib/formObjectBuilder';
import { Task, Tag, User, Creator, TaskStatus } from '../models';

export default (router) => {
  router.get('tasks', '/tasks', async (ctx) => {
    const tasks = await Task.findAll({
      include: [
        {model: User, paranoid: false},
        {association: Creator, paranoid: false},
        TaskStatus,
        Tag,
      ],
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
  })
  .get('task', '/task/:taskId', async (ctx) => {
    const { taskId: id } = ctx.params;
    const task = await Task.findById(id, {
      include: [{model: User, paranoid: false}, Creator, TaskStatus, Tag],
    });
    task.tags = task.Tags.map(tag => tag.name).join(', ');
    const users = await User.findAll({ paranoid: false });
    const statuses = await TaskStatus.findAll({ paranoid: false });
    ctx.render('tasks/edit', { f: buildFormObj(task), users, statuses });
  })
  .patch('editTask', '/tasks/edit/:taskId', async (ctx) => {
    if (ctx.state.isSignedIn()) {
      const { taskId: id } = ctx.params;
      const data = ctx.request.body.form;
      const task = await Task.findById(id, {
        include: [Tag, User, Creator, TaskStatus],
      });
    try {
        await task.update(data);
        ctx.flash.set('Task updated successfully.');
        ctx.redirect(router.url('tasks'));
      } catch (e) {
        const users = await User.findAll();
        const statuses = await TaskStatus.findAll();
        ctx.render('tasks/edit', { f: buildFormObj(task, e), users, statuses });
      }
    } else {
      ctx.flash.set('You should sing IN or sign UP first.');
      ctx.redirect(router.url('root'));
    }
  })
  .delete('deleteTask', '/tasks/delete/:taskId', async (ctx) => {
    if (ctx.state.isSignedIn()) {
      const { taskId: id } = ctx.params;
      const task = await Task.findById(id);
      task.destroy();
      ctx.flash.set('Task was deleted');
      ctx.redirect(router.url('tasks'));
    } else {
      ctx.flash.set('You should sing IN or sign UP first.');
      ctx.redirect(router.url('root'));
    }
  });
};
