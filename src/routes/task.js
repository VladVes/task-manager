import getLogger from '../lib/log';
import buildFormObj from '../lib/formObjectBuilder';
import { Task, Tag, User } from '../models';

export default (router) => {
  router.get('tasks', '/tasks', async (ctx) => {

    const tasks = await Task.findAll({
      include: [Tag],
    });
    const tags = await Tag.findAll();
    console.log("ALL TAGS: ", tags);

    for (let i = 0; i < tasks.length; i++) {
      tasks[i].tags = await tasks[i].getTags();
    }

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
      data.tags = data.tags.split(',').map(tag => ({ name: tag }));
      data.creator = ctx.session.userId;
      console.log("DATA FROM new task FORM : ", data);

      //const newTask = Task.build(data, { include: [Tag] });
      Task.create(data, { include: [Tag] });
      //console.log("RESULT NEW TASK: ", newTask);
      //await newTask.save();


      ctx.redirect(router.url('root'));
    } else {
      ctx.flash.set('You should sing IN or sign UP first.');
      ctx.redirect(router.url('root'));
    }
  });
};
