var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify/minifier');
var concat = require('gulp-concat');
var uglifyJsHarmony = require('uglify-js-harmony');
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
    gulp.watch('./app/*.html', browserSync.reload);
    gulp.watch('./app/js/**/*.js', browserSync.reload);
})

gulp.task('build', function(){
    gulp.src('app/js/**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(uglify(null, uglifyJsHarmony))
      .on('error', function(err){console.log(err)})
      .pipe(concat('main.js'))
      .pipe(gulp.dest('dist'));
})