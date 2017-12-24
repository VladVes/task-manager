import 'babel-polyfill';

import gulp from 'gulp';
import gutil from 'gulp-util';
import repl from 'repl';
import getServer from './src';

gulp.task('console', () => {
  gutil.log = gutil.noop;
  const replServer = repl.start({
    prompt: 'Application console > ',
  });
});

gulp.task('server', (cb) => {
  getServer().listen(process.env.PORT || 3000, cb);
});
