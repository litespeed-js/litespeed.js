// Include gulp
var gulp    = require('gulp');

// Include plugins
var uglify  = require('gulp-uglify');

/**
 * Minify JS
 */
gulp.task('uglify',function() {
    return gulp.src('src/**/*.js',{base:'src/dist'})
        .pipe(uglify().on('error', function (error) {
            console.log(error);
        }))
        .pipe(gulp.dest('./src/dist').on('error', function (error) {
            console.log(error);
        }));
});

// Default Task
gulp.task('build', ['uglify']);