var gulp = require('gulp');
var gulptsc = require('gulp-tsc');

gulp.task('default', ['compile']);

gulp.task('compile', function() {
  gulp.src(['./src/**/*.ts'])
      .pipe(gulptsc({
        target: 'ES5',
        out: 'flwebgl.js',
        removeComments: true,
        declaration: true
      }))
      .pipe(gulp.dest('./bin/'));
});
