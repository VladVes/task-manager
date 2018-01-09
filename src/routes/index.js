import welcome from './welcome';
import sessions from './sessions';
import users from './users';
import tasks from './tasks';

const controllers = [welcome, users, sessions, tasks];

export default router => controllers.forEach(f => f(router));
