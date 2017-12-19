import getLogger from '../lib/log';
import { Testmodel } from '../models';

const log = getLogger('HTTP:');
export default (router) => {
  router.get('hellow', '/hellow', async (ctx) => {
    log(`GET ${ctx.request.href}`);
    const hellow = await Testmodel.findAll();
    ctx.render('testView/hellowfromdb', { hellow });
  });
};
