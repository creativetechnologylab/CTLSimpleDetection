const CTLSimpleDetection = require('../CTLSimpleDetection/CTLSimpleDetection');

const detectorOptions = {
    test: true
};

const detector = new CTLSimpleDetection('API_KEY', detectorOptions);

detector
    .addImage(__dirname + '/data/happy.png')
    .getFaces() // Requests to get faces
    .getLabels() // Requests to get labels
    .addImage(__dirname + '/data/poster.png')
    .getText() // Requests to get Text
    .run()
    .then(results => {
        console.log(results);
    })
    .catch(console.error)