import welcome from './welcome';
import user from './user';

const controllers = [welcome, user];

export default (router) => controllers.forEach(f => f(router));
