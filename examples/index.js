const CTLSimpleDetection = require('../CTLSimpleDetection/CTLSimpleDetection');

const detectorOptions = {
    test: false
};

const detector = new CTLSimpleDetection(__dirname + '/../credentials.json', detectorOptions);

detector.getFaceEmotions(__dirname + '/data/happy.png')
    .then(results => {
        console.log(results);
    });