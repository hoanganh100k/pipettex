// gulp
const {task, series} = require('gulp')

// blockit modules
const {themeClean, themeHtml, themeCss, themeJs, themeImg, themeStatic, themeWatch} = require('./src/gulp/blockit-theme')
const {minifyFiles} = require('./src/gulp/blockit-minify')

// blockit methods and sockets
const {methodLibrary} = require('./src/gulp/blockit-methods')
const {socketLibrary} = require('./src/gulp/blockit-sockets')

// browsersync
const browsersync = require('browser-sync').create()

// browsersync init
function runBrowsersync() {
    browsersync.init({
        ui: false,
        notify: false,
        watch: true,
        startPath: '/blockit',
        server: 'dist',
        serveStatic: ['src'],
        logPrefix: 'Blockit',
        reloadDelay: 3000,
        callbacks: {
            ready: function(err, bs) {
                bs.io.sockets.on('connection', socket => {
                    // run blockit methods
                    const blockit = methodLibrary(socket)
                    const connect = socketLibrary(blockit)

                    // run blockit sockets
                    connect.pagesSocket(socket)
                    connect.navigationSocket(socket)
                    connect.postsSocket(socket)
                    connect.componentsSocket(socket)
                    connect.settingsSocket(socket)
                    connect.mediaSocket(socket)
                })
                bs.addMiddleware('*', (req, res) => {
                    res.writeHead(302, {location: '/404.html'})
                    res.end('Redirecting!')
                })
                themeWatch()
            }
        }
    })
}

// gulp task
task('build', series(themeClean, themeHtml, themeCss, themeJs, themeStatic, themeImg))  // gulp build --gulpfile blockit.js
task('blockit', runBrowsersync)  // gulp blockit --gulpfile blockit.js
task('minify', minifyFiles)  // gulp minify --gulpfile blockit.js