import getLogger from '../lib/log';
import hellowfromdb from '../models';

const log = getLogger('HTTP:');
export default (router) => {
  router.get('hellowfromdb', '/hellowfromdb', async (ctx) => {
    log(`GET ${ctx.request.href}`);
    const hellow = await hellowfromdb.findAll();
    ctx.render('testView/hellowfromdb', { hellow });
  });
};
