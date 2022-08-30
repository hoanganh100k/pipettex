// blog page, single and section tag format string
function tagFormat() {
const string = {
defaultPage: `---
layout: default
title: Blog
---

<main>
    <!-- section content begin -->
    <div class="uk-section uk-margin-small-top">
        <div class="uk-container">
            <div class="uk-grid{{#if setting.blog.showWidgets.allHide}} uk-flex uk-flex-center{{/if}}" data-uk-grid>
                <div {{#unless setting.blog.showWidgets.allHide}}class="uk-width-2-3@m"{{/unless}}{{#if setting.blog.showWidgets.allHide}}class="uk-width-3-4@m"{{/if}}>
                    {{> section-blog-number }}
                    {{> module-pagination }}
                </div>
                {{#unless setting.blog.showWidgets.allHide}}
                <div class="uk-width-expand@m">
                    {{#if setting.blog.showWidgets.categories}}
                    {{> module-widget-categories }}
                    {{/if}}
                    {{#if setting.blog.showWidgets.latestPosts}}
                    {{> module-widget-latest }}
                    {{/if}}
                    {{#if setting.blog.showWidgets.tags}}
                    {{> module-widget-tags }}
                    {{/if}}
                </div>
                {{/unless}}
            </div>
        </div>
    </div>
    <!-- section content end -->
</main>`,
singlePage: `---
layout: single
title: Blog
---

<main>
    {{> post-title }}
    {{#if setting.blog.disqussShortname}}
    {{> section-disqus }}
    {{/if}}
</main>`,
defaultSection: `<div class="in-blog-1" data-uk-grid>
    {{#each blog-page-number.data}}
    <div class="in-stretch">
        <article class="uk-card uk-card-default uk-border-rounded">
            {{#if image}}
            <div class="uk-card-media-top">
                <img src="{{../root}}{{image}}" alt="{{title}}">
            </div>
            {{/if}}
            <div class="uk-card-body">
                <h3>
                    <a href="{{root}}{{link}}">{{title}}</a>
                </h3>
                <p>{{blocks.[0].data.text}}</p>
                <div class="uk-flex">
                    {{#if @root.blog-page-number.display_author}}
                    <div class="uk-margin-small-right">
                        <img class="uk-border-pill uk-background-muted" src="{{../root}}{{author.avatar}}" alt="image-team" width="32" height="32">
                    </div>
                    <div class="uk-flex uk-flex-middle">
                        <p class="uk-text-small uk-text-muted uk-margin-remove">
                            {{author.name}}
                            <span class="uk-margin-small-left uk-margin-small-right">•</span>
                        </p>
                    </div>
                    {{/if}}
                    <div class="uk-flex uk-flex-middle">
                        <p class="uk-text-small uk-text-muted uk-margin-remove">
                            {{date}}
                        </p>
                    </div>
                </div>
            </div>
            <div class="uk-card-footer uk-clearfix">
                <div class="uk-float-left">
                    <span class="uk-label uk-label-warning in-label-small">{{category}}</span>
                </div>
                <div class="uk-float-right">
                    <a href="{{root}}{{link}}" class="uk-button uk-button-text">Read more<i class="fas fa-arrow-circle-right uk-margin-small-left"></i></a>
                </div>
            </div>
        </article>
    </div>
    {{/each}}
</div>`,
singleSection: `<!-- section content begin -->
<div class="uk-section uk-margin-small-top">
    <div class="uk-container">
        <div class="uk-grid uk-flex uk-flex-center in-blog-1 in-article">
            {{#if post-title.image}}
            <div class="uk-width-1-1 in-figure-available">
                <img class="uk-width-1-1 uk-border-rounded" src="{{root}}{{post-title.image}}" alt="{{post-title.title}}">
            </div>
            {{/if}}
            <div class="uk-width-3-4@m">
                <article class="uk-card uk-card-default uk-border-rounded">
                    <div class="uk-card-body">
                        <div class="uk-flex">
                            {{#if setting.blog.displayAuthor}}
                            <div class="uk-margin-small-right">
                                <img class="uk-border-pill uk-background-muted" src="{{root}}{{post-title.author.avatar}}" alt="image-team" width="32" height="32">
                            </div>
                            <div class="uk-flex uk-flex-middle">
                                <p class="uk-text-small uk-text-muted uk-margin-remove">
                                    {{post-title.author.name}}
                                    <span class="uk-margin-small-left uk-margin-small-right">•</span>
                                </p>
                            </div>
                            {{/if}}
                            <div class="uk-flex uk-flex-middle">
                                <p class="uk-text-small uk-text-muted uk-margin-remove">
                                    {{post-title.date}}
                                </p>
                            </div>
                        </div>
                        <h2 class="uk-margin-top uk-margin-medium-bottom">{{post-title.title}}</h2>
                        {{#each post-title.blocks}}
                        {{> component-editor }}
                        {{/each}}
                    </div>
                    {{#ifAnd setting.blog.displayTag setting.blog.displayShareButtons}}
                    <div class="uk-card-footer uk-clearfix">
                        {{#if setting.blog.displayTag}}
                        <div class="uk-float-left in-article-tags">
                            <i class="fas fa-tags"></i><span class="uk-margin-small-left uk-text-bold">Tags: &nbsp;</span>
                            {{#each post-title.tags}}
                            <a href="find.html?tag={{this}}" class="uk-link-muted">{{this}}</a>{{#unless @last}},{{/unless}}
                            {{/each}}
                        </div>
                        {{/if}}
                        {{#if setting.blog.displayShareButtons}}
                        <div class="uk-float-right in-article-share share-btn">
                            <a class="uk-label in-label-small in-brand-facebook" data-id="fb"><i class="fab fa-facebook-f fa-sm"></i></a>
                            <a class="uk-label in-label-small in-brand-twitter" data-id="tw"><i class="fab fa-twitter fa-sm"></i></a>
                            <a class="uk-label in-label-small in-brand-pinterest" data-id="pi"><i class="fab fa-pinterest-p fa-sm"></i></a>
                            <a class="uk-label in-label-small in-generic-email" data-id="mail"><i class="fas fa-envelope fa-sm"></i></a>
                        </div>
                        {{/if}}
                    </div>
                    {{/ifAnd}}
                </article>
                
            </div>
        </div>
    </div>
</div>
<!-- section content end -->`
}
return string
}