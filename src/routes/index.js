import welcome from './welcome';
import sessions from './sessions';
import users from './users';
import tasks from './tasks';
import statuses from './statuses';

const controllers = [welcome, users, sessions, tasks, statuses];

export default router => controllers.forEach(f => f(router));
