/* trading-widget.js | https://www.indonez.com | Zainal Mudzakir | MIT License */
function tradingWidget(options) {
    'use strict';

    // default settings
    const defaults = {
        widget : [
            {
                type: "market-overview",
                theme: "light",
                symbol: [                                            // array of instruments symbol based on Tradingview
                    {s: "FX:EURUSD"},
                    {s: "FX:GBPUSD"},
                    {s: "FX:USDJPY"},
                    {s: "FX:USDCHF"},
                    {s: "FX:AUDUSD"},
                    {s: "FX:USDCAD"}
                ]
            },
            {
                type: "symbol-overview",
                theme: "dark",
                symbol : "GOOGL"                                     // symbol based on Tradingview
            },
        ]
    }

    // merge user options into defaults
    const settings = Object.assign({}, defaults, options);

    // market overview widget function
    function marketOverview(symbol, theme, height) {
        const createScript = document.createElement('script')
        createScript.setAttribute('src','https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js')
        createScript.setAttribute('async', '')
        createScript.innerHTML = `
        {
            "colorTheme": "${theme}",
            "dateRange": "1D",
            "showChart": false,
            "locale": "en",
            "width": "100%",
            "height": "${height}",
            "largeChartUrl": "",
            "isTransparent": true,
            "showSymbolLogo": true,
            "showFloatingTooltip": false,
            "plotLineColorGrowing": "rgba(41, 98, 255, 1)",
            "plotLineColorFalling": "rgba(41, 98, 255, 1)",
            "gridLineColor": "rgba(240, 243, 250, 0)",
            "scaleFontColor": "rgba(120, 123, 134, 1)",
            "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
            "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
            "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
            "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
            "symbolActiveColor": "rgba(41, 98, 255, 0.10)",
            "tabs": [
                {
                    "title": "Instruments",
                    "symbols": ${JSON.stringify(symbol)},
                    "originalTitle": "Instruments"
                }
            ]
        }`
        return createScript
    }

    // symbol overview widget function
    function symbolOverview(symbol, theme, height, container) {
        const scriptConfig = document.createElement('script')
        scriptConfig.innerHTML = `
        new TradingView.MediumWidget(
            {
                "symbols": [
                    [
                        "${symbol}|1Y"
                    ]
                ],
                "chartOnly": false,
                "width": "100%",
                "height": "${height}",
                "locale": "en",
                "colorTheme": "${theme}",
                "gridLineColor": "rgba(42, 46, 57, 0)",
                "fontColor": "#787b86",
                "isTransparent": true,
                "autosize": true,
                "showFloatingTooltip": true,
                "scalePosition": "no",
                "scaleMode": "Normal",
                "fontFamily": "Trebuchet MS, sans-serif",
                "noTimeScale": false,
                "chartType": "area",
                "lineColor": "#2962ff",
                "bottomColor": "rgba(41, 98, 255, 0)",
                "topColor": "rgba(41, 98, 255, 0.3)",
                "container_id": "${container}"
            }
        );`
        return scriptConfig
    }

    // write widget element condition function
    function writeWidget(arrayIndex) {
        if(document.querySelector('#tradingview-widget') !== null && settings.widget[`${arrayIndex}`].type == "market-overview") {
            const height = "360"
            document.querySelector('#tradingview-widget').appendChild(marketOverview(settings.widget[`${arrayIndex}`].symbol, settings.widget[`${arrayIndex}`].theme, height))
        } else if(settings.widget[`${arrayIndex}`].type == "symbol-overview") {
            const height = "387"
            const referenceEl = document.querySelector('#tradingview-widget')
            const containerId = referenceEl.getAttribute('id')
            const createScript = document.createElement('script')

            createScript.setAttribute('src','https://s3.tradingview.com/tv.js')
            referenceEl.parentElement.insertBefore(createScript, referenceEl.nextSibling)
            setTimeout(() => referenceEl.parentElement.insertBefore(symbolOverview(settings.widget[`${arrayIndex}`].symbol, settings.widget[`${arrayIndex}`].theme, height, containerId), referenceEl.nextSibling.nextSibling), 400)
            document.querySelector('#tradingview-widget').parentElement.classList.add('widget-card')
        }
    }

    // in-equity-3 widget inject
    if(document.querySelector('.in-equity-3') !== null) writeWidget(0)

    // in-equity-8 widget inject
    if(document.querySelector('.in-equity-8') !== null) writeWidget(1)
};