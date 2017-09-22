var gulp = require('gulp');
var gutil = require('gulp-util');
var ftp = require('vinyl-ftp');
var ftpConfig = require('./ftpconfig.json');
var sftp = require('gulp-sftp');
var less = require('gulp-less');
var path = require('path');
var jshint = require('gulp-jshint');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var concatCSS = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var htmlReplace = require('gulp-html-replace');
var browserSync = require('browser-sync').create();
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'app',
            routes: {
                '/bower_components': 'bower_components',
                '/node_modules': 'node_modules',
                '/public': 'public'
            }
        }
    })
})

gulp.task('less', function () {
    return gulp
        .src(['./app/less/**/main.less'])
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./app/css'))
        .pipe(browserSync.reload({stream: true}));
})

gulp.task('lessPublic', function () {
    return gulp
        .src(['./public/less/**/styles.less'])
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.reload({stream: true}));
})

gulp.task('watch', [
    'browserSync', 'less', 'lessPublic'
], function () {
    gulp.watch('./app/less/**/*.less', ['less']);
    gulp.watch('./public/less/**/*.less', ['lessPublic']);
    gulp.watch('./app/*.html', browserSync.reload);
    gulp.watch('./app/js/**/*.js', browserSync.reload);
    gulp.watch('./public/**/**.*', browserSync.reload);
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
        'bower_components/angular/angular.min.js',
        'bower_components/angular-animate/angular-animate.min.js',
        'bower_components/angular-ui-router/release/angular-ui-router.min.js',
        'bower_components/angularfire/dist/angularfire.min.js',
        'bower_components/firebase/firebase.js',
        'bower_components/firebase/firebase-app.js',
        'bower_components/firebase/firebase-auth.js',
        'bower_components/firebase/firebase-database.js',
        'bower_components/toastr/toastr.js',
        'node_modules/alertifyjs/build/alertify.js'
    ])
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('dist/js'));

    console.log('=== css ===');
    gulp
        .src('app/css/main.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));

    gulp
        .src('app/img/*')
        .pipe(gulp.dest('dist/img'));

    gulp
        .src(['bower_components/toastr/toastr.min.css', 'node_modules/alertifyjs/build/css/alertify.min.css'])
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

gulp.task('deployDev', function () {
    var conn = ftp.create({host: ftpConfig.host, user: ftpConfig.user, password: ftpConfig.password, log: gutil.log})

    var globs = ['dist/img/**', 'dist/css/**', 'dist/js/**', 'dist/views/**', 'dist/index.html'];

    return gulp
        .src(globs, {
        base: './dist',
        buffer: false
    })
        .pipe(sftp({host: ftpConfig.host, user: ftpConfig.user, pass: ftpConfig.password, remotePath: '/srv/www/dev.andrewhill.io/socrates'}));

})

gulp.task('deployProd', function () {
    var conn = ftp.create({host: ftpConfig.host, user: ftpConfig.user, password: ftpConfig.password, log: gutil.log})

    var globs = ['dist/img/**', 'dist/css/**', 'dist/js/**', 'dist/views/**', 'dist/index.html'];

    return gulp
        .src(globs, {
        base: './dist',
        buffer: false
    })
        .pipe(sftp({host: ftpConfig.host, user: ftpConfig.user, pass: ftpConfig.password, remotePath: '/srv/www/socratesapp.co'}));

})