// Include gulp
const { src, dest, series } = require('gulp');

// Plugins
const gulpConcat = require('gulp-concat');
const gulpWebserver = require('gulp-webserver');
const gulpJsmin = require('gulp-jsmin');

// Config
const config  = {
    mainFile: 'litespeed.js',
    src: [
        'src/services/container.js',
        'src/services/http.js',
        'src/services/cookie.js',
        'src/services/object.js',
        'src/services/view.js',
        'src/services/router.js',
        'src/services/expression.js',
        'src/services/filter.js',
        'src/filters/escape.js',
        'src/app.js',
        'src/views/router.js',
        'src/views/attrs.js',
        'src/views/bind.js',
        'src/views/if.js',
        'src/views/loop.js',
        'src/views/template.js',
    ],
    dest: './dist'
};

// Config
const configOld  = {
    mainFile: 'litespeed.old.js',
    src: [
        'src/services/container.js',
        'src/services/http.js',
        'src/services/cookie.js',
        'src/services/object.js',
        'src/services/view.js',
        'src/services/deprecated/form.js',
        'src/services/router.js',
        'src/services/expression.js',
        'src/services/filter.js',
        'src/filters/escape.js',
        'src/app.js',
        'src/views/router.js',
        'src/views/attrs.js',
        'src/views/if.js',
        'src/views/loop.js',
        'src/views/template.js',
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
        'src/views/deprecated/title.js',
        'src/views/deprecated/trigger.js',
        'src/views/deprecated/options.js',
    ],
    dest: './dist'
};

function concat () {
    return src(config.src)
        .pipe(gulpConcat(config.mainFile))
        .pipe(gulpJsmin())
        .pipe(dest(config.dest));
}

function concatOld () {
    return src(configOld.src)
        .pipe(gulpConcat(configOld.mainFile))
        .pipe(gulpJsmin())
        .pipe(dest(configOld.dest));
}

function demo () {
    return src(config.dest + '/' + config.mainFile)
        .pipe(dest('./example/scripts'));
}

function webserver() {
    return src('example')
        .pipe(gulpWebserver({
            fallback: 'index.html'
        }));
}

exports.concat = concat;
exports.concatOld = concatOld;
exports.demo = demo;
exports.webserver = webserver;
exports.default = series(concat, concatOld, demo);