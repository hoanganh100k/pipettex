// gulp plugin
const {src, dest} = require('gulp')

// required plugins
const merge = require('merge-stream')
const minify = require('gulp-minifier')
const postcss = require('gulp-postcss')
const purgecss = require('@fullhuman/postcss-purgecss')
const mediaquery = require('postcss-combine-media-query')

// Minify for production files
function minifyFiles() {
    return merge(
        // html minify
        src('dist/**/*.html')
        .pipe(minify({minify: true, minifyHTML: {collapseWhitespace: true, removeComments: true}}))
        .pipe(dest('dist')),

        // css minify
        src('dist/css/*.css')
        .pipe(postcss([
            mediaquery(),
            purgecss({
                content: ['dist/*.html', 'dist/js/**/*.js'],
                safelist: {standard: [/@s$/, /@m$/]}
            })
        ]))
        .pipe(minify({minify: true, minifyCSS: true}))
        .pipe(dest('dist/css')),

        // js minify
        src('dist/js/*.js')
        .pipe(minify({minify: true, minifyJS: {sourceMap: false}}))
        .pipe(dest('dist/js'))
    )
}

module.exports = {minifyFiles}