// Include gulp
var gulp    = require('gulp');

// Include plugins
var uglify  = require('gulp-uglify');

/**
 * Minify JS
 */
gulp.task('scripts', function() {
    return gulp.src('src/**/*.js',{base:'src/dist/scripts'})
        .pipe(uglify().on('error', function (err) {
            console.log(err);
        }))
        .pipe(gulp.dest('public_html/dist/scripts').on('error', function (err) {
            console.log(err);
        }));
});

// Default Task
gulp.task('build', ['scripts']);