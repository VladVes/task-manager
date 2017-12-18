import welcome from './welcome';
import hellowfromdb from './hellowfromdb';

const controllers = [welcome, hellowfromdb];

export default (router) => controllers.forEach(f => f(router));
