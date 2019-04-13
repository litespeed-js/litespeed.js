// Include gulp
var gulp        = require('gulp'),

    // Plugins
    concat      = require('gulp-concat'),
    webserver   = require('gulp-webserver'),
    jsmin       = require('gulp-jsmin'),

    // Config
    config  = {
        mainFile: 'litespeed.js',
        src: [
            'src/services/container.js',
            'src/services/http.js',
            'src/services/cookie.js',
            'src/services/object.js',
            'src/services/view.js',
            //'src/services/form.js',
            'src/services/state.js',
            'src/services/expression.js',
            'src/services/filter.js',
            'src/filters/escape.js',
            'src/app.js',
            'src/views/init.js',
            'src/views/attr.js',
            //'src/views/alt.js',
            'src/views/bind.js',
            //'src/views/class.js',
            'src/views/echo.js',
            //'src/views/eval.js',
            //'src/views/for.js',
            //'src/views/hide.js',
            //'src/views/href.js',
            //'src/views/id.js',
            'src/views/if.js',
            'src/views/loop.js',
            'src/views/options.js',
            //'src/views/print.js',
            'src/views/rerender.js',
            //'src/views/selected.js',
            //'src/views/src.js',
            'src/views/style.js',
            'src/views/template.js',
            //'src/views/title.js',
            'src/views/trigger.js',
            //'src/views/placeholder.js',
            //'src/views/dragDrop.js'
        ],
        dest: './dist'
    },

    // Config
    configOld  = {
        mainFile: 'litespeed.old.js',
        src: [
            'src/services/container.js',
            'src/services/http.js',
            'src/services/cookie.js',
            'src/services/object.js',
            'src/services/view.js',
            'src/services/deprecated/form.js',
            'src/services/state.js',
            'src/services/expression.js',
            'src/services/filter.js',
            'src/filters/escape.js',
            'src/app.js',
            'src/views/init.js',
            'src/views/attr.js',
            'src/views/if.js',
            'src/views/loop.js',
            'src/views/options.js',
            'src/views/deprecated/alt.js',
            'src/views/deprecated/class.js',
            'src/views/deprecated/echo.js',
            'src/views/deprecated/eval.js',
            'src/views/deprecated/for.js',
            'src/views/deprecated/hide.js',
            'src/views/deprecated/href.js',
            'src/views/deprecated/id.js',
            'src/views/deprecated/print.js',
            'src/views/deprecated/rerender.js',
            'src/views/deprecated/selected.js',
            'src/views/deprecated/src.js',
            'src/views/deprecated/style.js',
            'src/views/deprecated/template.js',
            'src/views/deprecated/title.js',
            'src/views/deprecated/trigger.js',
            'src/views/deprecated/placeholder.js',
        ],
        dest: './dist'
    }
;

gulp.task('concat', function() {
    return gulp.src(config.src)
        .pipe(concat(config.mainFile))
        .pipe(jsmin())
        .pipe(gulp.dest(config.dest));
});

gulp.task('concat-old', function() {
    return gulp.src(configOld.src)
        .pipe(concat(configOld.mainFile))
        .pipe(jsmin())
        .pipe(gulp.dest(configOld.dest));
});

gulp.task('watch', function() {
    gulp.watch(config.src, ['build']);
});

gulp.task('demo', ['concat'], function () {
    gulp.src(config.dest + '/' + config.mainFile)
        .pipe(gulp.dest('./example/scripts'));
});

gulp.task('webserver', function() {
    gulp.src('example')
        .pipe(webserver({
            fallback: 'index.html'
        }));
});

// Default Task
gulp.task('build', ['concat', 'concat-old', 'demo']);