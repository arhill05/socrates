var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify/minifier');
var concat = require('gulp-concat');
var uglifyJsHarmony = require('uglify-js-harmony');
var htmlReplace = require('gulp-html-replace');
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
    console.log('=== main.js ===');
    gulp.src('app/js/**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(uglify(null, uglifyJsHarmony))
      .pipe(concat('main.js'))
      .pipe(gulp.dest('dist/js'));

    console.log('=== lib.js ===');
    gulp.src('bower_components/**/*.min.js')
      .pipe(uglify(null, uglifyJsHarmony))
      .pipe(concat('lib.js'))
      .pipe(gulp.dest('dist/js'));

    gulp.src('app/index.html')
        .pipe(htmlReplace({
            'js': 'js/main.js',
            'lib': 'js/lib.js'
        }))
        .pipe(gulp.dest('dist'))

    gulp.src('app/views/*.html')
        .pipe(gulp.dest('dist/views'));
})