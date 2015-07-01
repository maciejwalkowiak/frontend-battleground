'use strict';

let config = {
    src: 'src',
    bowerComponents: 'src/bower_components'
};

let gulp = require('gulp'),
    connect = require('gulp-connect'),
    bower = require('gulp-bower');

gulp.task('server', () => connect.server({
    livereload: true,
    root: config.src
}));

gulp.task('bower', () => bower().pipe(gulp.dest(config.bowerComponents)));

gulp.task('watch', () =>
    gulp.watch(config.src + '/**/*').on('change', (file) => gulp.src(file.path).pipe(connect.reload()))
);

gulp.task('default', ['bower', 'server', 'watch']);