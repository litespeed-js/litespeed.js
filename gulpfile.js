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

function concat () {
    return src(config.src)
        .pipe(gulpConcat(config.mainFile))
        .pipe(gulpJsmin())
        .pipe(dest(config.dest));
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
exports.demo = demo;
exports.webserver = webserver;
exports.default = series(concat, demo);