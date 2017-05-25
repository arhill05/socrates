var gulp = require('gulp');
var gutil = require('gulp-util');
var ftp = require('vinyl-ftp');
var ftpConfig = require('./ftpconfig.json');
var less = require('gulp-less');
var path = require('path');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify/minifier');
var concatCSS = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglifyJsHarmony = require('uglify-js-harmony');
var htmlReplace = require('gulp-html-replace');
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'app',
            routes: {
                '/bower_components': 'bower_components'
            }
        },
        browser: 'google chrome'

    })
})

gulp.task('less', function () {
    return gulp
        .src('./app/less/**/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./app/css'))
        .pipe(browserSync.reload({stream: true}));
})

gulp.task('watch', [
    'browserSync', 'less'
], function () {
    gulp.watch('./app/less/**/*.less', ['less']);
    gulp.watch('./app/*.html', browserSync.reload);
    gulp.watch('./app/js/**/*.js', browserSync.reload);
})

gulp.task('build', function () {
    console.log('=== main.js ===');
    gulp
        .src(['app/js/app.js', 'app/js/services/*.js', 'app/js/controllers/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'));

    console.log('=== lib.js ===');
    gulp
        .src([
        'bower_components/jquery/dist/jquery.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/angularfire/dist/angularfire.js',
        'bower_components/firebase/firebase.js',
        'bower_components/firebase/firebase-app.js',
        'bower_components/firebase/firebase-auth.js',
        'bower_components/firebase/firebase-database.js',
        'bower_components/toastr/toastr.min.js'
    ])
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('dist/js'));

    console.log('=== css ===');
    gulp
        .src('app/css/main.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
    gulp
        .src(['bower_components/toastr/toastr.min.css'])
        .pipe(concatCSS('vendor.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));


    gulp
        .src('app/index.html')
        .pipe(htmlReplace({'js': 'js/main.js', 'lib': 'js/lib.js', 'vendor-css': 'css/vendor.css'}))
        .pipe(gulp.dest('dist'))

    gulp
        .src('app/views/*.html')
        .pipe(gulp.dest('dist/views'));
})

gulp.task('deploy', function () {
    var conn = ftp.create({host: ftpConfig.host, user: ftpConfig.user, password: ftpConfig.password, log: gutil.log})

    var globs = ['dist/css/**', 'dist/js/**', 'dist/views/**', 'dist/index.html'];

    return gulp
        .src(globs, {
        base: './dist',
        buffer: false
    })
        .pipe(conn.dest('dev/socrates'));

})