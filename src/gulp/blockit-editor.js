// gulp
const {src, dest, series, watch} = require('gulp')

// required plugins
const del = require('del')
const panini = require('panini')
const rename = require('gulp-rename')
const beautify = require('gulp-jsbeautifier')
const minify = require('gulp-minifier')
const merge = require('merge-stream')
const newer = require('gulp-newer')
const concat = require('gulp-concat')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const shorthand = require('postcss-merge-longhand')
const imagemin = require('gulp-imagemin')

// panini reload cache
async function reloadPanini() {
    await panini.refresh()
}

// clean editor folder
function editorClean() {
    return del(['src/blockit/**', '!src/blockit/src'])
}

// html compile task
function editorHtml() {
    reloadPanini()
    return src('src/blockit/src/pages/*.hbs')
    .pipe(panini({
        root: 'src/blockit/src/pages/',
        layouts: 'src/blockit/src/layouts/',
        partials: 'src/blockit/src/partials/',
        data: 'src/blockit/src/data/'
    }))
    .pipe(rename(path => path.extname = '.html'))
    .pipe(beautify({
        html: {
            file_types: ['.html'],
            max_preserve_newlines: 0,
            preserve_newlines: true,
        }
    }))
    .pipe(dest('src/blockit'))
}

// css compile task
function editorCss() {
    return merge(
        // uikit.min.css compile task
        src('src/blockit/src/assets/scss/uikit.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('uikit.min.css'))
        .pipe(beautify({css: {file_types: ['.css']}}))
        .pipe(minify({minify: true, minifyCSS: true}))
        .pipe(dest('src/blockit/css/vendors')),

        // style.css compile task
        src('src/blockit/src/assets/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('style.css'))
        .pipe(beautify({css: {file_types: ['.css']}}))
        .pipe(postcss([autoprefixer(), shorthand()]))
        .pipe(dest('src/blockit/css'))
    )
}

// js compile task
function editorJs() {
    return merge(
        // utilities.min.js
        src('src/blockit/src/assets/js/utilities/*.js')
        .pipe(newer('src/blockit/js/vendors/utilities.min.js'))
        .pipe(concat('utilities.min.js', {newLine: '\r\n\r\n'}))
        .pipe(minify({minify: true, minifyJS: {sourceMap: false}}))
        .pipe(dest('src/blockit/js/vendors')),

        // blockit editor
        src('src/blockit/src/assets/js/blockit-editor/*.js')
        .pipe(newer('src/blockit/js/*.js'))
        .pipe(concat('blockit-editor.min.js', {newLine: '\r\n\r\n'}))
        .pipe(minify({minify: true, minifyJS: {sourceMap: false}}))
        .pipe(dest('src/blockit/js')),

        // blockit utilities
        src('src/blockit/src/assets/js/blockit-utilities/*.js')
        .pipe(newer('src/blockit/js/vendors/blockit-utilities.min.js'))
        .pipe(rename('blockit-utilities.min.js'))
        .pipe(minify({minify: true, minifyJS: {sourceMap: false}}))
        .pipe(dest('src/blockit/js')),

        // blockit tag js
        src('src/blockit/src/assets/js/blockit-tag/*.js')
        .pipe(newer('src/blockit/js/*.js'))
        .pipe(dest('src/blockit/js')),
    )
}

// image optimization task
function editorImg() {
    return src('src/blockit/src/assets/img/**/*')
    .pipe(newer('src/blockit/img'))
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 80, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ], { verbose: false }
    ))
    .pipe(dest('src/blockit/img'))
}

// static assets task
function editorStatic() {
    return merge(
        // webfonts
        src('src/blockit/src/assets/fonts/*')
        .pipe(dest('src/blockit/fonts')),

        // fontAwesome icons
        src([
            'node_modules/@fortawesome/fontawesome-free/webfonts/fa-brands-400.woff',
            'node_modules/@fortawesome/fontawesome-free/webfonts/fa-brands-400.woff2',
            'node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff',
            'node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2'
        ])
        .pipe(dest('src/blockit/fonts')),

        // favicon
        src('src/blockit/src/assets/static/favicon.ico')
        .pipe(dest('src/blockit')),

        // uikit.min.js
        src('node_modules/uikit/dist/js/uikit.min.js')
        .pipe(dest('src/blockit/js/vendors')),

        // editorjs.io
        src([
            'src/blockit/src/assets/js/editorjs-io/editor.js',
            'src/blockit/src/assets/js/editorjs-io/codemirror/bundle.js',
            'src/blockit/src/assets/js/editorjs-io/delimiter/bundle.js',
            'src/blockit/src/assets/js/editorjs-io/header/bundle.js',
            'src/blockit/src/assets/js/editorjs-io/image/bundle.js',
            'src/blockit/src/assets/js/editorjs-io/list/bundle.js',
            'src/blockit/src/assets/js/editorjs-io/quote/bundle.js',
            'src/blockit/src/assets/js/editorjs-io/table/bundle.js'
        ])
        .pipe(concat('editorjs.min.js', {newLine: '\r\n\r\n'}))
        .pipe(minify({minify: true, minifyJS: {sourceMap: false}}))
        .pipe(dest('src/blockit/js/vendors'))
    )
}

// watch files task
function editorWatch() {
    watch('src/blockit/src/assets/scss/**/*.scss', series(editorCss))
    watch('src/blockit/src/assets/js/**/*.js', series(editorJs))
    watch('src/blockit/src/assets/img/**/*', series(editorImg))
    //watch(['src/blockit/src/**/*.hbs', 'src/data/blockit/*.json'], series(editorHtml))
}

module.exports = {editorClean, editorHtml, editorCss, editorJs, editorImg, editorStatic, editorWatch}