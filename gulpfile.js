// Include gulp
var gulp        = require('gulp'),

    // Plugins
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    rename      = require('gulp-rename'),
    watch       = require('gulp-watch'),
    copy        = require('gulp-copy'),
    babel       = require("gulp-babel"),
    webserver   = require('gulp-webserver'),

    // Config
    config  = {
        mainFile: './litespeed.js',
        src: [
            'src/services/container.js',
            'src/services/http.js',
            'src/services/object.js',
            'src/services/router.js',
            'src/services/view.js',
            'src/app.js',
            'src/views/app.js',
            'src/views/bind.js',
            'src/views/eval.js',
            'src/views/loop.js',
            'src/views/submit.js',
            'src/views/placeholder.js'
        ],
        dest: './example/scripts'
    }
;

gulp.task('concat', function() {
    return gulp.src(config.src)
        .pipe(concat(config.mainFile))
        .pipe(gulp.dest(config.dest));
});

gulp.task('uglify', function() {
    return gulp.src(config.mainFile)
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest(config.dest));
});

gulp.task('watch', function() {
    gulp.watch(config.src, ['build']);
});

gulp.task('bubel', function () {
    return gulp.src(config.mainFile)
        .pipe(babel())
        .pipe(gulp.dest(config.dest));
});

gulp.task('webserver', function() {
    gulp.src('example')
        .pipe(webserver({
            fallback: 'index.html'
        }));
});

// Default Task
gulp.task('build', ['concat', 'uglify', 'bubel']);