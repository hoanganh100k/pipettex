module.exports = function(passedString) {
    let trimmedStr = passedString.split('.')[0]

    return trimmedStr;
}

// used {{trimSymbol stringName}}