var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var browserSync = require('browser-sync').create();

gulp.task('hello', function () {
    console.log('hello');
})

gulp.task('browserSync', function(){
    browserSync.init({
        server: {
            baseDir: 'app',
            routes:
            {
                '/bower_components': 'bower_components'
            }
        },
        browser: 'google chrome'

    })
})

gulp.task('less', function () {
    return gulp.src('./app/less/**/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./app/css'))
        .pipe(browserSync.reload({
                stream: true
        }));
})

gulp.task('watch', ['browserSync', 'less'], function () {
    gulp.watch('./app/less/**/*.less', ['less']);
})