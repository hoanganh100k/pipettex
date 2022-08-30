/* blog.js | https://www.indonez.com | Indonez | MIT License */
if(location.pathname.indexOf("blog/page") != -1 || location.pathname.indexOf("blog/find") != -1) {
    const body = document.querySelector('body')
    const categoryScript = document.createElement('script')
    const tagScript = document.createElement('script')
    categoryScript.setAttribute('src', '../js/blog/category-data.js' )
    tagScript.setAttribute('src', '../js/blog/tag-data.js' )
    body.appendChild(categoryScript)
    body.appendChild(tagScript)
}

document.addEventListener('readystatechange', () => {
    if(document.readyState == 'complete' && document.querySelector('.in-blog-1') && !document.querySelector('.in-article')) {
        const dataBlog = {"totalPages":5,"tagLists":["economics","investment","health","asia","politics","crypto","europe","usa","technology"]}
        const articleWrap = document.querySelectorAll('article')
        const tagWrap = document.querySelector('.in-widget-tag')
        const categoryWrap = document.querySelector('.in-widget-category')
        const urlParams = window.location.href.split( '/' )
        const currentPage = urlParams.pop()

        // blog text truncate
        articleWrap.forEach(txt => {
            let currentText = txt.querySelector('p')
            let truncateText = trimLongTitle(currentText.innerText, 150)

            currentText.innerText = truncateText
        })

        // create pagination element
        if(location.pathname.indexOf("blog/find") == -1) {
            const element = document.querySelector('.uk-pagination')
            let totalPages = dataBlog.totalPages
            let page = parseInt(currentPage.substring(5).slice(0, -5))

            // calling function with passing parameters and adding inside element which is ul tag
            element.innerHTML = createPagination(totalPages, page);
            function createPagination(totalPages, page) {
                let liTag = ''
                let active = ''
                let beforePage = page - 1
                let afterPage = page + 1

                // hide pagination when only one page
                if(dataBlog.totalPages === 1) { 
                    element.remove()
                }

                // show the next button if the page value is greater than 1
                if(page > 3) { 
                    // liTag += `<li><a href="page-${page - 1}.html"><i class="fas fa-angle-left fa-xs"></i></a></li>`
                    liTag += `<li><a href="page-1.html"><i class="fas fa-angle-double-left fa-xs"></i></a></li>`
                }

                // // if page value is less than 2 then add 1 after the previous button
                // if(page > 2) { 
                //     liTag += `<li><a href="page-1.html">1</a></li>`
                //     // if page value is greater than 3 then add this (...) after the first li or page
                //     if(page > 3) { 
                //         liTag += `<li class="uk-disabled"><span>...</span></li>`
                //     }
                // }

                // // how many pages or li show before the current li
                // if(page == totalPages) {
                //     beforePage = beforePage - 2
                // } else if (page == totalPages - 1) {
                //     beforePage = beforePage - 1
                // }

                // // how many pages or li show after the current li
                // if(page == 1) {
                //     afterPage = afterPage + 2
                // } else if (page == 2) {
                //     afterPage = afterPage + 1
                // }

                if(page == 1) {
                    afterPage = afterPage + 2
                } else if(page == 2) {
                    afterPage = afterPage + 1
                } else if(page !== totalPages && page < totalPages && page !== 1) {
                    beforePage = beforePage - 1
                } else if (page == totalPages) {
                    beforePage = beforePage - 2
                }

                for (let plength = beforePage; plength <= afterPage; plength++) {
                    // if plength is greater than totalPage length then continue
                    if (plength > totalPages) { 
                        continue
                    }

                    // if plength is 0 than add +1 in plength value
                    if (plength == 0) { 
                        plength = plength + 1
                    }

                    // if page is equal to plength than assign active string in the active variable
                    if(page == plength){ 
                        active = 'class="uk-active"'
                    }else{ // else leave empty to the active variable
                        active = ''
                    }
                    liTag += `<li ${active}><a href="page-${plength}.html">${plength}</a></li>`
                }

                // // if page value is less than totalPage value by -1 then show the last li or page
                // if(page < totalPages - 1) { 
                //     // if page value is less than totalPage value by -2 then add this (...) before the last li or page
                //     if(page < totalPages - 2){ 
                //         liTag += `<li class="uk-disabled"><span>...</span></li>`
                //     }
                //     liTag += `<li><a href="page-${totalPages}.html">${totalPages}</a></li>`
                // }

                if (page < totalPages - 1) { // show the next button if the page value is less than totalPage(20)
                    // liTag += `<li><a href="page-${page + 1}.html"><i class="fas fa-angle-right fa-xs"></i></a></li>`
                    liTag += `<li><a href="page-${totalPages}.html"><i class="fas fa-angle-double-right fa-xs"></i></a></li>`
                }
                // add li tag inside ul tag
                element.innerHTML = liTag
                return liTag
            }
        }

        // tag or category find page creation
        if(location.pathname.indexOf("blog/find") != -1) {
            const params = new URLSearchParams(window.location.search)            
            const textEl = document.querySelector('.in-find-text')
            const headingEl = document.querySelector('.in-find-heading')

            if(params.has('category')) {
                const categoryName = capitalizeText(params.get('category'))
                textEl.textContent = 'Post with category'
                headingEl.innerHTML = `<i class="fas fa-folder-open fa-xs uk-margin-small-right"></i>${categoryName}`

                // write posts category into the dom
                const categoryFilter = categoryData.filter(post => {
                    if(post.category.toLowerCase() === categoryName.toLowerCase()) {
                        const postWrap = document.querySelector('.in-blog-1')
                        const selectedPost = post.posts

                        selectedPost.forEach((post) => {
                            const articleDiv = document.createElement('div')
                            articleDiv.innerHTML = `
                            <article class="uk-card uk-card-default uk-border-rounded">
                                <div class="uk-card-body">
                                    <h3>
                                        <a href="${post.link}">${post.title}</a>
                                    </h3>
                                    <p>${trimLongTitle(post.content, 150)}</p>
                                    <div class="uk-flex uk-flex-middle">
                                        <div class="uk-margin-small-right">
                                            <img class="uk-border-pill uk-background-muted" src="../${post.author.avatar}" alt="author-image" width="24" height="24">
                                        </div>
                                        <div>
                                            <p class="uk-text-small uk-text-muted uk-margin-remove-bottom">
                                                <a href="#">${post.author.name}</a>
                                                <span class="uk-margin-small-left uk-margin-small-right">•</span>
                                                ${post.date}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="uk-card-footer uk-clearfix">
                                    <div class="uk-float-left">
                                        <span class="uk-label uk-label-warning in-label-small">${categoryName}</span>
                                    </div>
                                    <div class="uk-float-right">
                                        <a href="${post.link}" class="uk-button uk-button-text">Read more<i class="fas fa-arrow-circle-right uk-margin-small-left"></i></a>
                                    </div>
                                </div>
                            </article>`
                            postWrap.appendChild(articleDiv)
                        })
                    }
                })
            }
            if(params.has('tag')) {
                const tagName = capitalizeText(params.get('tag'))

                textEl.textContent = 'Post with tag'
                headingEl.innerHTML = `<i class="fas fa-tag fa-xs uk-margin-small-right"></i>${tagName}`

                // write posts tag into the dom
                const tagFilter = tagData.filter(post => {
                    if(post.tag.toLowerCase() === tagName.toLowerCase()) {
                        const postWrap = document.querySelector('.in-blog-1')
                        const selectedPost = post.posts

                        selectedPost.forEach((post) => {
                            const articleDiv = document.createElement('div')
                            articleDiv.innerHTML = `
                            <article class="uk-card uk-card-default uk-border-rounded">
                                <div class="uk-card-body">
                                    <h3>
                                        <a href="${post.link}">${post.title}</a>
                                    </h3>
                                    <p>${trimLongTitle(post.content, 150)}</p>
                                    <div class="uk-flex uk-flex-middle">
                                        <div class="uk-margin-small-right">
                                            <img class="uk-border-pill uk-background-muted" src="../${post.author.avatar}" alt="author-image" width="24" height="24">
                                        </div>
                                        <div>
                                            <p class="uk-text-small uk-text-muted uk-margin-remove-bottom">
                                                <a href="#">${post.author.name}</a>
                                                <span class="uk-margin-small-left uk-margin-small-right">•</span>
                                                ${post.date}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="uk-card-footer uk-clearfix">
                                    <div class="uk-float-left">
                                        <span class="uk-label uk-label-warning in-label-small">${post.category}</span>
                                    </div>
                                    <div class="uk-float-right">
                                        <a href="${post.link}" class="uk-button uk-button-text">Read more<i class="fas fa-arrow-circle-right uk-margin-small-left"></i></a>
                                    </div>
                                </div>
                            </article>`
                            postWrap.appendChild(articleDiv)
                        })
                    }
                })
            }
        }

        // create tag widget element
        if(document.querySelector('.in-widget-tag') !== null) {
            dataBlog.tagLists.sort()
            const tagFilter = dataBlog.tagLists.filter(item => item !== 'untagged')
            tagFilter.forEach(eachTag => {
                if(eachTag.length !== 0) {
                    tagWrap.innerHTML += `<a href="find.html?tag=${eachTag}"><span class="uk-label uk-border-pill">${eachTag}</span></a>`
                } else {
                    tagWrap.innerHTML = '<p class="uk-text-small uk-text-muted uk-margin-remove-bottom">No tags available yet</p>'
                }
            })
        }

        // create category widget element
        if(document.querySelector('.in-widget-category') !== null) {
            categoryData.sort((a, b) => {
                if(a.category < b.category) return -1
                if(a.category > b.category) return 1
                return 0
            })
            const categoryFilter = categoryData.filter(item => item.category !== 'Uncategorized')
            categoryFilter.forEach(eachData => {
                categoryWrap.innerHTML += `<li><a href="find.html?category=${eachData.category.toLowerCase()}">${eachData.category}<span class="uk-label in-label-small uk-float-right">${eachData.totalPost}</span></a></li>`
            })
        }

        // latest news title trim
        if(document.querySelector('.in-widget-latest') !== null) {
            const latestWrap = document.querySelector('.in-widget-latest')
            const titleList = latestWrap.querySelectorAll('a')
            titleList.forEach(title => title.textContent = trimLongTitle(title.textContent, 55))
        }

        // text captitalize function
        function capitalizeText(string) {
            const arr = string.split(" ")
            for (var i = 0; i < arr.length; i++) {
                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
            }
            const result = arr.join(" ")
            return result
        }

        // trim long text function
        function trimLongTitle(string, number) {
            let cut = string.indexOf(' ', number);
            if(cut == -1) return string;
            return string.substring(0, cut) + ' ...'
        }
    }
})

// remove tags in single when value untagged
if(document.querySelector('.in-article-tags') !== null) {
    const tagWrap = document.querySelector('.in-article-tags')
    if(tagWrap.querySelector('a').textContent == 'untagged') tagWrap.remove()
}