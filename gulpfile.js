const { writeIndex } = require('create-index');
const gulp = require('gulp');
const fg = require('fast-glob');

gulp.task('gen.asset.image', done => {
  const root = './src/assets/';
  const dirs = fg.sync('images', {
    cwd: root,
    onlyFiles: false,
  });
  // eslint-disable-next-line lodash/prefer-lodash-method
  const fullDirs = dirs.map(dir => root + dir);
  writeIndex(fullDirs, {
    banner: [
      '// Auto generated: https://github.com/gajus/create-index',
      '// Remove @create-index to exclude file from being auto-generated',
    ],
    extensions: ['svg', 'png'],
    ignoreUnsafe: true,
  });
  done();
});
