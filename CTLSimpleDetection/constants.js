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

module.exports = { LIKELIHOOD, getJsonFromFile, likelihoodPercentage };