const { src, dest } = require('gulp');
let replace = require('gulp-replace');

exports.default = function (cb) {
  src(['dist/studio/index.html'])
    .pipe(replace('type="module"', 'type="text/javascript"'))
    .pipe(dest('dist/studio/'));
  cb();
};
