// blockit socket library function
function socketLibrary(blockit) {
    return {
        pagesSocket: function(socket) {
            // pages and sections list
            socket.on('triggerPageData', () => {
                blockit.pagesListPages()
                blockit.pagesListSections()
            })
            // edit page section data
            socket.on('editPageData', nameFile => blockit.pagesEditPage(nameFile))
            // save information and page section
            socket.on('savePageData', (nameFile, data) => blockit.pagesSavePage(nameFile, data))
            // delete page data
            socket.on('deletePageData', nameFile => blockit.pagesDeletePage(nameFile))
            // read section content json for section html editor
            socket.on('readContentData', nameFile => blockit.readSectionData(nameFile))
            // write content section hbs file
            socket.on('saveContentSection', data => blockit.createContentHbs(data))
        },
        navigationSocket: function(socket) {
            // list current pages to select internal
            socket.on('triggerNavigationData', () => {
                blockit.navigationRead()
                blockit.navigationListPages()
            })
            // save navigation data
            socket.on('saveNavigation', data => blockit.navigationSave(data))
        },
        postsSocket: function(socket) {
            // posts list
            socket.on('triggerPostData', () => blockit.postsListPosts())
            // save post content data
            socket.on('savePostContent', (nameFile, dataPost, dataTag) => blockit.postsSaveContent(nameFile, dataPost, dataTag))
            // delete post data
            socket.on('deletePostData', (nameFile, dataTag) => blockit.postsDeletePost(nameFile, dataTag))
            // edit post content data
            socket.on('editPostData', nameFile => blockit.postsEditPost(nameFile))
        },
        componentsSocket: function(socket) {
            // read component.json for component-editor.js
            socket.on('readComponentsData', data => blockit.returnComponentsData())
            // save components data into json
            socket.on('sendComponentsData', data => blockit.saveComponentsData(data))
        },
        settingsSocket: function(socket) {
            // save settings and footer editor data into json
            socket.on('sendSettingsData', (data, dataTag, bufferData) => {
                blockit.saveSettingsData(data, dataTag)
                blockit.saveSettingsFooter(bufferData)
            })
            // assets upload process
            socket.on('assetsProcess', (buffer, nameFile) => {
                blockit.assetsUpload(buffer, nameFile)
                .then(result => socket.emit('assetsDone', `http://localhost:3000/img/user/${nameFile}`))
            })
            // read setting.json for setting-editor.js
            socket.on('readSettingsData', data => {
                blockit.returnSettingsData()
                blockit.returnFooterData()
            })
        },
        mediaSocket: function(socket) {
            // upload image
            socket.on('editorJsUpload', (buffer, nameFile) => blockit.uploadImage(buffer, nameFile))
        }
    }
}

module.exports = {socketLibrary}