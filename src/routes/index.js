import welcome from './welcome';
import sessions from './sessions';
import user from './user';
import task from './task';

const controllers = [welcome, user, sessions, task];

export default router => controllers.forEach(f => f(router));
