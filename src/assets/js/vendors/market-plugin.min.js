/* market-plugin.js | https://www.indonez.com | Zainal Mudzakir | MIT License */
function marketPlugin(options) {
    'use strict';

    // default settings
    const defaults = {
        symbols: 'data-market',              // get array value from dom data-attribute
        upClass: 'up',                       // css class that used for bullish condition
        downClass: 'down',                   // css class that used for bearish condition
    };

    // merge user options into defaults
    const settings = Object.assign({}, defaults, options);

    // get symbol list from the dom function
    function getSymbol(symbol) {
        const partialArr = []
        const fullArr = []
        document.querySelectorAll(`[${symbol}]`).forEach((el, index) => {
            partialArr.push(el.getAttribute(`${symbol}`).split(','))
            fullArr.push(...partialArr[`${index}`])
        })
        return fullArr
    }

    // create symbol urls function
    function getUrls(list) {
        const tempUrls = []
        list.forEach(async symbol => {
            const url = `https://market-plugin.herokuapp.com/get?url=${encodeURIComponent(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`)}`
            tempUrls.push(url)
        })
        return tempUrls
    }

    // fecth price data function
    async function fetchMarkets(urls) {
        try {
            const priceData = {
                current: [],
                percent: []
            }

            let res = await Promise.all(urls.map(e => fetch(e)))
            let resJson = await Promise.all(res.map(e => e.json()))

            resJson.map(data => {          
                const price = normalizePrice(data.contents.price)
                const percent = addPercent(normalizePrice(data.contents.percent))

                priceData.current.push(price)
                priceData.percent.push(percent)
            })

            return priceData
        } catch(err) {
            console.log(err)
        }
    }

    // normalize number of price function
    function normalizePrice(num) {
        const len = num && num.length > 2 ? num.length : 2
        return Number(num).toFixed(len).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    // add percentage at change
    function addPercent(num) {
        return num.charAt(0) !== '-' ? `+${num}%` : `${num}%`
    }

    // write data price into the dom function
    function writePrice(priceData) {
        const priceElement = document.querySelectorAll('.in-price')
        
        priceElement.forEach((element, index) => {
            element.querySelector('span').textContent = priceData.percent[index]
            element.querySelector('p').innerHTML = `<span class="fas fa-arrow-circle-right fa-xs"></span>${priceData.current[index]}`
            if (priceData.percent[index][0].charAt(0) == '-') {
                element.classList.remove(settings.upClass)
                element.classList.add(settings.downClass)
            } else {
                element.classList.remove(settings.downClass)
                element.classList.add(settings.upClass)
            }
        })
    }

    // symbol list, and url variables
    const symbolList = getSymbol(settings.symbols)
    const symbolUrls = getUrls(symbolList)

    // run fetch data from finnhub
    fetchMarkets(symbolUrls)
    .then(data => writePrice(data))
};
marketPlugin()