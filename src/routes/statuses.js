import getLogger from '../lib/log';
import buildFormObj from '../lib/formObjectBuilder';
import { TaskStatus } from '../models';

export default (router) => {
  router.get('statuses', '/statuses', async (ctx) => {
    const statuses = await TaskStatus.findAll();
    ctx.render('statuses', { statuses: statuses.slice(1) });
  })
  .get('status', '/status/:statusId', async (ctx) => {
    const { statusId: id } = ctx.params;
    const status = await TaskStatus.findById(id);
    ctx.render('statuses/edit', { f: buildFormObj(status) });
  })
  .get('newStatus', '/statuses/new', async (ctx) => {
    if (ctx.state.isSignedIn()) {
      const status = TaskStatus.build();
      ctx.render('statuses/new', { f: buildFormObj(status) });
    } else {
      ctx.flash.set('You should sing IN or sign UP first.');
      ctx.redirect(router.url('root'));
    }
  })
  .post('saveStatus', '/statuses', async (ctx) => {
    if (ctx.state.isSignedIn()) {
      const data = ctx.request.body.form;
      const newStatus = TaskStatus.build(data);
      try {
        await newStatus.save();
        ctx.flash.set('New status has been created successfully');
        ctx.redirect(router.url('statuses'));
      } catch (e) {
        ctx.render('statuses/new', { f: buildFormObj(newStatus, e) });
      }
    } else {
      ctx.flash.set('You should sing IN or sign UP first.');
      ctx.redirect(router.url('root'));
    }
  })
  .patch('editStatus', '/status/edit/:statusId', async (ctx) => {
    if (ctx.state.isSignedIn()) {
      const { statusId: id } = ctx.params;
      const data = ctx.request.body.form;
      const status = await TaskStatus.findById(id);
      try {
        await status.update(data);
        ctx.flash.set('Status updated.');
        ctx.redirect(router.url('statuses'));
      } catch (e) {
        ctx.render('statuses/edit', { f: buildFormObj(status, e) });
      }
    } else {
      ctx.flash.set('You should sing IN or sign UP first.');
      ctx.redirect(router.url('root'));
    }
  })
  .delete('deleteStatus', '/status/delete/:statusId', async (ctx) => {
    if (ctx.state.isSignedIn()) {
      const { statusId: id } = ctx.params;
      const status = await TaskStatus.findById(id);
      const name = status.name;
      status.destroy();
      ctx.flash.set(`Status "${name}" deleted`);
      ctx.redirect(router.url('statuses'));
    } else {
      ctx.flash.set('You should sing IN or sign UP first.');
      ctx.redirect(router.url('root'));
    }
  });
};
