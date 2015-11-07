// Include gulp
var gulp    = require('gulp'),

    // Plugins
    uglify  = require('gulp-uglify'),
    concat  = require('gulp-concat'),
    rename  = require('gulp-rename'),
    watch   = require('gulp-watch'),
    copy    = require('gulp-copy'),
    babel   = require("gulp-babel"),

    // Config
    config  = {
        mainFile: './litespeed.js',
        src: 'src/**/*.js',
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
    return gulp.src(config.src)
        .pipe(babel())
        .pipe(gulp.dest(config.dest));
});

// Default Task
gulp.task('build', ['concat', 'uglify', 'bubel']);