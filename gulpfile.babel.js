'use strict';

const config = {
    src: 'app',
    bowerComponents: 'bower_components'
};

const gulp = require('gulp'),
    connect = require('gulp-connect'),
    bower = require('gulp-bower'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    del = require('del'),
    minifyCss = require('gulp-minify-css');

gulp.task('clean', (cb) => del(['build'], cb));

gulp.task('server', () => connect.server({
    livereload: true,
    root: config.src
}));

gulp.task('bower', ['clean'], () => bower().pipe(gulp.dest(config.bowerComponents)));

gulp.task('usemin', ['clean'], () => {
    return gulp.src('app/*.html')
        .pipe(usemin({
            css: [minifyCss(), 'concat', rev()],
            js: [uglify(), rev()],
            inlinejs: [uglify()]
        }))
        .pipe(gulp.dest('build/'));
});

gulp.task('watch', () =>
    gulp.watch(config.src + '/**/*').on('change', (file) => {
        return gulp.src(file.path).pipe(connect.reload())
    })
);

gulp.task('build', ['usemin']);

gulp.task('default', ['bower', 'server', 'watch']);