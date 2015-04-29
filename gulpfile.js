// Include gulp
var gulp    = require('gulp');

// Include plugins
var uglify  = require('gulp-uglify');
var concat  = require('gulp-concat');
var rename  = require('gulp-rename');

// Config
var mainFile = './litespeed.js';

gulp.task('concat', function() {
    return gulp.src('src/**/*.js')
        .pipe(concat(mainFile))
        .pipe(gulp.dest('./dist'));
});

gulp.task('uglify', function() {
    return gulp.src(mainFile)
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest('./dist'));
});

// Default Task
gulp.task('build', ['concat', 'uglify']);