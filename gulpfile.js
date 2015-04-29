// Include gulp
var gulp    = require('gulp');

// Include plugins
var uglify  = require('gulp-uglify');
var concat  = require('gulp-concat');

// Config
var mainFile = './litespeed.js';

gulp.task('concat', function() {
    return gulp.src('src/**/*.js')
        .pipe(concat(mainFile))
        .pipe(gulp.dest('.'));
});

gulp.task('uglify',function() {
    return gulp.src(mainFile)
        .pipe(uglify())
        .pipe(gulp.dest('.'));
});

// Default Task
gulp.task('build', ['concat']);