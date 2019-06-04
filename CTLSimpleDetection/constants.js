const fs = require('fs');

function getJsonFromFile(file) {
    const contents = fs.readFileSync(file);
    return JSON.parse(contents);
}

const LIKELIHOOD = {
    UNKNOWN: 0,
    VERY_UNLIKELY: 1,
    UNLIKELY: 2,
    POSSIBLE: 3,
    LIKELY: 4,
    VERY_LIKELY: 5
};

const likelihoodPercentage = key => {
    return LIKELIHOOD[key] / 5;
};

const base64Encode = file => {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

module.exports = { LIKELIHOOD, getJsonFromFile, likelihoodPercentage, base64Encode };