import welcome from './welcome';
import sessions from './sessions';
import user from './user';

const controllers = [welcome, user, sessions];

export default router => controllers.forEach(f => f(router));
