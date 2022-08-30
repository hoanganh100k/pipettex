module.exports = function(ary, max, options) {
    if(!ary || ary.length == 0) return options.inverse(this)

    let result = []
    for(let i = 0; i < max && i < ary.length; ++i)
        result.push(options.fn(ary[i]))
    return result.join('')
}