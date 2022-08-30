/* --------------------------------------------------------------------------
 * File        : config-theme.js
 * Author      : indonez
 * Author URI  : http://www.indonez.com
 *
 * Indonez Copyright 2020 All Rights Reserved.
 * -------------------------------------------------------------------------- 
 * javascript handle initialization
    1. Slideshow
    2. Counter
    3. Mobile nav button
    4. Modal iframe
    5. Tradingview widget
 * -------------------------------------------------------------------------- */

'use strict';

const HomepageApp = {
    //----------- 1. Slideshow -----------
    theme_slideshow: function () {
        UIkit.slideshow('.in-slideshow', {
            autoplay: true,
            autoplayInterval: 8000,
            pauseOnHover: false,
            animation: 'slide',
            minHeight: 440,
            maxHeight: 580
        });
    },
    //---------- 2. Counter -----------
    theme_counter: function () {
        const counter = new counterUp({
            selector: '.count',
            start: 0,
            duration: 3200,
            intvalues: true,
            interval: 50
        });
        counter.start();
    },
    //---------- 3. Mobile nav button -----------
    theme_mobilenav: function () {
        mobileNav({
            addonButtons: true,
            buttons: [{
                name: 'Log in', // button name
                url: '/signin.html', // button url
                type: 'primary', // button type (default, primary, secondary, danger, text)
                icon: 'sign-in-alt' // button icon, you can use all icons from here : https://fontawesome.com/icons?d=gallery&s=solid&m=free
            }]
        });
    },
    //---------- 4. Modal iframe -----------
    theme_video: function () {
        modalIframe({
            videos: [{
                id: 'video-1', // video id (should not be the same as the next video)
                url: 'https://www.youtube.com/embed/F3QpgXBtDeo' // video embed url
            }]
        });
    },
    //---------- 5. Tradingview widget -----------
    theme_tradingview: function () {
        if (window.tradingWidget)
            tradingWidget({
                widget: [{
                    type: "market-overview",
                    theme: "light",
                    symbol: [ // array of instruments symbol based on Tradingview
                        {
                            s: "FX:EURUSD"
                        },
                        {
                            s: "FX:GBPUSD"
                        },
                        {
                            s: "FX:USDJPY"
                        },
                        {
                            s: "FX:USDCHF"
                        },
                        {
                            s: "FX:AUDUSD"
                        },
                        {
                            s: "FX:USDCAD"
                        }
                    ]
                },
                {
                    type: "symbol-overview",
                    theme: "dark",
                    symbol: "GOOGL" // symbol based on Tradingview
                }
                ]
            });
    },
    theme_init: function () {
        HomepageApp.theme_slideshow();
        HomepageApp.theme_counter();
        HomepageApp.theme_mobilenav();
        HomepageApp.theme_video();
        HomepageApp.theme_tradingview();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    HomepageApp.theme_init();
});
const btnCaulator = document.querySelector(".btn-caculator");
const resultCaculator = document.querySelector(".result-caculator");
const loadMoreBroker = document.querySelector(".btn-load-more-broker");
const brokerDiv = document.querySelector(".broker-div")
btnCaulator.addEventListener("click", () => {
    resultCaculator.innerHTML = "";
    const element = document.createElement("p");
    element.innerHTML = `<b>EURUSD Spread:</b> 3.0<br><b>Premium per day:</b> $0.07<br><b>Premium per week:</b> $0.34<br><b>Premium per month:</b> $1.43
    `;
    resultCaculator.append(element);
});

loadMoreBroker.addEventListener("click",()=>{
    const element = document.createElement("div");
    const element_content = document.createElement("div")
    element.classList.add("uk-grid-match");
    element.classList.add("uk-grid-medium");
    element.classList.add("uk-child-width-1-4@m");
    element.classList.add("uk-child-width-1-2@s");
    element.classList.add("uk-margin-bottom");
    const content = `<div class="uk-card uk-card-body uk-card-default uk-border-rounded">
    <div class="uk-flex uk-flex-middle">
        <span class="in-product-name"><img
                src="./img/Broker/z3676157952895_ea8616ababe7bfdc0432c59f92b8b1c2.jpg"
                alt=""></span>
        <h5 class="uk-margin-remove">FxPro</h5>
    </div>
    <p>Up To 0.4 Pips Rebate</p>
    <p>Minimum lot Size 0.01</p>
    <p>Maximum lot Size 200.0</p>
    <a href="#"
        class="uk-button uk-button-text uk-float-right uk-position-bottom-right">Explore<i
            class="fas fa-arrow-circle-right uk-margin-small-left"></i></a>
    </div>`;
    element_content.innerHTML = content;
    element.append( element_content);
    brokerDiv.append(element);
})

