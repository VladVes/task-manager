import welcome from './welcome';
import sessions from './sessions';
import users from './users';
import tasks from './tasks';
import statuses from './statuses';
import filters from './filters';

const controllers = [welcome, users, sessions, tasks, statuses, filters];

export default router => controllers.forEach(f => f(router));
